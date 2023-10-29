import json
import os
from flask import jsonify 
from alchemyClasses import db
from CryptoUtils.CryptoUtils import validate
from flask import Flask, render_template, request, flash, session, g, redirect, url_for
from controllers.JsonController import json_controller
from model.model_participante import get_participante_by_email
from model.model_superAdmin import get_SuperAdmin_by_email 
from model.model_administrador import get_Administrador_by_email 

from flask_cors import CORS
app = Flask(__name__)
# Configura CORS para permitir solicitudes desde cualquier origen
CORS(app, resources={r"/*": {"origins": "*"}})


app.register_blueprint(json_controller)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://root:root@localhost:3306/proyectois"
app.config.from_mapping(
    SECRET_KEY='dev',
)
db.init_app(app)

@app.route('/', methods=['GET', 'POST'])
def main():
    return redirect(url_for('login'))

@app.route('/login', methods=['POST'])
def login():
    # Lógica de inicio de sesión, validación de credenciales, etc.

    try:
        Correo = request.form.get('Correo')
        Contrasenia = request.form.get('Contrasenia')

        # Intenta obtener el usuario en la tabla de Participante
        participantes = get_participante_by_email(Correo)

        if participantes:
            participante = participantes[0]
            if validate(Contrasenia, participante.Contrasenia):
                session.clear()
                session['NombreUsuario'] = participante.NombreParticipante
                session['Correo'] = participante.Correo
                session.modified = True
                return jsonify({'success': True, 'message': 'Inicio de sesión exitoso', 'nombre_usuario': participante.NombreParticipante})
            else:
                return jsonify({'success': False, 'message': 'Contraseña incorrecta'})

        # Si no se encontró en Participante, intenta en SuperAdministrador
        superadmins = get_SuperAdmin_by_email(Correo)

        if superadmins:
            superadmin = superadmins[0]
            if validate(Contrasenia, superadmin.Contrasenia):
                session.clear()
                session['NombreUsuario'] = superadmin.NombreSuperadministrador
                session['Correo'] = superadmin.Correo
                session.modified = True
                return jsonify({'success': True, 'message': 'Inicio de sesión exitoso', 'nombre_usuario': superadmin.NombreSuperadministrador})
            else:
                return jsonify({'success': False, 'message': 'Contraseña incorrecta'})

        # Si no se encontró en SuperAdministrador, intentamos en Administrador
        admins = get_Administrador_by_email(Correo)

        if admins:
            admin = admins[0]
            if validate(Contrasenia, admin.Contrasenia):
                session.clear()
                session['NombreUsuario'] = admin.NombreAdministrador
                session['Correo'] = admin.Correo
                session.modified = True
                return jsonify({'success': True, 'message': 'Inicio de sesión exitoso', 'nombre_usuario': admin.NombreAdministrador})
            else:
                return jsonify({'success': False, 'message': 'Contraseña incorrecta'})

        # Si no se encontró en ninguna de las tablas, muestra un mensaje de correo inexistente
        return jsonify({'success': False, 'message': 'Correo inexistente'})
    except KeyError:
        return jsonify({'success': False, 'message': 'No se envió correctamente el correo y/o la contraseña'})

@app.route('/index', methods=['GET', 'POST'])
def index():
    if session.get('NombreParticipante', None) is None:
        flash('Por favor primero inicie sesión.')
        return redirect(url_for('login'))
    return render_template('index.html')

@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session.clear()
    g.user = None
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run()
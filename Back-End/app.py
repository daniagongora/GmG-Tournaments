from flask import Flask, jsonify, render_template, request, flash, session, redirect, url_for
from flask_cors import CORS
from alchemyClasses import db
from CryptoUtils.CryptoUtils import validate

from controllers.JsonController import json_controller
from controllers.EliminarPerfil_Controller import eliminar_perfil
from controllers.EditarPerfil_Controller import editar_perfil
from controllers.VerAmigos_Controller import ver_amigos

from model.model_participante import get_participante_by_email
from model.model_superAdmin import get_superAdmin_by_email 
from model.model_administrador import get_administrador_by_email 

app = Flask(__name__)
# Configura CORS para permitir solicitudes desde cualquier origen
CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(json_controller)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://root:123456@localhost:3306/proyectois"
app.config['JSON_AS_ASCII'] = False
app.config.from_mapping(
    SECRET_KEY='dev',
)
db.init_app(app)

app.register_blueprint(eliminar_perfil)
app.register_blueprint(editar_perfil)
app.register_blueprint(ver_amigos)

@app.route('/', methods=['GET', 'POST'])
def main():
    return redirect(url_for('login'))

@app.route('/login', methods=['POST'])
def login():
    # Lógica de inicio de sesión, validación de credenciales, etc

    try:
        Correo = request.form.get('Correo')
        Contrasenia = request.form.get('Contrasenia')

        # Intenta obtener el usuario en la tabla de Participante
        participantes = get_participante_by_email(Correo)

        if participantes:
            participante = participantes[0]
            if validate(Contrasenia, participante.Contrasenia):
                session.clear()
                session['NombreCompleto'] = participante.NombreCompleto
                session['NombreUsuario'] = participante.NombreParticipante
                session['Correo'] = participante.Correo
                session['Contrasenia'] = participante.Contrasenia
                session['ImagenPerfil'] = participante.ImagenPerfil
                session['Rol'] = participante.Rol
                session['IDParticipante'] = participante.IDParticipante
                session.modified = True
                return jsonify({'success': True, 
                                'message': 'Inicio de sesión exitoso', 
                                'NombreCompleto': participante.NombreCompleto, 
                                'NombreUsuario': participante.NombreParticipante, 
                                'Correo': participante.Correo,
                                'Contrasenia': participante.Contrasenia,
                                'ImagenPerfil': participante.ImagenPerfil, 
                                'Rol': participante.Rol,
                                'ID':participante.IDParticipante})
            else:
                return jsonify({'success': False, 'message': 'Contraseña incorrecta'})

        # Si no se encontró en Participante, intenta en SuperAdministrador
        superadmins = get_superAdmin_by_email(Correo)

        if superadmins:
            superadmin = superadmins[0]
            if validate(Contrasenia, superadmin.Contrasenia):
                session.clear()
                session['NombreCompleto'] = superadmin.NombreCompleto
                session['NombreUsuario'] = superadmin.NombreSuperadministrador
                session['Correo'] = superadmin.Correo
                session['Contrasenia'] = superadmin.Contrasenia
                session['ImagenPerfil'] = superadmin.ImagenPerfil
                session['Rol'] = superadmin.Rol
                session['IDSuperAdministrador'] = superadmin.IDSuperAdministrador
                session.modified = True
                return jsonify({'success': True, 
                                'message': 'Inicio de sesión exitoso', 
                                'NombreCompleto': superadmin.NombreCompleto, 
                                'NombreUsuario': superadmin.NombreSuperadministrador, 
                                'Correo': superadmin.Correo,
                                'Contrasenia': superadmin.Contrasenia,
                                'ImagenPerfil': superadmin.ImagenPerfil, 
                                'Rol': superadmin.Rol,
                                'ID':superadmin.IDSuperAdministrador})
            else:
                return jsonify({'success': False, 'message': 'Contraseña incorrecta'})

        # Si no se encontró en SuperAdministrador, intentamos en Administrador
        admins = get_administrador_by_email(Correo)

        if admins:
            admin = admins[0]
            if validate(Contrasenia, admin.Contrasenia):
                session.clear()
                session['NombreCompleto'] = admin.NombreCompleto
                session['NombreUsuario'] = admin.NombreAdministrador
                session['Correo'] = admin.Correo
                session['Contrasenia'] = admin.Contrasenia
                session['ImagenPerfil'] = admin.ImagenPerfil
                session['Rol'] = admin.Rol
                session['IDAdministrador'] = admin.IDAdministrador
                session['IDSuperAdministrador'] = admin.IDSuperAdministrador
                session.modified = True
                return jsonify({'success': True, 
                                'message': 'Inicio de sesión exitoso', 
                                'NombreCompleto': admin.NombreCompleto, 
                                'NombreUsuario': admin.NombreAdministrador, 
                                'Correo': admin.Correo,
                                'Contrasenia': admin.Contrasenia,
                                'ImagenPerfil': admin.ImagenPerfil, 
                                'Rol': admin.Rol,
                                'ID':admin.IDAdministrador,
                                'IDSuperAdministrador':admin.IDSuperAdministrador})
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

if __name__ == '__main__':
    app.run()
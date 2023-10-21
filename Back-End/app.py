import json
import os

from alchemyClasses import db
from CryptoUtils.CryptoUtils import validate
from flask import Flask, render_template, request, flash, session, g, redirect, url_for
from controllers.JsonController import json_controller
from model.model_participante import get_participante_by_email
from model.model_superAdmin import get_SuperAdmin_by_email 
from model.model_administrador import get_Administrador_by_email 

app = Flask(__name__)
app.register_blueprint(json_controller)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://root:root@localhost:3306/proyectois"
app.config.from_mapping(
    SECRET_KEY='dev',
)
db.init_app(app)

@app.route('/', methods=['GET', 'POST'])
def main():
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if session.get("participante", None) is not None and request.method == 'GET':
        return redirect(url_for('index'))
    if request.method == 'POST':
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
                    return render_template('index.html')
                else:
                    flash('Contraseña incorrecta.')
                    return render_template('login.html')
            
            # Si no se encontró en Participante, intenta en SuperAdministrador
            superadmins = get_SuperAdmin_by_email(Correo)
            
            if superadmins:
                superadmin = superadmins[0]  
                if validate(Contrasenia, superadmin.Contrasenia):
                    session.clear()
                    session['NombreUsuario'] = superadmin.NombreSuperadministrador
                    session['Correo'] = superadmin.Correo
                    session.modified = True
                    return render_template('index.html')
                else:
                    flash('Contraseña incorrecta.')
                    return render_template('login.html')
                
            # Si no se encontró en SuperAdministrador, intentamos en Administrador
            admins = get_Administrador_by_email(Correo)
            
            if admins:
                admin = admins[0]  
                if validate(Contrasenia, admin.Contrasenia):
                    session.clear()
                    session['NombreUsuario'] = admin.NombreAdministrador
                    session['Correo'] = admin.Correo
                    session.modified = True
                    return render_template('index.html')
                else:
                    flash('Contraseña incorrecta.')
                    return render_template('login.html')
            
            # Si no se encontró en ninguna de las tablas, muestra un mensaje de correo inexistente
            flash('Correo inexistente.')
            return render_template('login.html')
        except KeyError:
            flash('No se envió correctamente el correo y/o la contraseña')
            return render_template('login.html')
    return render_template('login.html')



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

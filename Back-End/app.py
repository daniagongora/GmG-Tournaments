from alchemyClasses import db
from CryptoUtils.CryptoUtils import validate
from flask import Flask, jsonify, render_template, request, flash, session, redirect, url_for
from flask_cors import CORS

from controllers.JsonController import json_controller
from controllers.Perfil_Controller import eliminar_perfil
from controllers.Perfil_Controller import editar_perfil_administrador
from controllers.Perfil_Controller import editar_perfil_participante
from controllers.Perfil_Controller import editar_perfil_superAdmin
from controllers.Perfil_Controller import ver_amigos
from controllers.Perfil_Controller import buscar_usuario
from controllers.Perfil_Controller import buscar_participante
from controllers.Perfil_Controller import volver_administrador
from controllers.RegistrarPerfil_Controller import registrar_perfil
from controllers.Torneo_Controller import crear_torneo
from controllers.Torneo_Controller import eliminar_torneo

from model.model_administrador import get_administrador_by_email
from model.model_participante import get_participante_by_email
from model.model_superAdmin import get_superAdmin_by_email 

app = Flask(__name__)
# Configura CORS para permitir solicitudes desde cualquier origen
CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(json_controller)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://root:angel123@localhost:3306/proyectois"
app.config['JSON_AS_ASCII'] = False
app.config.from_mapping(
    SECRET_KEY='dev',
)
db.init_app(app)

app.register_blueprint(eliminar_perfil)
app.register_blueprint(editar_perfil_administrador)
app.register_blueprint(editar_perfil_participante)
app.register_blueprint(editar_perfil_superAdmin)
app.register_blueprint(ver_amigos)
app.register_blueprint(registrar_perfil)
app.register_blueprint(crear_torneo)
app.register_blueprint(eliminar_torneo)
app.register_blueprint(buscar_usuario)
app.register_blueprint(buscar_participante)
app.register_blueprint(volver_administrador)

"""
    Ruta principal que redirige a la página de inicio de sesión.
"""
@app.route('/', methods=['GET', 'POST'])
def main():
    return redirect(url_for('login'))

"""
    Ruta para el manejo de inicio de sesión.
    Realiza la validación de las credenciales y establece la sesión del usuario.

    Returns:
        jsonify: Respuesta JSON con el resultado del inicio de sesión.
"""
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
            # Establecemos la sesión para un participante
            if validate(Contrasenia, participante.Contrasenia):
                session.clear()
                session['IDParticipante'] = participante.IDParticipante
                session['NombreCompleto'] = participante.NombreCompleto
                session['ImagenPerfil'] = participante.ImagenPerfil
                session['Contrasenia'] = participante.Contrasenia
                session['NombreUsuario'] = participante.NombreParticipante
                session['Correo'] = participante.Correo
                session['Rol'] = participante.Rol

                session.modified = True

                return jsonify({'success': True, 
                                'message': 'Inicio de sesión exitoso', 
                                'ID': participante.IDParticipante,
                                'NombreCompleto': participante.NombreCompleto, 
                                'ImagenPerfil': participante.ImagenPerfil,
                                'Contrasenia': participante.Contrasenia,
                                'NombreUsuario': participante.NombreParticipante, 
                                'Correo': participante.Correo, 
                                'Rol': participante.Rol})
            else:
                return jsonify({'success': False, 'message': 'Contraseña incorrecta'})

        # Si no se encontró en Participante, intenta en SuperAdministrador
        superadmins = get_superAdmin_by_email(Correo)

        if superadmins:
            superadmin = superadmins[0]
            # Establecemos la sesión para un superadministrador
            if validate(Contrasenia, superadmin.Contrasenia):
                session.clear()
                session['IDSuperAdministrador'] = superadmin.IDSuperAdministrador
                session['NombreCompleto'] = superadmin.NombreCompleto
                session['ImagenPerfil'] = superadmin.ImagenPerfil
                session['Contrasenia'] = superadmin.Contrasenia
                session['NombreUsuario'] = superadmin.NombreSuperadministrador
                session['Correo'] = superadmin.Correo
                session['Rol'] = superadmin.Rol

                session.modified = True

                return jsonify({'success': True, 
                                'message': 'Inicio de sesión exitoso', 
                                'ID': superadmin.IDSuperAdministrador,
                                'NombreCompleto': superadmin.NombreCompleto, 
                                'ImagenPerfil': superadmin.ImagenPerfil, 
                                'Contrasenia': superadmin.Contrasenia,
                                'NombreUsuario': superadmin.NombreSuperadministrador, 
                                'Correo': superadmin.Correo,
                                'Rol': superadmin.Rol,})
            else:
                return jsonify({'success': False, 'message': 'Contraseña incorrecta'})

        # Si no se encontró en SuperAdministrador, intentamos en Administrador
        admins = get_administrador_by_email(Correo)

        if admins:
            admin = admins[0]
            # Establecemos la sesión para un administrador
            if validate(Contrasenia, admin.Contrasenia):
                session.clear()
                session['IDAdministrador'] = admin.IDAdministrador
                session['IDSuperAdministrador'] = admin.IDSuperAdministrador
                session['NombreCompleto'] = admin.NombreCompleto
                session['ImagenPerfil'] = admin.ImagenPerfil
                session['Contrasenia'] = admin.Contrasenia
                session['NombreUsuario'] = admin.NombreAdministrador
                session['Correo'] = admin.Correo
                session['Rol'] = admin.Rol

                session.modified = True

                return jsonify({'success': True, 
                                'message': 'Inicio de sesión exitoso', 
                                'ID':admin.IDAdministrador,
                                'IDSuperAdministrador':admin.IDSuperAdministrador,
                                'NombreCompleto': admin.NombreCompleto, 
                                'ImagenPerfil': admin.ImagenPerfil, 
                                'Contrasenia': admin.Contrasenia,
                                'NombreUsuario': admin.NombreAdministrador, 
                                'Correo': admin.Correo,
                                'Rol': admin.Rol})
            else:
                return jsonify({'success': False, 'message': 'Contraseña incorrecta'})

        # Si no se encontró en ninguna de las tablas, muestra un mensaje de correo inexistente
        return jsonify({'success': False, 'message': 'Correo inexistente'})
    except KeyError:
        return jsonify({'success': False, 'message': 'No se envió correctamente el correo y/o la contraseña'})

"""
    Ruta para la página principal, verifica si el usuario ha iniciado sesión.

    Returns:
        render_template: Devuelve la plantilla de la página principal o redirige al inicio de sesión si no se ha iniciado sesión.
"""
@app.route('/index', methods=['GET', 'POST'])
def index():
    if session.get('NombreParticipante', None) is None:
        flash('Por favor primero inicie sesión.')
        return redirect(url_for('login'))
    return render_template('index.html')

if __name__ == '__main__':
    app.run()
from flask import Blueprint, request, session, jsonify
import re

from model.model_administrador import get_administrador_by_email, get_administrador_by_name
from model.model_participante import get_participante_by_email, get_participante_by_name
from model.model_registrar import registrar_participante
from model.model_superAdmin import get_superAdmin_by_email, get_superAdmin_by_name

# ------------------------------ REGISTRAR PERFIL ------------------------------

registrar_perfil = Blueprint('registrar_perfil',  __name__, url_prefix='')

"""
    Función para registrar un nuevo perfil.
    
    Returns:
        jsonify: Respuesta JSON indicando el éxito o fracaso del registro.
"""
@registrar_perfil.route('/registro', methods = ['POST'])
def registro():
    try:
        # Obtenemos los datos del formulario
        Nombre = request.form.get('NombreCompleto')
        Usuario = request.form.get('NombreUsuario')
        Correo = request.form.get('Correo')
        Contrasenia = request.form.get('Contrasenia')
        ConfirmarContrasenia = request.form.get('ConfirmarContrasenia')
        
        # Validamos que el campo del Nombre no esté vacío
        if Nombre == "":
            return jsonify({'success': False, 'message': 'Por favor, ingresa tu nombre completo.'})
        
        # Verificamos si el nombre de usuario ya está registrado en la BD
        usuario_admins = get_administrador_by_name(Usuario)
        usuario_participantes = get_participante_by_name(Usuario)
        usuario_superadmins = get_superAdmin_by_name(Usuario)
        
        if usuario_admins or usuario_participantes or usuario_superadmins:
            return jsonify({'success': False, 'message': 'Nombre de usuario no disponible. Por favor ingresa otro.'})
        elif Usuario == "":
            return jsonify({'success': False, 'message': 'Por favor, ingresa un nombre de usuario.'})
        
        # Verificamos si el correo electrónico ya está registrado en la BD
        correo_admins = get_administrador_by_email(Correo)
        correo_participantes = get_participante_by_email(Correo)
        correo_superadmins = get_superAdmin_by_email(Correo)
        
        if correo_admins or correo_participantes or correo_superadmins:
            return jsonify({'success': False, 'message': 'Correo ya registrado'})
        elif Correo == "":
            return jsonify({'success': False, 'message': 'Por favor, ingresa un correo.'})
    
        # Validamos que la contraseña cumpla con los requisitos mínimos
        patron_contrasenia = re.compile(r"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?¡@$%^&*-]).{8,}$")

        if re.match(patron_contrasenia, Contrasenia) is None:
            return jsonify({'success': False, 'message': 'La contraseña debe tener al menos 8 carácteres y debe contener al menos 1 número, 1 letra mayúscula, 1 letra minúscula y 1 caracter especial (# , ? , ¡ , @ , $ , % , ^ , & , * , -)'})

        # Validamos que la confirmación de contraseña coincida con la contraseña ingresada
        if ConfirmarContrasenia == "" or ConfirmarContrasenia != Contrasenia:
            return jsonify({'success': False, 'message': 'La contraseña debe coincidir con la ingresada'})
        
        # Si lo anterior no se cumple, entonces registramos el participante en la BD
        success = registrar_participante(Nombre, Usuario, Correo, Contrasenia)

        # Obtenemos el participante recién registrado
        participantes = get_participante_by_email(Correo)
        if participantes:
            nuevo_usuario = participantes[0]

            # Guardamos la información del participante en la sesión
            session.clear()
            
            session['IDParticipante'] = nuevo_usuario.IDParticipante
            session['NombreCompleto'] = nuevo_usuario.NombreCompleto
            session['ImagenPerfil'] = nuevo_usuario.ImagenPerfil
            session['Contrasenia'] = nuevo_usuario.Contrasenia
            session['NombreUsuario'] = nuevo_usuario.NombreParticipante
            session['Correo'] = nuevo_usuario.Correo
            session['Rol'] = nuevo_usuario.Rol

            session.modified = True

        # Devolvemos una respuesta JSON indicando el éxito o fracaso del registro
        if success:
            return jsonify({'success': success, 
                            'message': 'Registro exitoso',
                            'ID':nuevo_usuario.IDParticipante, 
                            'NombreCompleto': nuevo_usuario.NombreCompleto, 
                            'ImagenPerfil': nuevo_usuario.ImagenPerfil,
                            'Contrasenia': nuevo_usuario.Contrasenia, 
                            'NombreUsuario': nuevo_usuario.NombreParticipante, 
                            'Correo': nuevo_usuario.Correo,
                            'Rol': nuevo_usuario.Rol})
        else:
            return jsonify({'success': False, 'message': 'Ocurrió un error al intentar realizar el registro'})
    except KeyError:
        return jsonify({'success': False, 'message': 'Ocurrió un error inesperado'})
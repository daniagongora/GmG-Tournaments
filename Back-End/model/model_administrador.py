from alchemyClasses import db
from alchemyClasses.Administrador import Administrador
from CryptoUtils.CryptoUtils import cipher
from flask import request
from hashlib import sha256

"""
    Función que obtiene todos los administradores de la base de datos.

    Returns:
        list: Lista de todos los administradores.
"""
def get_all_administradores():
    return Administrador.query.all()

"""
    Función que obtiene un administrador por su ID.

    Args:
        id (int): ID del administrador a buscar.

    Returns:
        list: Lista de administradores que coinciden con el ID.
"""
def get_administrador_by_id(id):
    return Administrador.query.filter(Administrador.IDAdministrador == id).all()

"""
    Función que obtiene un administrador por su nombre.

    Args:
        name (str): Nombre del administrador a buscar.

    Returns:
        list: Lista de administradores que coinciden con el nombre.
"""
def get_administrador_by_name(name):
    return Administrador.query.filter(Administrador.NombreAdministrador == name).all()

"""
    Función que obtiene un administrador por su correo electrónico.

    Args:
        email (str): Correo electrónico del administrador a buscar.

    Returns:
        list: Lista de administradores que coinciden con el correo electrónico.
"""
def get_administrador_by_email(email):
    return Administrador.query.filter(Administrador.Correo == email).all()

"""
    Función que edita un administrador en la base de datos.

    Args:
        id (int): ID del administrador a editar.
        name (str): Nuevo nombre del administrador.

    Returns:
        bool: True si se editó exitosamente, False si no se encontró el administrador.
"""
def edit_administrador(id, name):
    # Obtenemos el administrador por su ID
    administrador = get_administrador_by_id(id)

    # Si se encontró un administrador válido...
    if administrador:
        # Obtenemos los campos del formulario JSON
        campos = request.get_json()

        # Obtenemos los datos de los campos del formulario
        nombreNuevo = campos.get('NombreCompleto', '')
        usernameNuevo = campos.get('NombreAdministrador', '')
        correoNuevo = campos.get('Correo', '')
        contraseniaNueva = campos.get('Contrasenia', '')

        # Verificamos si se proporcionó un nuevo nombre
        if nombreNuevo:
            administrador.NombreCompleto = nombreNuevo
        # Verificamos si se proporcionó un nuevo nombre de usuario
        if usernameNuevo:
            administrador.NombreAdministrador = usernameNuevo
        # Verificamos si se proporcionó un nuevo correo electrónico
        if correoNuevo:
            administrador.Correo = correoNuevo
        # Verificamos si se proporcionó una nueva contraseña
        if contraseniaNueva:
            administrador.Contrasenia = sha256(cipher(contraseniaNueva)).hexdigest()
        # Guardamos los cambios en la base de datos
        db.session.commit()

        return True
    else:
        return False
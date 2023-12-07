from alchemyClasses import db
from alchemyClasses.SuperAdmin import SuperAdministrador
from CryptoUtils.CryptoUtils import cipher
from flask import request
from hashlib import sha256

"""
    Función que obtiene todos los superadministradores de la base de datos.

    Returns:
        list: Lista de todos los superadministradores.
"""
def get_all_superAdmins():
    return SuperAdministrador.query.all()

"""
    Función que obtiene un superadministrador por su ID.

    Args:
        id (int): ID del superadministrador a buscar.

    Returns:
        list: Lista de superadministradores que coinciden con el ID.
"""
def get_superAdmin_by_id(id):
    return SuperAdministrador.query.filter(SuperAdministrador.IDSuperAdministrador == id).first()

"""
    Función que obtiene un superadministrador por su nombre.

    Args:
        name (str): Nombre del superadministrador a buscar.

    Returns:
        list: Lista de superadministradores que coinciden con el nombre.
"""
def get_superAdmin_by_name(name):
    return SuperAdministrador.query.filter(SuperAdministrador.NombreSuperadministrador == name).all()

"""
    Función que obtiene un superadministrador por su correo electrónico.

    Args:
        email (str): Correo electrónico del superadministrador a buscar.

    Returns:
        list: Lista de superadministradores que coinciden con el correo electrónico.
"""
def get_superAdmin_by_email(email):
    return SuperAdministrador.query.filter(SuperAdministrador.Correo == email).all()

"""
    Función que edita un superadministrador en la base de datos.

    Args:
        id (int): ID del superadministrador a editar.
        name (str): Nombre del superadministrador.

    Returns:
        bool: True si se editó exitosamente, False si no se encontró el superadministrador.
"""  
def edit_superAdmin(id, name):
    # Obtenemos el superadministrador por su ID
    superAdministrador = get_superAdmin_by_id(id)

    # Si se encontró un superadministrador válido...
    if superAdministrador:
        # Obtenemos los campos del formulario JSON
        campos = request.get_json()

        # Obtenemos los datos de los campos del formulario
        nombreNuevo = campos.get('NombreCompleto', '')
        usernameNuevo = campos.get('NombreSuperadministrador', '')
        correoNuevo = campos.get('Correo', '')
        contraseniaNueva = campos.get('Contrasenia', '')

        # Verificamos si se proporcionó un nuevo nombre
        if nombreNuevo:
            superAdministrador.NombreCompleto = nombreNuevo
        # Verificamos si se proporcionó un nuevo nombre de usuario
        if usernameNuevo:
            superAdministrador.NombreSuperadministrador = usernameNuevo
        # Verificamos si se proporcionó un nuevo correo electrónico
        if correoNuevo:
            superAdministrador.Correo = correoNuevo
        # Verificamos si se proporcionó una nueva contraseña
        if contraseniaNueva:
            superAdministrador.Contrasenia = sha256(cipher(contraseniaNueva)).hexdigest()
        # Guardamos los cambios en la base de datos
        db.session.commit()

        return True
    else:
        return False
    
"""
    Función que cambia la imagen de perfil de un superadministrador en la base de datos.

    Args:
        id (int): ID del superadministrador a editar.
        name (str): Nombre del superadministrador.

    Returns:
        bool: True si se editó exitosamente, False si no se encontró el superadministrador.
"""
def edit_image_superAdmin(id, name):
    # Obtenemos el superadministrador por su ID
    superadministrador = get_superAdmin_by_id(id)

    # Si se encontró un superadministrador válido...
    if superadministrador:
        # Obtenemos los campos del formulario JSON
        campos = request.get_json()

        # Obtenemos la nueva imagen de perfil del campo del formulario
        nueva_imagen = campos.get('ImagenPerfil', '')

        # Verificamos si se proporcionó una nueva imagen de perfil
        if nueva_imagen:
            superadministrador.ImagenPerfil = nueva_imagen

        # Guardamos los cambios en la base de datos
        db.session.commit()

        return True
    else:
        return False
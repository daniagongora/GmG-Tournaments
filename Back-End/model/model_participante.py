from alchemyClasses import db
from alchemyClasses.Administrador import Administrador
from alchemyClasses.Participante import Participante
from CryptoUtils.CryptoUtils import cipher
from CryptoUtils.CryptoUtils import decipher
from flask import request
from hashlib import sha256

from model.model_amistar import get_relationships

"""
    Función que obtiene todos los participantes de la base de datos.

    Returns:
        list: Lista de todos los participantes.
"""
def get_all_participantes():
    return Participante.query.all()

"""
    Función que obtiene un participante por su ID.

    Args:
        id (int): ID del participante a buscar.

    Returns:
        list: Lista de participantes que coinciden con el ID.
"""
def get_participante_by_id(id):
    return Participante.query.filter(Participante.IDParticipante == id).first()

"""
    Función que obtiene un participante por su nombre.

    Args:
        name (str): Nombre del participante a buscar.

    Returns:
        list: Lista de participantes que coinciden con el nombre.
"""
def get_participante_by_name(name):
    return Participante.query.filter(Participante.NombreParticipante == name).first()

"""
    Función que obtiene un participante por su correo electrónico.

    Args:
        email (str): Correo electrónico del participante a buscar.

    Returns:
        list: Lista de participantes que coinciden con el correo electrónico.
"""
def get_participante_by_email(email):
    return Participante.query.filter(Participante.Correo == email).all()

"""
    Función que elimina un participante en la base de datos.

    Args:
        id (int): ID del participante a eliminar.

    Returns:
        bool: True si se eliminó exitosamente, False si no se encontró el participante.
"""
def delete_participante(id):
    # Obtenemos el participante por su ID
    participante = get_participante_by_id(id)
    # Verificamos si el participante existe
    if participante:
        # Obtenemos las relaciones de amistad del participante
        registros_amistar = get_relationships(id)

        try:
            # Eliminamos todas las relaciones de amistad del participante
            for registro in registros_amistar:
                db.session.delete(registro)
            # Eliminamos al participante de la base de datos
            db.session.delete(participante)
            # Guardamos los cambios en la base de datos
            db.session.commit()

            return True
        except Exception:
            return False

"""
    Función que edita un participante en la base de datos.

    Args:
        id (int): ID del participante a editar.
        name (str): Nuevo nombre del participante.

    Returns:
        bool: True si se editó exitosamente, False si no se encontró el participante.
"""   
def edit_participante(id, name):
    # Obtenemos el participante por su ID
    participante = get_participante_by_id(id)

    # Si se encontró un participante válido...
    if participante:
        # Obtenemos los campos del formulario JSON
        campos = request.get_json()

        # Obtenemos los datos de los campos del formulario
        nombreNuevo = campos.get('NombreCompleto', '')
        usernameNuevo = campos.get('NombreParticipante', '')
        correoNuevo = campos.get('Correo', '')
        contraseniaNueva = campos.get('Contrasenia', '')

        # Verificamos si se proporcionó un nuevo nombre
        if nombreNuevo:
            participante.NombreCompleto = nombreNuevo
        # Verificamos si se proporcionó un nuevo nombre de usuario
        if usernameNuevo:
            participante.NombreParticipante = usernameNuevo
        # Verificamos si se proporcionó un nuevo correo electrónico
        if correoNuevo:
            participante.Correo = correoNuevo
        # Verificamos si se proporcionó una nueva contraseña
        if contraseniaNueva:
            participante.Contrasenia = sha256(cipher(contraseniaNueva)).hexdigest()
        # Guardamos los cambios en la base de datos
        db.session.commit()

        return True
    else:
        return False
    
"""
    Función que cambia la imagen de perfil de un participante en la base de datos.

    Args:
        id (int): ID del participante a editar.
        name (str): Nuevo nombre del participante.

    Returns:
        bool: True si se editó exitosamente, False si no se encontró el participante.
"""
def edit_image_participante(id, name):
    # Obtenemos el participante por su ID
    participante = get_participante_by_id(id)

    # Si se encontró un participante válido...
    if participante:
        # Obtenemos los campos del formulario JSON
        campos = request.get_json()
        # Obtenemos la nueva imagen de perfil del campo del formulario
        nueva_imagen = campos.get('ImagenPerfil', '')
        
        # Verificamos si se proporcionó una nueva imagen de perfil
        if nueva_imagen:
            participante.ImagenPerfil = nueva_imagen

        # Guardamos los cambios en la base de datos
        db.session.commit()

        return True
    else:
        return False
    
"""
    Función para cambiar el rol de un participante por administrador.

    Args:
        id (int): ID del participante.
        name (str): Nombre del participante.

    Returns:
        bool: True si se cambió exitosamente, False si no se encontró el participante.
"""
def become_admin(id, name):
    # Obtenemos el participante por su nombre
    participante = get_participante_by_name(name)

    # Si se encontró un participante válido...
    if participante:
        # Creamos un nuevo administrador con los datos del participante
        nuevo_administrador = Administrador(
            NombreCompleto = participante.NombreCompleto,
            ImagenPerfil = participante.ImagenPerfil,
            Contrasenia = participante.Contrasenia,
            NombreAdministrador = participante.NombreParticipante,
            Correo = participante.Correo,
            Rol = 'Administrador'
        )

        # Agregamos el nuevo administrador a la sesión y confirmamos los cambios
        db.session.add(nuevo_administrador)
        # Guardamos los cambios en la base de datos
        db.session.commit()

        # Eliminamos el participante original y confirmamos la eliminación
        delete_participante(participante.IDParticipante)
        # Guardamos los cambios en la base de datos
        db.session.commit()

        return True
    else:
        return False
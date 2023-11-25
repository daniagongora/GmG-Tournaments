from alchemyClasses import db
from alchemyClasses.Participante import Participante
from CryptoUtils.CryptoUtils import cipher
from flask import request
from hashlib import sha256

from model.model_amistar import get_friendships

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
    participante = get_participante_by_id(id)
        
    if participante:
        registros_amistar = get_friendships(id)

        try:
            for registro in registros_amistar:
                db.session.delete(registro)
        
            db.session.delete(participante)
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
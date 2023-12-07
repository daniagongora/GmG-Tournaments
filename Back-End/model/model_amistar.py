from alchemyClasses import db
from alchemyClasses.Amistar import Amistar

"""
    Función que obtiene las amistades del usuario de la base de datos.

    Args:
        id (int): ID del usuario del que queremos obtener sus amistades.

    Returns:
        list: Lista de todos los amigos.
"""
def get_friendships(id):
    amigos = Amistar.query.filter((Amistar.Solicitante == id) | 
                                  (Amistar.Receptor == id), Amistar.Estatus == 1).all()
    return amigos

"""
    Función que obtiene las amistades o solicitudes del usuario de la base de datos.

    Args:
        id (int): ID del usuario del que queremos obtener sus amistades o solicitudes.
    
    Returns:
        list: Lista de todos los amigos o solicitudes en la tabla amistar.
"""
def get_relationships(id):
    amigos = Amistar.query.filter((Amistar.Solicitante == id) | 
                                  (Amistar.Receptor == id)).all()
    return amigos

"""
    Función que obtiene las solicitudes de amistad del usuario de la base de datos.

    Args:
        id (int): ID del usuario del cual obtenemos sus solicitudes.

    Returns:
        list: Lista de solicitudes que el usuario recibió.
"""
def get_request_friends(id):
    solicitudes = Amistar.query.filter( (Amistar.Receptor == id), Amistar.Estatus == 0).all()

    return solicitudes

"""
    Función que acepta la solicitud de amistad de un usuario.

    Args:
        solicitante (str): El nombre de usuario del solicitante.
        receptor (str): El nombre de usuario del receptor.

    Returns:
        bool: True si se editó exitosamente, False si no se encontró la solicitud.
"""
def accept_request(solicitante, receptor):
    solicitud = Amistar.query.filter_by(Solicitante=solicitante, Receptor=receptor, Estatus=0).first()

    if solicitud:
        # Cambiamos el estatus de la solicitud a 1 (aceptada)
        solicitud.Estatus = 1
        # Guardamos los cambios en la base de datos
        db.session.commit() 

        return True
    else:
        return False

"""
    Función que rechaza la solicitud de amistad de un usuario.

    Args:
        solicitante (str): El nombre de usuario del solicitante.
        receptor (str): El nombre de usuario del receptor.
        estatus (int): El estado de la solicitud de amistad a ser rechazada.

    Returns:
        bool: True si se eliminó exitosamente, False si no se encontró la solicitud.
"""
def reject_request(solicitante, receptor, estatus):
    solicitud = Amistar.query.filter_by(Solicitante=solicitante, Receptor=receptor, Estatus=estatus).first()

    if solicitud:
        # Eliminamos la solicitud de amistad, es decir, el registro de esa relación
        db.session.delete(solicitud)
        db.session.commit()
        
        return True
    else:
        return False

"""
    Función que elimina la amistad de un usuario.

    Args:
        solicitante (str): El nombre de usuario de un participante.
        receptor (str): El nombre de usuario del otro participante.

    Returns:
        bool: True si se eliminó exitosamente, False si no se encontró la solicitud.
"""
def delete_friend(solicitante, receptor):
    # Buscamos la amistad donde el participante es solicitante
    solicitud = Amistar.query.filter_by(Solicitante=solicitante, Receptor=receptor, Estatus=1).first()

    if not solicitud:
        # Si no se encontró la amistad donde el participante es solicitante, buscamos como receptor
        solicitud = Amistar.query.filter_by(Solicitante=receptor, Receptor=solicitante, Estatus=1).first()

    if solicitud:
        # Eliminamos la solicitud de amistad, es decir, el registro de esa relación
        db.session.delete(solicitud)
        db.session.commit()

        return True
    else:
        return False
    
"""
    Función que agrega una solicitud de amistad.

    Args:
        solicitante (str): El nombre de usuario del solicitante.
        receptor (str): El nombre de usuario del receptor.

    Returns:
        bool: True si se agregó correctamente, False si no se agregó correctamente.
"""
def send_request(solicitante, receptor):
    solicitud = Amistar(solicitante, receptor, 0)

    # Verificamos si se creó correctamente la solicitud
    if solicitud:
        # Agregamos la solicitud a la sesión de la base de datos
        db.session.add(solicitud)
        # Guardamos los cambios en la base de datos
        db.session.commit()
        
        return True
    else:
        return False
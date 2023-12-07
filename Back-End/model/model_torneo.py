from alchemyClasses.Torneo import Torneo
from alchemyClasses import db

"""
    Función que obtiene todos los torneos de la base de datos.

    Returns:
        list: Lista de todos los torneos.
"""
def get_all_torneos():
    return Torneo.query.all()

"""
    Función que obtiene un torneo por su ID.

    Args:
        id (int): ID del torneo a buscar.

    Returns:
        list: Lista de torneos que coinciden con el ID.
"""
def get_torneo_by_id(id):
    return Torneo.query.filter(Torneo.IDTorneo == id).all()

"""
    Función que obtiene los torneos de un administrador por su ID.

    Args:
        idAdministrador (int): ID del administrador.

    Returns:
        list: Lista de torneos que coinciden con el ID del administrador.
"""
def get_torneos_by_administrador(idAdministrador):
    return Torneo.query.filter(Torneo.IDAdministrador == idAdministrador)

"""
    Función que obtiene un torneo por su nombre.

    Args:
        name (str): Nombre del torneo a buscar.

    Returns:
        list: Lista de torneos que coinciden con el nombre.
"""
def get_torneo_by_name(name):
    return Torneo.query.filter(Torneo.NombreTorneo == name).all()

"""
    Función que obtiene los torneos por su plataforma.

    Args:
        platform (str): Plataforma del torneo a buscar.

    Returns:
        list: Lista de torneos que coinciden con la plataforma.
"""
def get_torneo_by_plataforma(platform):
    return Torneo.query.filter(Torneo.Plataforma == platform).all()

"""
    Función que obtiene los torneos por su videojuego.

    Args:
        videogame (str): Videojuego del torneo a buscar.

    Returns:
        list: Lista de torneos que coinciden con el videojuego.
"""
def get_torneo_by_videojuego(videogame):
    return Torneo.query.filter(Torneo.Videojuego == videogame).all()

"""
    Función que agrega un nuevo torneo a la base de datos.

    Args:
        idAdministrador (int): ID del administrador del torneo.
        nombreTorneo (str): Nombre del torneo.
        fechaInicio (str): Fecha de inicio del torneo.
        cupoMaximo (int): Cupo máximo de participantes del torneo.
        videojuego (str): Videojuego del torneo.
        plataforma (str): Plataforma del torneo.
        descripcion (str): Descripción del torneo.
        fechaCreacion (str): Fecha de creación del torneo.

    Returns:
        bool: True si se agregó exitosamente, False si no se pudo agregar.
"""
def add_new_torneo(idAdministrador, nombreTorneo, fechaInicio, cupoMaximo, videojuego, plataforma, descripcion, fechaCreacion):
    # Creamos una instancia de Torneo con los datos proporcionados
    newTorneo = Torneo(idAdministrador, nombreTorneo, fechaInicio, cupoMaximo, videojuego, plataforma, descripcion, True, fechaCreacion)
    # Si alguno de los campos requeridos está vacío, devolvemos False
    if nombreTorneo == '' or videojuego == '' or plataforma == '':
        return False
    
    try:
        # Agregamos el nuevo torneo a la sesión de la base de datos 
        db.session.add(newTorneo)
        # Guardamos los cambios en la base de datos
        db.session.commit()
        
        return True
    except Exception:
        return False

"""
    Función que elimina un torneo de la base de datos por su ID.

    Args:
        idTorneo (int): ID del torneo a eliminar.

    Returns:
        bool: True si se eliminó exitosamente, False si no se pudo eliminar.
"""
def delete_torneo(idTorneo):
    # Creamos una instancia de Torneo utilizando el ID proporcionado
    torneoAEliminar = Torneo.query.get(idTorneo)
    
    # Verificamos si se creó correctamente el torneo
    if torneoAEliminar:
        # Borramos el torneo de la sesión de la base de datos
        db.session.delete(torneoAEliminar)
        # Guardamos los cambios en la base de datos
        db.session.commit()

        return True
    else:
        return False
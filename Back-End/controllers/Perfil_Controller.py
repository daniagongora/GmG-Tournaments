from flask import Blueprint, request, jsonify, session

from alchemyClasses import db

from model.model_amistar import get_friendships, get_request_friends, accept_request, reject_request, delete_friend
from model.model_administrador import edit_administrador
from model.model_participante import get_participante_by_id, delete_participante, edit_participante, get_participante_by_name
from model.model_superAdmin import edit_superAdmin

# ------------------------------ EDITAR PERFIL ------------------------------
# ------------------------------ ADMINISTRADOR ------------------------------

editar_perfil_administrador = Blueprint('editar_perfil_administrador', __name__, url_prefix='/administrador')

"""
    Función para editar el perfil de un administrador.

    Args:
        id (int): El ID del administrador.
        name (str): El nombre del administrador.

    Returns:
        jsonify: Respuesta JSON indicando el éxito o fracaso de la operación.
"""
@editar_perfil_administrador.route('/perfil<int:id>/<name>/editar', methods=('GET', 'POST'))
def editar_datos(id, name):
    try:
        if request.method == 'POST':
            success = edit_administrador(id, name)

            if success:
                return jsonify({'success': success, 'message': 'Se actualizaron los datos exitosamente'})
            else:
                return jsonify({'success': success, 'message': 'Ocurrió un error al intentar actualizar los datos'})

    except Exception:
        return jsonify({'success': False, 'message': 'Ocurrió un error inesperado'})
    
# ------------------------------ EDITAR PERFIL ------------------------------
# ------------------------------ PARTICIPANTE -------------------------------
    
editar_perfil_participante = Blueprint('editar_perfil_participante', __name__, url_prefix='/participante')

"""
    Función para editar el perfil de un participante.

    Args:
        id (int): El ID del participante.
        name (str): El nombre del participante.

    Returns:
        jsonify: Respuesta JSON indicando el éxito o fracaso de la operación.
"""
@editar_perfil_participante.route('/perfil<int:id>/<name>/editar', methods=('GET', 'POST'))
def editar_datos(id, name):
    try:
        if request.method == 'POST':
            success = edit_participante(id, name)

            if success:
                return jsonify({'success': success, 'message': 'Se actualizaron los datos exitosamente'})
            else:
                return jsonify({'success': success, 'message': 'Ocurrió un error al intentar actualizar los datos'})

    except Exception:
        return jsonify({'success': False, 'message': 'Ocurrió un error inesperado'})
    
# ------------------------------ EDITAR PERFIL ------------------------------
# ---------------------------- SUPERADMINISTRADOR ---------------------------

editar_perfil_superAdmin = Blueprint('editar_perfil_superAdmin', __name__, url_prefix='/superadministrador')

"""
    Función para editar el perfil de un superadministrador.

    Args:
        id (int): El ID del superadministrador.
        name (str): El nombre del superadministrador.

    Returns:
        jsonify: Respuesta JSON indicando el éxito o fracaso de la operación.
"""
@editar_perfil_superAdmin.route('/perfil<int:id>/<name>/editar', methods=('GET', 'POST'))
def editar_datos(id, name):
    try:
        if request.method == 'POST':
            success = edit_superAdmin(id, name)

            if success:
                return jsonify({'success': success, 'message': 'Se actualizaron los datos exitosamente'})
            else:
                return jsonify({'success': success, 'message': 'Ocurrió un error al intentar actualizar los datos'})

    except Exception:
        return jsonify({'success': False, 'message': 'Ocurrió un error inesperado'})

# ------------------------------ ELIMINAR PERFIL ------------------------------

eliminar_perfil = Blueprint('eliminar_perfil', __name__, url_prefix='/participante')

"""
    Función para eliminar el perfil de un participante.

    Args:
        id (int): El ID del participante.

    Returns:
        jsonify: Respuesta JSON indicando el éxito o fracaso de la operación.
"""
@eliminar_perfil.route('/eliminarPerfil/<int:id>', methods=['POST'])
def eliminar_participante(id):
    if request.method == 'POST':
        try:
            success = delete_participante(id)

            if success: 
                return jsonify({'success': success, 'message': 'Se eliminó el perfil exitosamente'})
            else:
                return jsonify({'success': success, 'message': 'Ocurrió un error al intentar eliminar el perfil'})
            
        except Exception:
            db.session.rollback()
            return jsonify({'success': False, 'message': 'Ocurrió un error inesperado'})

# ------------------------------ VER AMIGOS ------------------------------

ver_amigos = Blueprint('ver_amigos', __name__, url_prefix='/participante')

"""
    Función para obtener la lista de amigos de un participante.

    Args:
        id (int): El ID del participante.
        name (str): El nombre del participante.

    Returns:
        jsonify: Respuesta JSON con la lista de amigos o un mensaje de error.
"""
@ver_amigos.route('/perfil<int:id>/<name>/amigos', methods=['GET'])
def ver_amigos_participante(id, name):
    # Obtenemos el participante dado su ID
    participante = get_participante_by_id(id)

    # Verificamos si existe el participante
    if participante:
        # Obtenemos el ID del participante
        id_participante = participante.IDParticipante

        # Buscamos amigos del participante con estatus 1:
        # El estatus 1 denota solicitudes aceptadas
        # El estatus 0 denota solicitudes sin aceptar pendientes
        amigos = get_friendships(id_participante)

        # Lista que almacenará los amigos del participante
        lista_amigos = []
        # Iteramos sobre la lista de amigos
        for amigo in amigos:
            # Determinamos el ID del amigo basado en el rol de solicitante/receptor
            if amigo.Solicitante == id_participante:
                id_amigo = amigo.Receptor
            else:
                id_amigo = amigo.Solicitante

            # Obtenemos la información del amigo usando su ID
            amigo = get_participante_by_id(id_amigo)

            # Verificamos si se encontró información del amigo
            if amigo:
                # Agregamos la información del amigo a la lista
                lista_amigos.append({
                    'IDAmigo': amigo.IDParticipante,
                    'ImagenPerfil': amigo.ImagenPerfil,
                    'NombreParticipante': amigo.NombreParticipante,
                })

        return jsonify({'success': True, 'amigos': lista_amigos})

    return jsonify({'success': False, 'message': 'Participante no encontrado'})

# ------------------------------ VER SOLICITUDES DE AMISTAD ------------------------------

ver_solicitudes = Blueprint('ver_solicitudes', __name__, url_prefix='/participante')

"""
    Función para obtener la lista de solicitudes de amistad de un participante.

    Args:
        id (int): El ID del participante.
        name (str): El nombre del participante.

    Returns:
        jsonify: Respuesta JSON con la lista de solicitudes o un mensaje de error.
"""
@ver_solicitudes.route('/perfil<int:id>/<name>/solicitudes', methods=['GET'])
def ver_solicitudes_participante(id, name):
    # Obtenemos el participante dado su ID
    participante = get_participante_by_id(id)

    # Verificamos si existe el participante
    if participante:
        # Obtenemos el ID del participante
        id_participante = participante.IDParticipante

        # Buscamos amigos del participante con estatus 0 (pendientes)
        solicitudes = get_request_friends(id_participante)

        # Lista que almacenará las solicitudes del participante
        lista_solicitudes = []

        # Iteramos sobre las solicitudes pendientes
        for solicitud in solicitudes:
            # Determinamos el ID del solicitante/receptor basado en el rol
            if solicitud.Solicitante == id_participante:
                id_solicitud = solicitud.Receptor
            else:
                id_solicitud = solicitud.Solicitante

            # Obtenemos la información del usuario de la solicitud usando su ID
            solicitud_usuario = get_participante_by_id(id_solicitud)

            # Verificamos si se encontró información del usuario de la solicitud
            if solicitud_usuario:
                # Agregamos la información del usuario de la solicitud a la lista
                lista_solicitudes.append({
                    'IDSolicitante': solicitud_usuario.IDParticipante,
                    'ImagenPerfil': solicitud_usuario.ImagenPerfil,
                    'NombreParticipante': solicitud_usuario.NombreParticipante,
                })

        return jsonify({'success': True, 'solicitudes': lista_solicitudes})

    return jsonify({'success': False, 'message': 'Participante no encontrado'})

# ------------------------------ ACEPTAR SOLICITUDES DE AMISTAD ------------------------------

aceptar_amistad = Blueprint('aceptar_amistad', __name__, url_prefix='/participante')

"""
    Función para aceptar la solitud de amistad de un participante.

    Args:
        solicitante (id): El ID del participante que solicito la amistad.
        receptor (id): El ID del participante que recibio la solicitud de amistad.

    Returns:
        jsonify: Respuesta JSON con la lista de solicitudes o un mensaje de error.
"""
@aceptar_amistad.route('/aceptar_amistad/<int:solicitante>/<int:receptor>', methods=['POST'])
def aceptar_amistad_participante(solicitante, receptor):
    solicitud_aceptada = accept_request(solicitante, receptor)

    if solicitud_aceptada:
        return jsonify({'success': True, 'message': 'Solicitud de amistad aceptada'})
    else:
        return jsonify({'success': False, 'message': 'No se pudo encontrar la solicitud de amistad pendiente'})

# ------------------------------ RECHAZAR SOLICITUDES DE AMISTAD ------------------------------

rechazar_amistad = Blueprint('rechazar_amistad', __name__, url_prefix='/participante')

"""
    Función para rechazar la solitud de amistad de un participante.

    Args:
        solicitante (id): El ID del participante que solicito la amistad.
        receptor (id): El ID del participante que recibio la solicitud de amistad.
        
    Returns:
        jsonify: Respuesta JSON con la lista de solicitudes o un mensaje de error.
"""
@rechazar_amistad.route('/rechazar_amistad/<int:solicitante>/<int:receptor>', methods=['POST'])
def rechazar_amistad_participante(solicitante, receptor):
    solicitud_rechazada = reject_request(solicitante, receptor, 0)

    if solicitud_rechazada:
        return jsonify({'success': True, 'message': 'Solicitud de amistad rechazada'})
    else:
        print("No se encontró la solicitud de amistad pendiente")
        return jsonify({'success': False, 'message': 'No se pudo encontrar la solicitud de amistad pendiente'})

# ------------------------------ ELIMINAR AMISTAD ------------------------------

eliminar_amistad = Blueprint('eliminar_amistad', __name__, url_prefix='/participante')

"""
    Función para eliminar la amistad de un participante.

    Args:
        solicitante (id): El ID del participante que solicito la amistad.
        receptor (id): El ID del participante que recibio la solicitud de amistad.

    Returns:
        jsonify: Respuesta JSON con la lista de solicitudes o un mensaje de error.
"""
@eliminar_amistad.route('/eliminar_amistad/<int:solicitante>/<int:receptor>', methods=['POST'])
def eliminar_amistad_participante(solicitante, receptor):
    amistad_eliminada = delete_friend(solicitante, receptor)

    if amistad_eliminada:
        return jsonify({'success': True, 'message': 'Solicitud de amistad rechazada'})
    else:
        return jsonify({'success': False, 'message': 'No se pudo encontrar la solicitud de amistad pendiente'})
    
# ------------------------------ BUSCAR USUARIO ------------------------------
# ------------------------------ PARTICIPANTE ------------------------------

buscar_usuario_participante = Blueprint('buscar_usuario_participante',  __name__, url_prefix='/participante')

"""
    Función para buscar un usuario siendo un participante.

    Args:
        id (int): El ID del participante.
        name (str): El nombre del participante.

    Returns:
        jsonify: Respuesta JSON con los datos del usuario buscado o un mensaje de error.
"""
@buscar_usuario_participante.route('/perfil<int:id>/<name>/amigos/buscarUsuario', methods = ['POST'])
def buscar(id,name):
    try:
        # Obtenemos al usuario por su nombre de usuario
        Usuario = request.form.get('NombreUsuario')

        # Buscamos al usuario en la base de datos
        usuario_participante = get_participante_by_name(Usuario)

        participante = get_participante_by_id(id)

        # Si el usuario existe, obtenemos su información
        if usuario_participante and participante:
            session.clear()
            session['NombreCompleto'] = usuario_participante.NombreCompleto
            session['NombreUsuario'] = usuario_participante.NombreParticipante
            session['Correo'] = usuario_participante.Correo
            session['ImagenPerfil'] = usuario_participante.ImagenPerfil
            session['Rol'] = usuario_participante.Rol
            esAmigo = False
            session.modified = True
            # Obtenemos el ID del participante y buscamos sus amistades
            id_participante = participante.IDParticipante
            amigos = get_friendships(id_participante)
            # Verificamos si el usuario es amigo del participante actual
            for amigo in amigos:
                if amigo.Solicitante == id_participante and amigo.Receptor == usuario_participante.IDParticipante:
                    esAmigo = True
                    break
                elif  amigo.Receptor == id_participante and amigo.Solicitante == usuario_participante.IDParticipante:
                    esAmigo = True
                    break
            # Devolvemos la información del usuario encontrado
            return jsonify({'success': True, 
                                'message': 'Usuario encontrado', 
                                'NombreCompleto': usuario_participante.NombreCompleto, 
                                'NombreUsuario': usuario_participante.NombreParticipante, 
                                'Correo':usuario_participante.Correo,
                                'ImagenPerfil': usuario_participante.ImagenPerfil, 
                                'Rol': usuario_participante.Rol,
                                'Amigo' : esAmigo})
        elif Usuario == "":
            return jsonify({'success': False, 'message': 'Escribe un nombre de usuario por favor'})
        else:
            return jsonify({'success': False, 'message': 'Usuario no encontrado'})
    except KeyError:
        return jsonify({'success': False, 'message': 'No se envió correctamente el nombre de usuario'})
    
# ------------------------------ BUSCAR USUARIO ------------------------------
# ---------------------------- SUPERADMINISTRADOR ----------------------------
    
buscar_usuario_superAdmin = Blueprint('buscar_usuario_superAdmin', __name__, url_prefix='/superadministrador')

"""
    Función para buscar un usuario siendo un superadministrador.

    Args:
        id (int): El ID del superadministrador.
        name (str): El nombre del superadministrador.

    Returns:
        jsonify: Respuesta JSON con los datos del usuario buscado o un mensaje de error.
"""
@buscar_usuario_superAdmin.route('/perfil<int:id>/<name>/gestionar/buscarUsuario', methods = ['POST'])
def buscar(id,name):
    try:
        # Obtenemos al usuario por su nombre de usuario
        Usuario = request.form.get('NombreUsuario')

        # Buscamos al usuario en la base de datos
        usuario_participante = get_participante_by_name(Usuario)

        participante = get_participante_by_id(id)

        # Si el usuario existe, obtenemos su información
        if usuario_participante and participante:
            session.clear()
            session['NombreCompleto'] = usuario_participante.NombreCompleto
            session['NombreUsuario'] = usuario_participante.NombreParticipante
            session['Correo'] = usuario_participante.Correo
            session['ImagenPerfil'] = usuario_participante.ImagenPerfil
            session['Rol'] = usuario_participante.Rol
            session.modified = True
            # Devolvemos la información del usuario encontrado
            return jsonify({'success': True, 
                                'message': 'Usuario encontrado', 
                                'NombreCompleto': usuario_participante.NombreCompleto, 
                                'NombreUsuario': usuario_participante.NombreParticipante, 
                                'Correo':usuario_participante.Correo,
                                'ImagenPerfil': usuario_participante.ImagenPerfil, 
                                'Rol': usuario_participante.Rol})
        elif Usuario == "":
            return jsonify({'success': False, 'message': 'Escribe un nombre de usuario por favor'})
        else:
            return jsonify({'success': False, 'message': 'Usuario no encontrado'})
    except KeyError:
        return jsonify({'success': False, 'message': 'No se envió correctamente el nombre de usuario'})
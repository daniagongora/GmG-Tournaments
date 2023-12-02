from flask import Blueprint, request, jsonify, session

from alchemyClasses import db

from model.model_amistar import get_friendships, get_request_friends, accept_request, reject_request, delete_friend, send_request
from model.model_administrador import edit_administrador, edit_image_administrador
from model.model_participante import get_participante_by_id, delete_participante, edit_participante, edit_image_participante, get_participante_by_name
from model.model_superAdmin import edit_superAdmin, edit_image_superAdmin

# ------------------------------ EDITAR DATOS ------------------------------
# ------------------------------ ADMINISTRADOR ------------------------------

editar_datos_administrador = Blueprint('editar_datos_administrador', __name__, url_prefix='/administrador')

"""
    Función para editar los datos de un administrador.

    Args:
        id (int): El ID del administrador.
        name (str): El nombre del administrador.

    Returns:
        jsonify: Respuesta JSON indicando el éxito o fracaso de la operación.
"""
@editar_datos_administrador.route('/perfil<int:id>/<name>/editar', methods=('GET', 'POST'))
def editar_datos(id, name):
    try:
        if request.method == 'POST':
            # Intentamos realizar la edición de datos del administrador
            success = edit_administrador(id, name)
            # Verificamos si la edición fue exitosa
            if success:
                return jsonify({'success': success, 'message': 'Se actualizaron los datos exitosamente'})
            else:
                return jsonify({'success': success, 'message': 'Ocurrió un error al intentar actualizar los datos'})

    except Exception:
        return jsonify({'success': False, 'message': 'Ocurrió un error inesperado'})
    
# ------------------------------ EDITAR DATOS ------------------------------
# ------------------------------ PARTICIPANTE -------------------------------
    
editar_datos_participante = Blueprint('editar_datos_participante', __name__, url_prefix='/participante')

"""
    Función para editar los datos de un participante.

    Args:
        id (int): El ID del participante.
        name (str): El nombre del participante.

    Returns:
        jsonify: Respuesta JSON indicando el éxito o fracaso de la operación.
"""
@editar_datos_participante.route('/perfil<int:id>/<name>/editar', methods=('GET', 'POST'))
def editar_datos(id, name):
    try:
        if request.method == 'POST':
            # Intentamos realizar la edición de datos del participante
            success = edit_participante(id, name)
            # Verificamos si la edición fue exitosa
            if success:
                return jsonify({'success': success, 'message': 'Se actualizaron los datos exitosamente'})
            else:
                return jsonify({'success': success, 'message': 'Ocurrió un error al intentar actualizar los datos'})

    except Exception:
        return jsonify({'success': False, 'message': 'Ocurrió un error inesperado'})
    
# ------------------------------ EDITAR DATOS ------------------------------
# ---------------------------- SUPERADMINISTRADOR ---------------------------

editar_datos_superAdmin = Blueprint('editar_datos_superAdmin', __name__, url_prefix='/superadministrador')

"""
    Función para editar los datos de un superadministrador.

    Args:
        id (int): El ID del superadministrador.
        name (str): El nombre del superadministrador.

    Returns:
        jsonify: Respuesta JSON indicando el éxito o fracaso de la operación.
"""
@editar_datos_superAdmin.route('/perfil<int:id>/<name>/editar', methods=('GET', 'POST'))
def editar_datos(id, name):
    try:
        if request.method == 'POST':
            # Intentamos realizar la edición de datos del superadministrador
            success = edit_superAdmin(id, name)
            # Verificamos si la edición fue exitosa
            if success:
                return jsonify({'success': success, 'message': 'Se actualizaron los datos exitosamente'})
            else:
                return jsonify({'success': success, 'message': 'Ocurrió un error al intentar actualizar los datos'})

    except Exception:
        return jsonify({'success': False, 'message': 'Ocurrió un error inesperado'})
    
# ------------------------------ EDITAR IMAGEN ------------------------------
# ------------------------------ ADMINISTRADOR ------------------------------

editar_imagen_administrador = Blueprint('editar_imagen_administrador', __name__, url_prefix='/administrador')

"""
    Función para editar la imagen de perfil de un administrador.

    Args:
        id (int): El ID del administrador.
        name (str): El nombre del administrador.

    Returns:
        jsonify: Respuesta JSON indicando el éxito o fracaso de la operación.
"""
@editar_imagen_administrador.route('/perfil<int:id>/<name>/editarImagen', methods=('GET', 'POST'))
def editar_imagen(id, name):
    try:
        if request.method == 'POST':
            # Intentamos realizar la edición de la imagen de perfil del administrador
            success = edit_image_administrador(id, name)
            # Verificamos si la edición fue exitosa
            if success:
                return jsonify({'success': success, 'message': 'Se actualizó la imagen de perfil exitosamente'})
            else:
                return jsonify({'success': success, 'message': 'Ocurrió un error al intentar actualizar la imagen de perfil'})

    except Exception:
        return jsonify({'success': False, 'message': 'Ocurrió un error inesperado'})
    
# ------------------------------ EDITAR IMAGEN ------------------------------
# ------------------------------ PARTICIPANTE -------------------------------
    
editar_imagen_participante = Blueprint('editar_imagen_participante', __name__, url_prefix='/participante')

"""
    Función para editar la imagen de perfil de un participante.

    Args:
        id (int): El ID del participante.
        name (str): El nombre del participante.

    Returns:
        jsonify: Respuesta JSON indicando el éxito o fracaso de la operación.
"""
@editar_imagen_participante.route('/perfil<int:id>/<name>/editarImagen', methods=('GET', 'POST'))
def editar_imagen(id, name):
    try:
        if request.method == 'POST':
            # Intentamos realizar la edición de la imagen de perfil del participante
            success = edit_image_participante(id, name)
            # Verificamos si la edición fue exitosa 
            if success:
                return jsonify({'success': success, 'message': 'Se actualizó la imagen de perfil exitosamente'})
            else:
                return jsonify({'success': success, 'message': 'Ocurrió un error al intentar actualizar la imagen de perfil'})

    except Exception:
        return jsonify({'success': False, 'message': 'Ocurrió un error inesperado'})
    
# ------------------------------ EDITAR IMAGEN ------------------------------
# ---------------------------- SUPERADMINISTRADOR ---------------------------

editar_imagen_superAdmin = Blueprint('editar_imagen_superAdmin', __name__, url_prefix='/superadministrador')

"""
    Función para editar la imagen de perfil de un superadministrador.

    Args:
        id (int): El ID del superadministrador.
        name (str): El nombre del superadministrador.

    Returns:
        jsonify: Respuesta JSON indicando el éxito o fracaso de la operación.
"""
@editar_imagen_superAdmin.route('/perfil<int:id>/<name>/editarImagen', methods=('GET', 'POST'))
def editar_imagen(id, name):
    try:
        if request.method == 'POST':
            # Intentamos realizar la edición de la imagen de perfil del superadministrador
            success = edit_image_superAdmin(id, name)
            # Verificamos si la edición fue exitosa
            if success:
                return jsonify({'success': success, 'message': 'Se actualizó la imagen de perfil exitosamente'})
            else:
                return jsonify({'success': success, 'message': 'Ocurrió un error al intentar actualizar la imagen de perfil'})

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
            # Intentamos eliminar el participante por su ID
            success = delete_participante(id)
            # Verificamos si la eliminación fue exitosa
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

# ------------------------------ ACEPTAR SOLICITUDES DE AMISTAD ------------------------------

enviar_solicitud = Blueprint('enviar_solicitud', __name__, url_prefix='/participante')

"""
    Función para enviar una solitud de amistad a un participante.

    Args:
        solicitante (id): El ID del participante que solicito la amistad.
        receptor (id): El ID del participante que recibio la solicitud de amistad.

    Returns:
        jsonify: Respuesta JSON con la lista de solicitudes o un mensaje de error.
"""
@enviar_solicitud.route('/enviar_solicitud/<int:solicitante>/<int:receptor>', methods=['POST'])
def enviar_solicitud_participante(solicitante, receptor):
    try:
        # Obtenemos a los participantes por su ID (solicitante y receptor)
        participante_solicitante = get_participante_by_id(solicitante)
        participante_receptor = get_participante_by_id(receptor)

        # Verificamos si existen los participantes 
        if participante_solicitante and participante_receptor:
            # Realizamos la solicitud de amistad
            success = send_request(solicitante, receptor)

            if success:
                return jsonify({'success': success, 
                                'message': 'Solicitud enviada exitosamente', 
                                'solicitud': True})
        else:
            return jsonify({'success': False, 'message': 'Usuario no existente'})
    except KeyError:
        return jsonify({'success': False, 'message': 'No se pudo enviar la solicitud'})

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
    # Intentamos aceptar la solicitud de amistad
    solicitud_aceptada = accept_request(solicitante, receptor)
    # Verificamos si la solicitud fue aceptada
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
    # Intentamos rechazar la solicitud de amistad
    solicitud_rechazada = reject_request(solicitante, receptor, 0)
    # Verificamos si la solicitud fue rechazada
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
    # Intentamos eliminar la listad de los participantes
    amistad_eliminada = delete_friend(solicitante, receptor)
    # Verificamos si la eliminación fue exitosa
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
        # Obtenemos el participante actual por su ID
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
            solicitudEnviada = False
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
            # Obtenemos el ID del participante buscado y buscamos las solicitudes de amistad relacionadas
            id_participante_busqueda = usuario_participante.IDParticipante
            solicitudes = get_request_friends(id_participante_busqueda)
            # Verificamos si hay una solicitud de amistad enviada entre ambos participantes
            for solicitud in solicitudes:
                if solicitud.Solicitante == id_participante and solicitud.Receptor == usuario_participante.IDParticipante:
                    solicitudEnviada = True
                    break
                elif solicitud.Receptor == id_participante and solicitud.Solicitante == usuario_participante.IDParticipante:
                    solicitudEnviada = True
                    break
            mismoUsuario = id_participante == id_participante_busqueda       
            # Devolvemos la información del usuario encontrado
            return jsonify({'success': True, 
                            'message': 'Usuario encontrado', 
                            'ID': usuario_participante.IDParticipante,
                            'NombreCompleto': usuario_participante.NombreCompleto, 
                            'NombreUsuario': usuario_participante.NombreParticipante, 
                            'Correo':usuario_participante.Correo,
                            'ImagenPerfil': usuario_participante.ImagenPerfil, 
                            'Rol': usuario_participante.Rol,
                            'Amigo' : esAmigo,
                            'solicitud': solicitudEnviada,
                            'MismoUsuario': mismoUsuario})
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
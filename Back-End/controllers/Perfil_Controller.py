from flask import Blueprint, request, jsonify, session, request, redirect, url_for

from alchemyClasses import db

from model.model_amistar import get_friendships
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
                    'ImagenPerfil': amigo.ImagenPerfil,
                    'NombreParticipante': amigo.NombreParticipante,
                })

        return jsonify({'success': True, 'amigos': lista_amigos})

    return jsonify({'success': False, 'message': 'Participante no encontrado'})

buscar_usuario = Blueprint('buscar_usuario',  __name__, url_prefix='/participante')

"""
    Función para buscar un usuario siendo un participante.

    Args:
        name (str): El nombre del participante.

    Returns:
        jsonify: Respuesta JSON con los datos del usuario buscado o un mensaje de error.
"""
@buscar_usuario.route('/perfil<int:id>/<name>/buscarUsuario', methods = ['POST'])
def buscar(id,name):
    try:
        #Obtenemos al usuario por su nombre de usuario
        Usuario = request.form.get('NombreUsuario')
        
        #Buscamos al usuario en la base de datos
        usuario_participante = get_participante_by_name(Usuario)
        
        #Si el usuario existe obtenemos su informacion
        if usuario_participante:
            session.clear()
            session['NombreCompleto'] = usuario_participante.NombreCompleto
            session['NombreUsuario'] = usuario_participante.NombreParticipante
            session['ImagenPerfil'] = usuario_participante.ImagenPerfil
            session['Rol'] = usuario_participante.Rol
            session.modified = True
            return jsonify({'success': True, 
                                'message': 'Usuario encontrado', 
                                'NombreCompleto': usuario_participante.NombreCompleto, 
                                'NombreUsuario': usuario_participante.NombreParticipante, 
                                'ImagenPerfil': usuario_participante.ImagenPerfil, 
                                'Rol': usuario_participante.Rol})
        elif Usuario == "":
            return jsonify({'success': False, 'message': 'Escribe un nombre de usuario por favor'})
        else:
            return jsonify({'success': False, 'message': 'No se pudo realizar la búsqueda'})
    except KeyError:
        return jsonify({'success': False, 'message': 'No se envió correctamente el nombre de usuario'})


# ------------------------------ Buscar Participante ------------------------------


buscar_participante = Blueprint('buscar_participante',  __name__, url_prefix='/participante')

"""
    Función para buscar un participante siendo super administrador

    Args:
        name (str): El nombre del participante.

    Returns:
        jsonify: Respuesta JSON con los datos del usuario buscado o un mensaje de error.
"""
@buscar_participante.route('/perfil<int:id>/<name>/buscarParticipante', methods = ['POST'])
def buscar(id,name):
    try:
        #Obtenemos al usuario por su nombre de usuario
        Usuario = request.form.get('NombreUsuario')
        
        #Buscamos al usuario en la base de datos
        usuario_participante = get_participante_by_name(Usuario)
        
        #Si el usuario existe obtenemos su informacion
        if usuario_participante:
            session.clear()
            session['NombreCompleto'] = usuario_participante.NombreCompleto
            session['NombreUsuario'] = usuario_participante.NombreParticipante
            session['ImagenPerfil'] = usuario_participante.ImagenPerfil
            session['Rol'] = usuario_participante.Rol
            session.modified = True
            return jsonify({'success': True, 
                                'message': 'Usuario encontrado', 
                                'NombreCompleto': usuario_participante.NombreCompleto, 
                                'NombreUsuario': usuario_participante.NombreParticipante, 
                                'ImagenPerfil': usuario_participante.ImagenPerfil, 
                                'Rol': usuario_participante.Rol})
        elif Usuario == "":
            return jsonify({'success': False, 'message': 'Escribe un nombre de usuario por favor'})
        else:
            return jsonify({'success': False, 'message': 'No se pudo realizar la búsqueda'})
    except KeyError:
        return jsonify({'success': False, 'message': 'No se envió correctamente el nombre de usuario'})


#---------------------------------Registrar Administrador-----------------------------------------------

from flask import request, redirect, url_for

@app.route('/perfil<int:participante_id>/volverAdministrador', methods=['POST'])
def volver_administrador(participante_id):
    try:
        participante = request.form.get('NombreUsuario')
        usuario_participante = get_participante_by_name(participante)
        participante.rol = 'Administrador'
        db.session.commit()
        return jsonify({'success': True, 'message': 'El participante ahora es Administrador'})
    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({'success': False, 'message': 'Error al actualizar el rol del participante'})

if __name__ == "__main__":
    app.run(debug=True)


from flask import Blueprint, request, jsonify
from hashlib import sha256
from CryptoUtils.CryptoUtils import cipher

from alchemyClasses import db
from alchemyClasses.Amistar import Amistar
from alchemyClasses.Participante import Participante

from model.model_participante import get_participante_by_id
from model.model_amistar import get_friendships

# ------------------------------ EDITAR PERFIL ------------------------------

editar_perfil = Blueprint('editar_perfil', __name__, url_prefix='/participante')

@editar_perfil.route('/editarPerfil<int:id>/<name>', methods=('GET', 'POST'))
def editar_datos(id, name):
    if request.method == 'POST':
        participante = get_participante_by_id(id)
        
        if participante:
            try:
                campos = request.get_json()

                nombreNuevo = campos.get('NombreCompleto', '')
                usernameNuevo = campos.get('NombreParticipante', '')
                correoNuevo = campos.get('Correo', '')
                contraseniaNueva = campos.get('Contrasenia', '')

                if nombreNuevo:
                    participante.NombreCompleto = nombreNuevo
                if usernameNuevo:
                    participante.NombreParticipante = usernameNuevo
                if correoNuevo:
                    participante.Correo = correoNuevo
                if contraseniaNueva:
                    participante.Contrasenia = sha256(cipher(contraseniaNueva)).hexdigest()

                db.session.commit()

                return jsonify({'success': True, 'message': 'Datos actualizados exitosamente'})
            except Exception:
                return jsonify({'success': False, 'message': 'Error durante la actualización'})
        else:
            return jsonify({'success': False, 'message': 'Perfil no encontrado'})
        
    return jsonify({'success': False, 'message': 'Método no permitido'})

# ------------------------------ ELIMINAR PERFIL ------------------------------

eliminar_perfil = Blueprint('eliminar_perfil', __name__, url_prefix='/participante')

@eliminar_perfil.route('/eliminarPerfil/<int:id>', methods=['POST'])
def eliminar_usuario(id):
    
    if request.method == 'POST':
        participante = get_participante_by_id(id)
        
        if participante:
            registros_amistar = get_friendships(id)
            
            for registro in registros_amistar:
                db.session.delete(registro)
            
            db.session.delete(participante)
            
            try:
                db.session.commit()
                return jsonify({'success': True, 'message': 'Perfil eliminado con éxito'})
            except Exception as e:
                db.session.rollback()
                return jsonify({'success': False, 'message': str(e)})
        
        else:
            return jsonify({'success': False, 'message': 'Perfil no encontrado'})

    return jsonify({'success': False, 'message': 'Método no permitido'})

# ------------------------------ VER AMIGOS ------------------------------

ver_amigos = Blueprint('ver_amigos', __name__, url_prefix='/participante')

@ver_amigos.route('/perfil<int:id>/<name>/verAmigos', methods=['GET'])
def ver_amigos_participante(id, name):
    participante = get_participante_by_id(id)

    if participante:
        # Obtener el ID del participante
        id_participante = participante.IDParticipante

        # Buscar amigos del participante con estatus 1:
        # El estatus 1 denota solicitudes aceptadas
        # El estatus 0 denota solicitudes sin aceptar pendientes
        amigos = Amistar.query.filter((Amistar.Solicitante == id_participante) | 
                                      (Amistar.Receptor == id_participante), Amistar.Estatus == 1).all()

        lista_amigos = []
        for amigo in amigos:
            if amigo.Solicitante == id_participante:
                id_amigo = amigo.Receptor
            else:
                id_amigo = amigo.Solicitante

            amigo = Participante.query.get(id_amigo)

            if amigo:
                lista_amigos.append({
                    'ImagenPerfil': amigo.ImagenPerfil,
                    'NombreParticipante': amigo.NombreParticipante,
                })

        return jsonify({'success': True, 'amigos': lista_amigos})

    return jsonify({'success': False, 'message': 'Participante no encontrado'})
from flask import Blueprint, jsonify

from alchemyClasses.Amistar import Amistar
from alchemyClasses.Participante import Participante

from model.model_participante import get_participante_by_id

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

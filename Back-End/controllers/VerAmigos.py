from flask import Blueprint, request, jsonify
from alchemyClasses import db
from alchemyClasses.Amistar import Amistar
from alchemyClasses.Participante import Participante
from model.model_participante import get_participante_by_name
from flask_cors import CORS

ver_amigos = Blueprint('ver_amigos', __name__, url_prefix='/participante')

@ver_amigos.route('/verAmigos/<name>', methods=['GET'])
def ver_amigos_participante(name):
    """
    Obtiene la lista de amigos de un participante dado su nombre.

    Args:
        name (str): El nombre del participante.

    Returns:
        JSON: Un objeto JSON que contiene la lista de amigos del participante.
    """
    participante = get_participante_by_name(name)

    if participante:
        id_participante = participante.IDParticipante

        # Buscar amigos del participante con estatus 1, el estatus 1 denota solicitudes aceptadas, 
        # 0 las solicitudes sin aceptar pendientes
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


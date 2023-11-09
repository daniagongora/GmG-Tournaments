from flask import Blueprint, request, jsonify
from alchemyClasses.Participante import Participante
from alchemyClasses import db
from model.model_participante import get_participante_by_name
from flask_cors import CORS

eliminar_perfil = Blueprint('eliminar_perfil', __name__, url_prefix='/participante')

@eliminar_perfil.route('/eliminarPerfil/<name>', methods=['POST'])
def eliminar_usuario(name):
    """
    Elimina el perfil de un participante dado el nombre especificado.

    Args:
        name (str): El nombre del participante cuyo perfil se eliminará.

    Returns:
        JSON: Un objeto JSON que indica el resultado de la operación.
    """
    if request.method == 'POST':
        participante = get_participante_by_name(name)
        if participante:
            db.session.delete(participante)
            db.session.commit()
            return jsonify({'success': True, 'message': 'Perfil eliminado con éxito'})
        else:
            return jsonify({'success': False, 'message': 'Perfil no encontrado'})

    return jsonify({'success': False, 'message': 'Método no permitido'})

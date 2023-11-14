from flask import Blueprint, request, jsonify
from alchemyClasses import db

from model.model_participante import get_participante_by_name

eliminar_perfil = Blueprint('eliminar_perfil', __name__, url_prefix='/participante')

@eliminar_perfil.route('/eliminarPerfil/<name>', methods=['POST'])
def eliminar_usuario(name):
    if request.method == 'POST':
        participante = get_participante_by_name(name)
        if participante:
            db.session.delete(participante)
            db.session.commit()
            return jsonify({'success': True, 'message': 'Perfil eliminado con éxito'})
        else:
            return jsonify({'success': False, 'message': 'Perfil no encontrado'})

    return jsonify({'success': False, 'message': 'Método no permitido'})
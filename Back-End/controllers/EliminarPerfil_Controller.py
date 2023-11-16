from flask import Blueprint, request, jsonify
from alchemyClasses import db

from model.model_participante import get_participante_by_id
from model.model_amistar import get_friendships

eliminar_perfil = Blueprint('eliminar_perfil', __name__, url_prefix='/participante')

@eliminar_perfil.route('/eliminarPerfil/<int:id>', methods=['POST'])
def eliminar_usuario(id):
    
    if request.method == 'POST':
        participante = get_participante_by_id(id)
        if participante:
            # Obtener registros en Amistar que hacen referencia al participante
            registros_amistar = get_friendships(id)
            
            # Eliminar registros en Amistar que están referenciando al participante
            for registro in registros_amistar:
                db.session.delete(registro)
            
            # Eliminar el participante después de eliminar los registros en Amistar
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

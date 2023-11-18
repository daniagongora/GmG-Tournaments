from flask import Blueprint, request, jsonify
from alchemyClasses import db

from hashlib import sha256
from CryptoUtils.CryptoUtils import cipher
from model.model_participante import get_participante_by_id

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
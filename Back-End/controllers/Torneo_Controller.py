from flask import Blueprint, request, jsonify
from model.model_torneo import add_new_torneo

torneo = Blueprint("Torneo", __name__, url_prefix='/torneo')

@torneo.route("/crear", methods=['POST'])
def agregarTorneo():
    try:
        idAdministrador = request.form.get("IDAdministrador")
        nombreTorneo = request.form.get("NombreTorneo")
        fechaInicio = request.form.get("FechaInicio")
        cupoMaximo = request.form.get("CupoMaximo")
        videojuego = request.form.get("Videojuego")
        plataforma = request.form.get("Plataforma")
        descripcion = request.form.get("Descripcion")
        fechaCreacion = request.form.get("FechaCreacion")
        
        success = add_new_torneo(idAdministrador, nombreTorneo, fechaInicio, cupoMaximo, videojuego, plataforma, descripcion, fechaCreacion)
        
        if success:
            return jsonify({'success': success, 'message': 'Se inserto el nuevo Torneo exitosamente'})
        else:
            return jsonify({'success': success, 'message': 'Ocurrio un error al intentar insertar el nuevo torneo'})
        
    except Exception:
        return jsonify({'success': False, 'message': 'Ocurrio un error inesperado'})
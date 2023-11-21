from flask import Blueprint, request, jsonify

from model.model_torneo import add_new_torneo, get_torneos_by_administrador, delete_torneo

# ------------------------------ CREAR TORNEO ------------------------------

crear_torneo = Blueprint('crear_torneo', __name__, url_prefix='/torneo')

@crear_torneo.route("/crearTorneo", methods=['POST'])
def agregar_torneo():
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
            return jsonify({'success': success, 'message': 'Se insertó el nuevo torneo exitosamente'})
        else:
            return jsonify({'success': success, 'message': 'Ocurrió un error al intentar insertar el nuevo torneo'})
        
    except Exception:
        return jsonify({'success': False, 'message': 'Ocurrió un error inesperado'})
    
# ------------------------------ ELIMIINAR TORNEO ------------------------------

eliminar_torneo = Blueprint('eliminar_torneo', __name__, url_prefix='/torneo')

@eliminar_torneo.route("/<idAdmin>/eliminarTorneo", methods=['POST','GET'])
def eliminarTorneo(idAdmin):
    try:
        if request.method == 'GET':
            listaTorneos = []
            currentTorneos = get_torneos_by_administrador(idAdmin)
            if currentTorneos:
                for trnmt in currentTorneos:
                    listaTorneos.append({
                        'IDTorneo': trnmt.IDTorneo,
                        'NombreTorneo' : trnmt.NombreTorneo,
                        'Videojuego' : trnmt.Videojuego,
                        'FechaCreacion' : trnmt.FechaCreacion.strftime("%x"),
                        'FechaInicio' : trnmt.FechaInicio.strftime("%x"),
                        'Estatus' : trnmt.Estatus
                    })
                return jsonify({'success':True, 'message':'Se consultaron los torneos exitosamente', 'torneos': listaTorneos})
            return jsonify({'success':True, 'message':'No se encontraron torneos creados por este administrador', 'torneos': listaTorneos})
        else:
            idTorneo = request.form.get("IDTorneo") 
            success = delete_torneo(idTorneo)
            return jsonify({'success': success, 'message': 'Se completó la operación en la base de datos'})
    except Exception:
        return jsonify({'success': False, 'message': 'Ocurrió un error inesperado'})
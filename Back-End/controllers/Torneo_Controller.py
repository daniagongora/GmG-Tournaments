from flask import Blueprint, request, jsonify

from model.model_torneo import add_new_torneo, get_torneos_by_administrador, delete_torneo

# ------------------------------ CREAR TORNEO ------------------------------

crear_torneo = Blueprint('crear_torneo', __name__, url_prefix='/torneo')

"""
    Función para agregar un nuevo torneo.

    Args:
        IDAdministrador (str): El ID del administrador que crea el torneo.
        NombreTorneo (str): El nombre del torneo.
        FechaInicio (str): La fecha de inicio del torneo.
        CupoMaximo (str): El cupo máximo de participantes del torneo.
        Videojuego (str): El videojuego del torneo.
        Plataforma (str): La plataforma del torneo.
        Descripcion (str): La descripción del torneo.
        FechaCreacion (str): La fecha de creación del torneo.

    Returns:
        jsonify: Respuesta JSON indicando el éxito o fracaso de la operación.
"""
@crear_torneo.route("/crearTorneo", methods=['POST'])
def agregar_torneo():
    try:
        # Obtenemos los datos del formulario
        idAdministrador = request.form.get("IDAdministrador")
        nombreTorneo = request.form.get("NombreTorneo")
        fechaInicio = request.form.get("FechaInicio")
        cupoMaximo = request.form.get("CupoMaximo")
        videojuego = request.form.get("Videojuego")
        plataforma = request.form.get("Plataforma")
        descripcion = request.form.get("Descripcion")
        fechaCreacion = request.form.get("FechaCreacion")
        
        # Agregamos un nuevo torneo a la base de datos
        success = add_new_torneo(idAdministrador, nombreTorneo, fechaInicio, cupoMaximo, videojuego, plataforma, descripcion, fechaCreacion)
        
        # Devolvemos una respuesta JSON indicando el éxito o fracaso de la operación
        if success:
            return jsonify({'success': success, 'message': 'Se insertó el nuevo torneo exitosamente'})
        else:
            return jsonify({'success': success, 'message': 'Ocurrió un error al intentar insertar el nuevo torneo'})
        
    except Exception:
        return jsonify({'success': False, 'message': 'Ocurrió un error inesperado'})
    
# ------------------------------ ELIMIINAR TORNEO ------------------------------

eliminar_torneo = Blueprint('eliminar_torneo', __name__, url_prefix='/torneo')

"""
    Función para eliminar un torneo.

    Args:
        idAdmin (str): El ID del administrador que desea eliminar el torneo.

    Returns:
        jsonify: Respuesta JSON indicando el éxito o fracaso de la operación.
"""
@eliminar_torneo.route("/<idAdmin>/eliminarTorneo", methods=['POST','GET'])
def eliminarTorneo(idAdmin):
    try:
        if request.method == 'GET':
            listaTorneos = []

            # Obtenemos los torneos creados por el administrador
            currentTorneos = get_torneos_by_administrador(idAdmin)
            if currentTorneos:
                for trnmt in currentTorneos:
                    # Guardamos la información del torneo
                    listaTorneos.append({
                        'IDTorneo': trnmt.IDTorneo,
                        'NombreTorneo' : trnmt.NombreTorneo,
                        'Videojuego' : trnmt.Videojuego,
                        'FechaCreacion' : trnmt.FechaCreacion.strftime("%x"),
                        'FechaInicio' : trnmt.FechaInicio.strftime("%x"),
                        'Estatus' : trnmt.Estatus
                    })
                return jsonify({'success': True, 'message': 'Se consultaron los torneos exitosamente', 'torneos': listaTorneos})
            return jsonify({'success': True, 'message': 'No se encontraron torneos creados por este administrador', 'torneos': listaTorneos})
        else:
            # Obtenemos el ID del torneo a eliminar
            idTorneo = request.form.get("IDTorneo") 
            # Eliminamos el torneo de la base de datos
            success = delete_torneo(idTorneo)
            # Devolvemos una respuesta JSON indicando el éxito o fracaso de la operación
            return jsonify({'success': success, 'message': 'Se completó la operación en la base de datos'})
    except Exception:
        return jsonify({'success': False, 'message': 'Ocurrió un error inesperado'})
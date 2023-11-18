from alchemyClasses.Torneo import Torneo
from alchemyClasses import db

def get_torneos():
    return Torneo.query.all()

def get_torneos_administrador(idAdministrador):
    torneos = Torneo.query.filter(Torneo.IDAdministrador == idAdministrador)
    return torneos

def add_new_torneo(idAdministrador, nombreTorneo, fechaInicio, cupoMaximo, videojuego, plataforma, descripcion, fechaCreacion):
    newTorneo = Torneo(idAdministrador, nombreTorneo, fechaInicio, cupoMaximo, videojuego, plataforma, descripcion, fechaCreacion)
    if nombreTorneo == '' or videojuego == '' or plataforma == '':
        return False
    
    try: 
        db.session.add(newTorneo)
        db.session.commit()
        
        print("Se agrego el nuevo torneo exitosamente")
        return True
    except Exception:
        return False

def delete_torneo(idTorneo):
    torneoAEliminar = Torneo.query.get(idTorneo)
    
    if torneoAEliminar:
        db.session.delete(torneoAEliminar)
        db.session.commit()
        return True
    else:
        return False
from alchemyClasses.Torneo import Torneo
from alchemyClasses import db

def get_all_torneos():
    return Torneo.query.all()

def get_torneo_by_id(id):
    return Torneo.query.filter(Torneo.IDTorneo == id).all()

def get_torneos_by_administrador(idAdministrador):
    return Torneo.query.filter(Torneo.IDAdministrador == idAdministrador)

def get_torneo_by_name(name):
    return Torneo.query.filter(Torneo.NombreTorneo == name).all()

def get_torneo_by_plataforma(platform):
    return Torneo.query.filter(Torneo.Plataforma == platform).all()

def get_torneo_by_Videojuego(videogame):
    return Torneo.query.filter(Torneo.Videojuego == videogame).all()

def add_new_torneo(idAdministrador, nombreTorneo, fechaInicio, cupoMaximo, videojuego, plataforma, descripcion, fechaCreacion):
    newTorneo = Torneo(idAdministrador, nombreTorneo, fechaInicio, cupoMaximo, videojuego, plataforma, descripcion, True, fechaCreacion)
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
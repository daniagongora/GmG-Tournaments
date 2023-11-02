from alchemyClasses.Participante import Participante

def get_all_participantes():
    return Participante.query.all()

def get_participante_by_id(id):
    return Participante.query.filter(Participante.IDParticipante == id).all()

def get_participante_by_name(name):
    return Participante.query.filter(Participante.NombreParticipante == name).all()

def get_participante_by_email(email):
    return Participante.query.filter(Participante.Correo == email).all()
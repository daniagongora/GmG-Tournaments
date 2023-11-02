from alchemyClasses.Administrador import Administrador

def get_all_administradores():
    return Administrador.query.all()

def get_administrador_by_id(id):
    return Administrador.query.filter(Administrador.IDAdministrador == id).all()

def get_administrador_by_name(name):
    return Administrador.query.filter(Administrador.NombreAdministrador == name).all()

def get_administrador_by_email(email):
    return Administrador.query.filter(Administrador.Correo == email).all()
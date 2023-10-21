from alchemyClasses.Administrador import Administrador

def get_all_Administradores():
    return Administrador.query.all()

def get_Administrador_by_id(id):
    return Administrador.query.filter(Administrador.IDAdministrador == id).all()

def get_Administrador_by_name(name):
    return Administrador.query.filter(Administrador.NombreAdministrador == name).all()

def get_Administrador_by_email(email):
    return Administrador.query.filter(Administrador.Correo == email).all()

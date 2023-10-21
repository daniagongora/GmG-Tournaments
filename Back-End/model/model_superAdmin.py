from alchemyClasses.SuperAdmin import SuperAdministrador

def get_all_SuperAdmins():
    return SuperAdministrador.query.all()

def get_SuperAdmin_by_id(id):
    return SuperAdministrador.query.filter(SuperAdministrador.IDSuperAdministrador == id).all()

def get_SuperAdmin_by_name(name):
    return SuperAdministrador.query.filter(SuperAdministrador.NombreSuperadministrador == name).all()

def get_SuperAdmin_by_email(email):
    return SuperAdministrador.query.filter(SuperAdministrador.Correo == email).all()

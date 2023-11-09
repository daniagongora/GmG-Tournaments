from flask import Blueprint
import json

from model.model_participante import get_all_participantes
from model.model_superAdmin import get_all_superAdmins
from model.model_administrador import get_all_administradores

json_controller = Blueprint('json', __name__, url_prefix='/json')

@json_controller.route('/participante')
def get_participantes():
    participantes = get_all_participantes()
    response = []
    for participante in participantes:
        response.append({
            'NombreCompleto':participante.NombreCompleto,
            'ImagenPerfil':participante.ImagenPerfil,
            'Contrasenia':participante.Contrasenia,
            'NombreParticipante':participante.NombreParticipante,
            'Correo':participante.Correo,
            'Rol':participante.Rol
        })
    return json.dumps(response)

@json_controller.route('/superAdmin')
def get_superAdmin():
    superAdmins = get_all_superAdmins()
    response = []
    for superAdmin in superAdmins:
        response.append({
            'NombreCompleto':superAdmin.NombreCompleto,
            'ImagenPerfil':superAdmin.ImagenPerfil,
            'Contrasenia':superAdmin.Contrasenia,
            'NombreSuperadministrador':superAdmin.NombreSuperadministrador,
            'Correo':superAdmin.Correo,
            'Rol':superAdmin.Rol
        })
    return json.dumps(response)

@json_controller.route('/admin')
def get_Admin():
    Admins = get_all_administradores()
    response = []
    for Admin in Admins:
        response.append({
            'NombreCompleto':Admin.NombreCompleto,
            'ImagenPerfil':Admin.ImagenPerfil,
            'Contrasenia':Admin.Contrasenia,
            'NombreAdministrador':Admin.NombreAdministrador,
            'Correo':Admin.Correo,
            'Rol':Admin.Rol
        })
    return json.dumps(response)
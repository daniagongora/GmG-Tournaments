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
            'NombreParticipante':participante.NombreParticipante,
            'Correo':participante.Correo,
            'ImagenPerfil':participante.ImagenPerfil
        })
    return json.dumps(response)

@json_controller.route('/superAdmin')
def get_superAdmin():
    superAdmins = get_all_superAdmins()
    response = []
    for superAdmin in superAdmins:
        response.append({
            'NombreSuperadministrador':superAdmin.NombreSuperadministrador,
            'Correo':superAdmin.Correo,
            'ImagenPerfil':superAdmin.ImagenPerfil
        })
    return json.dumps(response)

@json_controller.route('/admin')
def get_Admin():
    Admins = get_all_administradores()
    response = []
    for Admin in Admins:
        response.append({
            'NombreAdministrador':Admin.NombreAdministrador,
            'Correo':Admin.Correo,
            'ImagenPerfil':Admin.ImagenPerfil
        })
    return json.dumps(response)
from flask import Blueprint, session, g, request
import json

from model.model_participante import get_all_participantes, get_participante_by_id
from model.model_superAdmin import get_all_SuperAdmins, get_SuperAdmin_by_id
from model.model_administrador import get_all_Administradores, get_Administrador_by_id

json_controller = Blueprint('json', __name__, url_prefix='/json')

@json_controller.route('/participantes')
def get_participantes():
    participantes = get_all_participantes()
    response = []
    for participante in participantes:
        response.append({
            'nombre':participante.NombreParticipante,
            'correo':participante.Correo
        })
    return json.dumps(response)

@json_controller.route('/superAdmin')
def get_superAdmin():
    superAdmins = get_all_SuperAdmins()
    response = []
    for superAdmin in superAdmins:
        response.append({
            'nombre':superAdmin.NombreSuperadministrador,
            'correo':superAdmin.Correo
        })
    return json.dumps(response)

@json_controller.route('/Admin')
def get_Admin():
    Admins = get_all_Administradores()
    response = []
    for Admin in Admins:
        response.append({
            'nombre':Admin.NombreAdministrador,
            'correo':Admin.Correo
        })
    return json.dumps(response)



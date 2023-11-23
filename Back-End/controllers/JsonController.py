from flask import Blueprint
import json

from model.model_administrador import get_all_administradores
from model.model_participante import get_all_participantes
from model.model_superAdmin import get_all_superAdmins

json_controller = Blueprint('json', __name__, url_prefix='/json')

"""
    Función para obtener todos los administradores en formato JSON.

    Returns:
        str: Una cadena JSON que contiene los datos de los administradores.
"""
@json_controller.route('/admin')
def get_Admin():
    admins = get_all_administradores()
    response = []
    for admin in admins:
        response.append({
            'NombreCompleto':admin.NombreCompleto,
            'ImagenPerfil':admin.ImagenPerfil,
            'Contrasenia':admin.Contrasenia,
            'NombreAdministrador':admin.NombreAdministrador,
            'Correo':admin.Correo,
            'Rol':admin.Rol
        })
    return json.dumps(response)

"""
    Función para obtener todos los participantes en formato JSON.

    Returns:
        str: Una cadena JSON que contiene los datos de los participantes.
"""
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

"""
    Función para obtener todos los superadministradores en formato JSON.

    Returns:
        str: Una cadena JSON que contiene los datos de los superadministradores.
"""
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
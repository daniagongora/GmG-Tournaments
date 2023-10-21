from alchemyClasses import db
from sqlalchemy import Column, Integer, String, ForeignKey
from hashlib import sha256
from CryptoUtils.CryptoUtils import cipher

from model.model_superAdmin import get_all_SuperAdmins, get_SuperAdmin_by_id

class Administrador(db.Model):

    __tablename__ = 'Administrador'
    IDAdministrador = Column(Integer, primary_key=True)
    IDSuperAdministrador = Column(Integer, ForeignKey('SuperAdministrador.IDSuperAdministrador'))
    NombreCompleto = Column(String(255))
    ImagenPerfil = Column(String(255))
    Contrasenia = Column(String(64))
    NombreAdministrador = Column(String(120))
    Correo = Column(String(255))

    def __init__(self, NombreCompleto, ImagenPerfil, Contrasenia, NombreAdministrador, Correo):
        self.NombreCompleto = NombreCompleto
        self.ImagenPerfil = ImagenPerfil
        self.Contrasenia = sha256(cipher(Contrasenia)).hexdigest()
        self.NombreAdministrador = NombreAdministrador
        self.Correo = Correo

    def __str__(self):
        return f'IDAdministrador: {self.IDAdministrador}\nnombre: {self.NombreAdministrador}\ncorreo: {self.Correo}'


from alchemyClasses import db
from sqlalchemy import Column, Integer, String
from hashlib import sha256
from CryptoUtils.CryptoUtils import cipher

class SuperAdministrador(db.Model):

    __tablename__ = 'SuperAdministrador'
    IDSuperAdministrador = Column(Integer, primary_key=True)
    NombreCompleto = Column(String(255))
    ImagenPerfil = Column(String(255))
    Contrasenia = Column(String(64))
    NombreSuperadministrador = Column(String(120))
    Correo = Column(String(255))

    def __init__(self, NombreCompleto, ImagenPerfil, Contrasenia, NombreSuperadministrador, Correo):
        self.NombreCompleto = NombreCompleto
        self.ImagenPerfil = ImagenPerfil
        self.Contrasenia = sha256(cipher(Contrasenia)).hexdigest()
        self.NombreSuperadministrador = NombreSuperadministrador
        self.Correo = Correo

    def __str__(self):
        return f'IDSuperAdmin: {self.IDSuperAdministrador}\nnombre: {self.NombreSuperadministrador}\ncorreo: {self.Correo}'


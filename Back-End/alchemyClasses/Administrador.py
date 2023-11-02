from alchemyClasses import db
from sqlalchemy import Column, Integer, String, ForeignKey
from hashlib import sha256
from CryptoUtils.CryptoUtils import cipher

class Administrador(db.Model):

    __tablename__ = 'Administrador'
    IDAdministrador = Column(Integer, primary_key=True)
    IDSuperAdministrador = Column(Integer, ForeignKey('SuperAdministrador.IDSuperAdministrador'))
    NombreCompleto = Column(String(255))
    ImagenPerfil = Column(String(1000))
    Contrasenia = Column(String(64))
    NombreAdministrador = Column(String(120))
    Correo = Column(String(255))
    Rol = Column(String(20))

    def __init__(self, NombreCompleto, ImagenPerfil, Contrasenia, NombreAdministrador, Correo, Rol):
        self.NombreCompleto = NombreCompleto
        self.ImagenPerfil = ImagenPerfil
        self.Contrasenia = sha256(cipher(Contrasenia)).hexdigest()
        self.NombreAdministrador = NombreAdministrador
        self.Correo = Correo
        self.Rol = Rol

    def __str__(self):
        return f'IDAdministrador: {self.IDAdministrador}\nImagenPerfil: {self.ImagenPerfil}\nNombreAdministrador: {self.NombreAdministrador}\nCorreo: {self.Correo}\nRol: {self.Rol}\n'
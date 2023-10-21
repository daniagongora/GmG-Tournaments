from alchemyClasses import db
from sqlalchemy import Column, Integer, String
from hashlib import sha256
from CryptoUtils.CryptoUtils import cipher

class Participante(db.Model):

    __tablename__ = 'Participante'
    IDParticipante = Column(Integer, primary_key=True)
    NombreCompleto = Column(String(255))
    ImagenPerfil = Column(String(255))
    Contrasenia = Column(String(64))
    NombreParticipante = Column(String(120))
    Correo = Column(String(255))

    def __init__(self, NombreCompleto, ImagenPerfil, Contrasenia, NombreParticipante, Correo):
        self.NombreCompleto = NombreCompleto
        self.ImagenPerfil = ImagenPerfil
        self.Contrasenia = sha256(cipher(Contrasenia)).hexdigest()
        self.NombreParticipante = NombreParticipante
        self.Correo = Correo

    def __str__(self):
        return f'IDPartcipante: {self.IDParticipante}\nnombre: {self.NombreParticipante}\ncorreo: {self.Correo}'


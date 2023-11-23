from alchemyClasses import db
from CryptoUtils.CryptoUtils import cipher
from hashlib import sha256
from sqlalchemy import Column, Integer, String

"""
    Clase que representa a un participante en la base de datos.
"""
class Participante(db.Model):

    __tablename__ = 'Participante'
    IDParticipante = Column(Integer, primary_key=True)
    NombreCompleto = Column(String(255))
    ImagenPerfil = Column(String(1000))
    Contrasenia = Column(String(64))
    NombreParticipante = Column(String(120))
    Correo = Column(String(255))
    Rol = Column(String(20))

    """
        Constructor de la clase Participante.

        Args:
            - NombreCompleto (str): El nombre completo del participante.
            - ImagenPerfil (str): La URL de la imagen de perfil del participante.
            - Contrasenia (str): La contraseña del participante.
            - NombreParticipante (str): El nombre del participante.
            - Correo (str): El correo electrónico del participante.
            - Rol (str): El rol del participante.
    """
    def __init__(self, NombreCompleto, ImagenPerfil, Contrasenia, NombreParticipante, Correo, Rol):
        self.NombreCompleto = NombreCompleto
        self.ImagenPerfil = ImagenPerfil
        self.Contrasenia = sha256(cipher(Contrasenia)).hexdigest()
        self.NombreParticipante = NombreParticipante
        self.Correo = Correo
        self.Rol = Rol

    """
        Método para representar el objeto Participante como una cadena de texto.

        Returns:
            str: La representación del objeto Participante.
    """
    def __str__(self):
        return f'IDParticipante: {self.IDParticipante}\nNombreCompleto: {self.NombreCompleto}\nImagenPerfil: {self.ImagenPerfil}\nContrasenia: {self.Contrasenia}\nNombreParticipante: {self.NombreParticipante}\nCorreo: {self.Correo}\nRol: {self.Rol}\n'
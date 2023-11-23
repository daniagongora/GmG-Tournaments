from alchemyClasses import db
from CryptoUtils.CryptoUtils import cipher
from hashlib import sha256
from sqlalchemy import Column, Integer, String

"""
    Clase que representa a un superadministrador en la base de datos.
"""
class SuperAdministrador(db.Model):

    __tablename__ = 'SuperAdministrador'
    IDSuperAdministrador = Column(Integer, primary_key=True)
    NombreCompleto = Column(String(255))
    ImagenPerfil = Column(String(1000))
    Contrasenia = Column(String(64))
    NombreSuperadministrador = Column(String(120))
    Correo = Column(String(255))
    Rol = Column(String(20))

    """
        Constructor de la clase SuperAdministrador.

        Args:
            - NombreCompleto (str): El nombre completo del superadministrador.
            - ImagenPerfil (str): La URL de la imagen de perfil del superadministrador.
            - Contrasenia (str): La contraseña del superadministrador.
            - NombreSuperadministrador (str): El nombre del superadministrador.
            - Correo (str): El correo electrónico del superadministrador.
            - Rol (str): El rol del superadministrador.
    """
    def __init__(self, NombreCompleto, ImagenPerfil, Contrasenia, NombreSuperadministrador, Correo, Rol):
        self.NombreCompleto = NombreCompleto
        self.ImagenPerfil = ImagenPerfil
        self.Contrasenia = sha256(cipher(Contrasenia)).hexdigest()
        self.NombreSuperadministrador = NombreSuperadministrador
        self.Correo = Correo
        self.Rol = Rol

    """
        Método para representar el objeto SuperAdministrador como una cadena de texto.

        Returns:
            str: La representación del objeto SuperAdministrador.
    """
    def __str__(self):
        return f'IDSuperAdministrador: {self.IDSuperAdministrador}\nNombreCompleto: {self.NombreCompleto}\nImagenPerfil: {self.ImagenPerfil}\nContrasenia: {self.Contrasenia}\nNombreSuperadministrador: {self.NombreSuperadministrador}\nCorreo: {self.Correo}\nRol: {self.Rol}'
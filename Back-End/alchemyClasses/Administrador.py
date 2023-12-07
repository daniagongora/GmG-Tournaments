from alchemyClasses import db
from sqlalchemy import Column, Integer, String, ForeignKey

"""
    Clase que representa a un administrador en la base de datos.
"""
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

    """
        Constructor de la clase Administrador.

        Args:
            - NombreCompleto (str): El nombre completo del administrador.
            - ImagenPerfil (str): La URL de la imagen de perfil del administrador.
            - Contrasenia (str): La contraseña del administrador.
            - NombreAdministrador (str): El nombre del administrador.
            - Correo (str): El correo electrónico del administrador.
            - Rol (str): El rol del administrador.
    """
    def __init__(self, NombreCompleto, ImagenPerfil, Contrasenia, NombreAdministrador, Correo, Rol):
        self.NombreCompleto = NombreCompleto
        self.ImagenPerfil = ImagenPerfil
        self.Contrasenia = Contrasenia
        self.NombreAdministrador = NombreAdministrador
        self.Correo = Correo
        self.Rol = Rol

    """
        Método para representar el objeto Administrador como una cadena de texto.

        Returns:
            str: La representación del objeto Administrador.
    """
    def __str__(self):
        return f'IDAdministrador: {self.IDAdministrador}\nIDSuperAdministrador: {self.IDSuperAdministrador}\nNombreCompleto: {self.NombreCompleto}\nImagenPerfil: {self.ImagenPerfil}\nContrasenia: {self.Contrasenia}\nNombreAdministrador: {self.NombreAdministrador}\nCorreo: {self.Correo}\nRol: {self.Rol}\n'
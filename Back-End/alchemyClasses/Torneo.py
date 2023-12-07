from alchemyClasses import db
from sqlalchemy import Column, Integer, ForeignKey, String, Date, Text, Boolean

"""
    Clase que representa a un torneo en la base de datos.
"""
class Torneo(db.Model):

    __tablename__ = 'Torneo'
    IDTorneo = Column(Integer, primary_key=True, autoincrement=True)
    IDAdministrador = Column(Integer, ForeignKey('Administrador.IDAdministrador'))
    NombreTorneo = Column(String(120), nullable=False)
    FechaInicio = Column(Date)
    CupoMaximo =  Column(Integer, nullable=False)
    Videojuego = Column(String(255), nullable=False)
    Plataforma = Column(String(120), nullable=False)
    Descripcion = Column(Text)
    Estatus = Column(Boolean, nullable=False)
    FechaCreacion = Column(Date)
    
    """
        Constructor de la clase Torneo.

        Args:
            - IDAdministrador (int): El identificador del administrador asociado al torneo.
            - NombreTorneo (str): El nombre del torneo.
            - FechaInicio (str): La fecha de inicio del torneo.
            - CupoMaximo (int): El cupo máximo de participantes en el torneo.
            - Videojuego (str): El nombre del videojuego asociado al torneo.
            - Plataforma (str): La plataforma en la que se llevará a cabo el torneo.
            - Descripcion (str): Una descripción del torneo.
            - Estatus (int): El estado actual del torneo.
            - FechaCreacion (str): La fecha de creación del torneo.
    """
    def __init__(self, IDAdministrador, NombreTorneo, FechaInicio, CupoMaximo, Videojuego, Plataforma, Descripcion, Estatus, FechaCreacion):
        self.IDAdministrador = IDAdministrador
        self.NombreTorneo = NombreTorneo
        self.FechaInicio = FechaInicio
        self.CupoMaximo = CupoMaximo
        self.Videojuego = Videojuego
        self.Plataforma = Plataforma
        self.Descripcion = Descripcion
        self.Estatus = Estatus
        self.FechaCreacion = FechaCreacion
        
    """
        Método para representar el objeto Torneo como una cadena de texto.

        Returns:
            str: La representación del objeto Torneo.
    """
    def __str__(self):
        return f'IDTorneo: {self.IDTorneo}\nIDAdministrador: {self.IDAdministrador}\nNombreTorneo: {self.NombreTorneo}\nFechaInicio: {self.FechaInicio}\nCupoMaximo: {self.CupoMaximo}\nVideojuego: {self.Videojuego}\nPlataforma: {self.Plataforma}\nDescripcion: {self.Descripcion}\nEstatus: {self.Estatus}\nFechaCreacion: {self.FechaCreacion}'
from alchemyClasses import db
from sqlalchemy import Column, Integer, ForeignKey, String, Date, Text

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
    FechaCreacion = Column(Date)
    
    def __init__(self, IDAdministrador, NombreTorneo, FechaInicio, CupoMaximo, Videojuego, Plataforma, Descripcion, FechaCreacion):
        self.IDAdministrador = IDAdministrador
        self.NombreTorneo = NombreTorneo
        self.FechaInicio = FechaInicio
        self.CupoMaximo = CupoMaximo
        self.Videojuego = Videojuego
        self.Plataforma = Plataforma
        self.Descripcion = Descripcion
        self.FechaCreacion = FechaCreacion
        
    def __str__(self):
        return f'IDTorneo: {self.IDTorneo}\nIDAdministrador: {self.IDAdministrador}\nNombreTorneo: {self.NombreTorneo}\nFechaInicio: {self.FechaInicio}\nCupoMaximo: {self.CupoMaximo}\nVideojuego: {self.Videojuego}\nPlataforma: {self.Plataforma}\nDescripcion: {self.Descripcion}\nFechaCreacion: {self.FechaCreacion}'
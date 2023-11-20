from alchemyClasses import db
from sqlalchemy import Column, Integer, ForeignKey, String, Date, Text, Boolean

class Torneo(db.Model):
    __tablename__ = 'Torneo'
    
    IDTorneo = Column(Integer, primary_key=True, autoincrement=True)
    IDAdministrador = Column(Integer, ForeignKey('Administrador.IDAdministrador'))
    NombreTorneo = Column(String(120), nullable=False)
    FechaInicio = Column(Date)
    CupoMaximo =  Column(Integer, nullable=False)
    Videojuego = Column(String(100), nullable=False)
    Plataforma = Column(String(100), nullable=False)
    Descripcion = Column(Text)
    Estatus = Column(Boolean, nullable=False)
    FechaCreacion = Column(Date)
    
    def __init__(self, IDAdministrador, NombreTorneo, FechaInicio, CupoMaximo, Videojuego, Plataforma, Descripcion, Estatus, FechaCreacion):
        self.IDAdministrador = IDAdministrador
        self.NombreTorneo = NombreTorneo
        self.FechaInicio = FechaInicio
        self.CupoMaximo = CupoMaximo
        self.Videojuego = Videojuego
        self.Plataforma = Plataforma
        self.Estatus = Estatus
        self.Descripcion = Descripcion
        self.FechaCreacion = FechaCreacion
        
    def __str__(self):
        return f'IDTonero: {self.IDTorneo}\nIDAdministrador: {self.IDAdministrador}\nNombreTonero: {self.NombreTorneo}\nFechaInicio: {self.FechaInicio}\nCupoMaximo: {self.CupoMaximo}\nVideojuego: {self.Videojuego}\nPlataforma: {self.Plataforma}\nDescripcion: {self.Descripcion}\nEstatus: {self.Estatus}\nFecha Creación: {self.FechaCreacion}'
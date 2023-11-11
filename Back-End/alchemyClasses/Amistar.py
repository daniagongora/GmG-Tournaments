from alchemyClasses import db
from sqlalchemy import Column, Integer, ForeignKey, Boolean

class Amistar(db.Model):

    __tablename__ = 'Amistar'
    Solicitante = Column(Integer, ForeignKey('Participante.IDParticipante'), primary_key=True)
    Receptor = Column(Integer, ForeignKey('Participante.IDParticipante'), primary_key=True)
    Estatus = Column(Boolean, nullable=False)

    def __init__(self, Solicitante, Receptor, Estatus):
        self.Solicitante = Solicitante
        self.Receptor = Receptor
        self.Estatus = Estatus

    def __str__(self):
        return f'Solicitante: {self.Solicitante}\nReceptor: {self.Receptor}\nEstatus: {self.Estatus}\n'
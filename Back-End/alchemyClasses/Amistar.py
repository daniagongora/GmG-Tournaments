from alchemyClasses import db
from sqlalchemy import Column, Integer, ForeignKey, Boolean

"""
    Clase que representa la relación de amistad entre participantes en la base de datos.
"""
class Amistar(db.Model):

    __tablename__ = 'Amistar'
    Solicitante = Column(Integer, ForeignKey('Participante.IDParticipante'), primary_key=True)
    Receptor = Column(Integer, ForeignKey('Participante.IDParticipante'), primary_key=True)
    Estatus = Column(Boolean, nullable=False)

    """
        Constructor de la clase Amistar.

        Args:
            - Solicitante (int): El ID del participante que envía la solicitud de amistad.
            - Receptor (int): El ID del participante que recibe la solicitud de amistad.
            - Estatus (bool): El estado de la relación de amistad (True si es aceptada, False si está pendiente).
    """
    def __init__(self, Solicitante, Receptor, Estatus):
        self.Solicitante = Solicitante
        self.Receptor = Receptor
        self.Estatus = Estatus

    """
        Método para representar el objeto Amistar como una cadena de texto.

        Returns:
            str: La representación del objeto Amistar.
    """
    def __str__(self):
        return f'Solicitante: {self.Solicitante}\nReceptor: {self.Receptor}\nEstatus: {self.Estatus}\n'
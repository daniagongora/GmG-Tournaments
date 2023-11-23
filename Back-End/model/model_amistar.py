from alchemyClasses.Amistar import Amistar

"""
    Función que obtiene las amistades del usuario de la base de datos.

    Returns:
        list: Lista de todos los amigos.
"""
def get_friendships(id):
    amigos = Amistar.query.filter((Amistar.Solicitante == id) | 
                                  (Amistar.Receptor == id), Amistar.Estatus == 1).all()
    return amigos
from alchemyClasses.Amistar import Amistar

def get_friendships(id):
    amigos = Amistar.query.filter((Amistar.Solicitante == id) | 
                                  (Amistar.Receptor == id), Amistar.Estatus == 1).all()
    return amigos
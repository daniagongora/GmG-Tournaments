from alchemyClasses import db
from alchemyClasses.Participante import Participante

"""
    Función que registra un participante en la base de datos.

    Returns:
        bool: True si se registró exitosamente, False si no se encontró el participante.
"""
def registrar_participante(Nombre, Usuario, Correo, Contrasenia):
    # Creamos una instancia de Participante con los datos proporcionados
    participante = Participante(Nombre, '../statics/icons/icon.png', Contrasenia, Usuario, Correo, 'Participante')

    # Verificamos si se creó correctamente el participante
    if participante:
        # Agregamos el participante a la sesión de la base de datos
        db.session.add(participante)
        # Guardamos los cambios en la base de datos
        db.session.commit()
        return True
    else:
        return False
Vean el video por fi:
https://drive.google.com/file/d/1GJXWiWYtML7IIbl_FvTbkJAvqQ2sGDa4/view?usp=sharing

Tengo la version Python 3.10.12
Para ejecutar el back end:
1.- Crear la base de datos de mysql
2.- Conectar la base de datos en el app.py
3.- Pararse en el directorio Back.end y ejecutar el comando flask run o python3 -m flask run

Cuando yo copie y ejecute tal cual el repositorio del ayudante tuve
problema con CryptoUtils, lo que me sirvio fue instalar y desinstalar varias veces esta 
biblioteca. A mi me sirvio esta respuesta:
https://stackoverflow.com/questions/71679646/error-when-trying-to-import-the-crypto-package

ACTUALIZACION HIPERMEGA IMPORTANTE:
instalen todo lo siguiente:

pip install flask-cors
npm install react-router-dom@5

eso deberia bastar, pero si react trae problemas, hagan: 
npm install react-router-dom
y luego
npm install react-router-dom@5

ACTUALIZACION eliminar perfil:
para personalizar las alertas instalé sweet alert:
npm install sweetalert2


ACTUALIZACION ver amigos: 
hice una correción en la base de datos, solo en la tabla amistar, entonces tienen que eliminar la tabla "Amistar" de la 
base de datos y correr la nueva, la actualice en el archivo GmG-Tournaments_BD y si quieren probar la funcionalidad de ver
amigos hagan las inserciones de la población de la tabla Amistar, estas también ya se las doy en el .sql

Credenciales para probar el inicio de sesion:

Recuerden que para probar el login se prueba en la ruta 
http://localhost:3000/login
Participantes: 

1.- correo: dania1012@ciencias.unam.mx, contraseña: ola
2.- bolillo@gmail.com, contraseña: ola
3.- pao@gmail.com, contraseña: ola

Super Admins:
correo: Vichy@gmail.com, contraseña: ola

Admins:

correo: Mar123@yahoo.com, contraseña: 123
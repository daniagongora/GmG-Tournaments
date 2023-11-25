<h1  align="center">
GmG Tournaments
<br>
Primer Proyecto de Software
</h1>

<h2 align="center">Equipo: Papitas </h2>

<p align="center">
  <img src="PapitasLogo.png" />
</p>

  

## Desarrolladores

-  *Colaboración* - [Dania Paula Góngora Ramírez](https://github.com/daniagongora)
-  *Técnico* - [Mario Letepichía Romero](https://github.com/MarioLetepichia)
-  *Calidad* - [Jonathan Martínez Camarillo](https://github.com/Jonathan318042989)
-  *Líder* - [Zuriel Enrique Martínez Hernández](https://github.com/Zurieel)
-  *Colaboración* - [Angel Sandoval Mendoza](https://github.com/AngelSandovalMendoza)
-  *Calidad* - [María Fernanda Villafán Flores](https://github.com/FernandaVillafan)

## Tecnologías utilizadas
Tecnología | Versión
----- | ----
React |18.2.0
Flask | 3.0.0
Python | 3.10.12
MySQL | 8.0.34

## Instalación
### Copiar el repositorio de GitHub
- Auxiliate de `git clone`

### Librerías necesarias para correr el Back-End
- `pip install flask`  
- `pip install SQLAlchemy`
- `pip install pycryptodome`
- `pip install flask-cors`

### Librerías necesarias para correr el Front-End
Recuerda estar ubicado en el directorio __Front-End__ al momento de instalar estas librerías.
- `npm install sweetalert2`
- `npm install react-router-dom@5`
Solo si lo anterior no funciona se tendrá que instalar primero esta otra librería:
- `npm install react-router-dom`
- `npm install react-router-dom@5`

## Ejecución del Programa
Una vez instalado todas las librerías necesarias para correr el programa es necesario realizar los siguientes pasos para su correcta ejecución:
1. Entrar a _MySQL Workbench_ e iniciar sesión en alguna conexión.
2. Crear la base de datos:
	* Dirigirse al archivo `GmG-Tournaments_BD.sql`.
	* Copiar todo el código que se encuentre ahí (`ctrl + a`).
	* Pegarlo en la sección que procesa los _queries_.
	* Ejecutar todo el query, esto generará la base de datos junto con sus tablas y algunas inserciones de datos.
3. Dirigirse al archivo `app.py` dentro del directorio __Back-End__ para especificar los parámetros de conexión:
	* En la línea 16 del código se encuentra la conexión entre la base de datos y el código python.
	* Cambia los datos de `[USER]` y `[PASSWORD]` para que coincidan con la conexión de _MySQL Workbench_.
4. Será necesario tener dos terminales activas para correr el front-back:
	* Dentro de una terminal nos dirigiremos a `Back-End` y ejecutaremos `flask run`.
		* Si la instalación se cumplió en su totalidad entonces el _Back-End_ debería empezar a ejecutarse.
	* Dentro de otra terminal nos ubicaremos en el directorio `Front-End` y ejecutaremos el comando `npm start`.
		* Igualmente, si la instalación se realizó de manera correcta entonces el programa ya debería estar ejecutándose.

## Uso de la aplicación
Para poder acceder al sitio web solo necesitamos redirigirnos a la siguiente página [Inicio Sesión](http://localhost:3000/) con la que ya podemos empezar a interactuar.
- Aquí podemos encontrar algunos datos que ya están registrados en la base de datos con las que podremos iniciar sesión:

#### __Participantes__
Correo | Contraseña
--- | ---
dania1012@ciencias.unam.mx | ola
bolillo@gmail.com | ola

#### __Administradores__
Correo | Contraseña
--- | ---
Mar123@yahoo.com | 123

#### __Super Administradores__
Correo | Contraseña
--- | ---
Vichy@gmail.com | ola

-- CREACIÓN DE TABLAS
CREATE SCHEMA proyectois;

-- Seleccionamos el esquema para realizar el resto de operaciones
USE proyectois;

-- Tabla SuperAdministrador
CREATE TABLE SuperAdministrador (
    IDSuperAdministrador INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    NombreCompleto VARCHAR(255),
    ImagenPerfil VARCHAR(1000),
    Contrasenia VARCHAR(64),
    NombreSuperadministrador VARCHAR(120),
    Correo VARCHAR(255),
    Rol VARCHAR(20)
);

-- Tabla Administrador
CREATE TABLE Administrador (
    IDAdministrador INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    IDSuperAdministrador INT,
    NombreCompleto VARCHAR(255),
    ImagenPerfil VARCHAR(1000),
    Contrasenia VARCHAR(64),
    NombreAdministrador VARCHAR(120),
    Correo VARCHAR(255),
    Rol VARCHAR(20),
    FOREIGN KEY (IDSuperAdministrador) REFERENCES SuperAdministrador(IDSuperAdministrador)
);

-- Tabla Participante
CREATE TABLE Participante (
    IDParticipante INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    NombreCompleto VARCHAR(255),
    ImagenPerfil VARCHAR(1000),
    Contrasenia VARCHAR(64),
    NombreParticipante VARCHAR(120),
    Correo VARCHAR(255),
    Rol VARCHAR(20)
);

-- Tabla Torneo
CREATE TABLE Torneo (
    IDTorneo INT PRIMARY KEY AUTO_INCREMENT,
    IDAdministrador INT,
    NombreTorneo VARCHAR(120) NOT NULL,
    FechaInicio DATE,
    CupoMaximo INT NOT NULL,
    Videojuego VARCHAR(255) NOT NULL,
    Plataforma VARCHAR(120) NOT NULL,
    Descripcion TEXT,
    Estatus BOOLEAN NOT NULL,
    FechaCreacion DATE,
    FOREIGN KEY (IDAdministrador) REFERENCES Administrador(IDAdministrador)
    ON DELETE CASCADE
);

-- Tabla Amistar
CREATE TABLE Amistar (
    Solicitante INT, 
    Receptor INT,
    Estatus TINYINT(1) NOT NULL CHECK (Estatus IN (0, 1)),
    PRIMARY KEY (Solicitante, Receptor),
    FOREIGN KEY (Solicitante) REFERENCES Participante(IDParticipante),
    FOREIGN KEY (Receptor) REFERENCES Participante(IDParticipante)
);

-- Tabla Participar
CREATE TABLE Participar (
    IDParticipante INT,
    IDTorneo INT,
    Estatus TINYINT(1) NOT NULL CHECK (Estatus IN (0, 1)),
    PRIMARY KEY (IDParticipante, IDTorneo),
    FOREIGN KEY (IDParticipante) REFERENCES Participante(IDParticipante),
    FOREIGN KEY (IDTorneo) REFERENCES Torneo(IDTorneo)
);


ALTER TABLE Amistar
    ADD CONSTRAINT FK_Solicitante FOREIGN KEY (Solicitante)
    REFERENCES Participante(IDParticipante)
    ON DELETE CASCADE;

ALTER TABLE Amistar
    ADD CONSTRAINT FK_Receptor FOREIGN KEY (Receptor)
    REFERENCES Participante(IDParticipante)
    ON DELETE CASCADE;

-- POBLACIÓN DE DATOS
	
-- Población de la tabla SuperAdministrador
INSERT INTO SuperAdministrador (IDSuperAdministrador, NombreCompleto, ImagenPerfil, Contrasenia, NombreSuperadministrador, Correo, Rol)
VALUES (1, 'Victoria', '../statics/icons/icon.png', 'd7f8acca0a63b2e39b378f21ee8f79541ffadc25ed87eaecb56054414ef29e21', 'Vic45', 'Vichy@gmail.com', 'SuperAdministrador');

-- Población de la tabla Administrador
INSERT INTO Administrador (IDAdministrador, IDSuperAdministrador, NombreCompleto, ImagenPerfil, Contrasenia, NombreAdministrador, Correo, Rol)
VALUES (1, 1, 'Mariana gonzales', '../statics/icons/icon.png', '25d93efd1f9e923a62ab2bf4f0476ebe638e028210111d93c5106ddee0bb458c', 'Mart3', 'Mar123@yahoo.com', 'Administrador');

INSERT INTO Administrador (IDAdministrador, IDSuperAdministrador, NombreCompleto, ImagenPerfil, Contrasenia, NombreAdministrador, Correo, Rol)
VALUES (2, 1, 'Mario Letepichia', '../statics/icons/doge.jpg', 'f4b43cc5fb5dfef20bacc1d17695cf311cb825f7be6f09b0215f7b3704573ec1', 'Marius1141', 'marius@gmail.com', 'Administrador');

INSERT INTO Administrador (IDAdministrador, IDSuperAdministrador, NombreCompleto, ImagenPerfil, Contrasenia, NombreAdministrador, Correo, Rol)
VALUES (3, 1, 'Diego Partida', '../statics/icons/spidermiles.jpg', 'd7f8acca0a63b2e39b378f21ee8f79541ffadc25ed87eaecb56054414ef29e21', 'Nightmare80', 'diego@hotmail.com', 'Administrador');

-- Población de la tabla Participante
INSERT INTO Participante (IDParticipante, NombreCompleto, ImagenPerfil, Contrasenia, NombreParticipante, Correo, Rol)
VALUES (1, 'Dania Paula Gongora', '../statics/icons/kirby.jpg', 'd7f8acca0a63b2e39b378f21ee8f79541ffadc25ed87eaecb56054414ef29e21', 'DaniaGon', 'dania1012@ciencias.unam.mx', 'Participante');

INSERT INTO Participante (IDParticipante, NombreCompleto, ImagenPerfil, Contrasenia, NombreParticipante, Correo, Rol)
VALUES (2, 'Cristian Ramirez', '../statics/icons/ender.jpg', 'd7f8acca0a63b2e39b378f21ee8f79541ffadc25ed87eaecb56054414ef29e21', 'Niity', 'bolillo@gmail.com', 'Participante');

INSERT INTO Participante (IDParticipante, NombreCompleto, ImagenPerfil, Contrasenia, NombreParticipante, Correo, Rol)
VALUES (3, 'Paola Amaro', '../statics/icons/icon.png', 'd7f8acca0a63b2e39b378f21ee8f79541ffadc25ed87eaecb56054414ef29e21', 'Pao', 'pao@gmail.com', 'Participante');

-- Población de la tabla Amistar
INSERT INTO Amistar (Solicitante, Receptor, Estatus) 
VALUES (1, 2, 0); -- El valor 1 en Estatus indica que la amistad está aceptada

INSERT INTO Amistar (Solicitante, Receptor, Estatus) 
VALUES (1, 3, 1);

-- Población de la tabla Torneo
INSERT INTO Torneo (IDAdministrador, NombreTorneo, FechaInicio, CupoMaximo, Videojuego, Plataforma, Descripcion, Estatus, FechaCreacion)
VALUES (1, "Primer Torneo", "2023-11-30", 16, "Fall Guys", "Consolas", "Estas en un torneo de prueba", TRUE, "2023-11-17");

INSERT INTO Torneo (IDAdministrador, NombreTorneo, FechaInicio, CupoMaximo, Videojuego, Plataforma, Descripcion, Estatus, FechaCreacion)
VALUES (1, "Cartografía", "2023-12-1", 16, "HearthStone", "PC/Movil", "Adentrate a esta gran aventura", TRUE, "2023-11-19");

INSERT INTO Torneo (IDAdministrador, NombreTorneo, FechaInicio, CupoMaximo, Videojuego, Plataforma, Descripcion, Estatus, FechaCreacion)
VALUES (2, "lolcito", "2023-12-6", 32, "League of Legends", "PC", "", TRUE, "2023-11-21");

INSERT INTO Torneo (IDAdministrador, NombreTorneo, FechaInicio, CupoMaximo, Videojuego, Plataforma, Descripcion, Estatus, FechaCreacion)
VALUES (2, "Esta batalla sera legendaria", "2023-12-2", 64, "Mortal Kombat", "Consola (PS4)", "", TRUE, "2023-11-22");

INSERT INTO Torneo (IDAdministrador, NombreTorneo, FechaInicio, CupoMaximo, Videojuego, Plataforma, Descripcion, Estatus, FechaCreacion)
VALUES (2, "Torneo Fortnite", "2023-12-4", 16, "Fortnite", "Multiplataforma", "", TRUE, "2023-11-23");

INSERT INTO Torneo (IDAdministrador, NombreTorneo, FechaInicio, CupoMaximo, Videojuego, Plataforma, Descripcion, Estatus, FechaCreacion)
VALUES (2, "A puro Headshot", "2023-12-8", 128, "Valorant", "PC", "", TRUE, "2023-11-24");

INSERT INTO Torneo (IDAdministrador, NombreTorneo, FechaInicio, CupoMaximo, Videojuego, Plataforma, Descripcion, Estatus, FechaCreacion)
VALUES (3, "Unos Warzone", "2023-12-24", 16, "COD", "Multiplataforma", "", TRUE, "2023-11-25");

INSERT INTO Torneo (IDAdministrador, NombreTorneo, FechaInicio, CupoMaximo, Videojuego, Plataforma, Descripcion, Estatus, FechaCreacion)
VALUES (3, "Copa Piston", "2023-11-30", 16, "Rocket League", "Consola (PS4)", "", TRUE, "2023-11-26");
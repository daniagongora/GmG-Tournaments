-- CREACIÓN DE LA BASE DE DATOS
CREATE SCHEMA proyectois;

-- Seleccionamos el esquema para realizar el resto de operaciones
USE proyectois;

-- CREACIÓN DE TABLAS

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

-- Restricciones de la tabla Amistar
ALTER TABLE Amistar
    ADD CONSTRAINT FK_Solicitante FOREIGN KEY (Solicitante)
    REFERENCES Participante(IDParticipante)
    ON DELETE CASCADE;

ALTER TABLE Amistar
    ADD CONSTRAINT FK_Receptor FOREIGN KEY (Receptor)
    REFERENCES Participante(IDParticipante)
    ON DELETE CASCADE;

-- Tabla Participar
CREATE TABLE Participar (
    IDParticipante INT,
    IDTorneo INT,
    Estatus TINYINT(1) NOT NULL CHECK (Estatus IN (0, 1)),
    PRIMARY KEY (IDParticipante, IDTorneo),
    FOREIGN KEY (IDParticipante) REFERENCES Participante(IDParticipante),
    FOREIGN KEY (IDTorneo) REFERENCES Torneo(IDTorneo)
);

-- POBLACIÓN DE DATOS
	
-- Población de la tabla SuperAdministrador
INSERT INTO SuperAdministrador (IDSuperAdministrador, NombreCompleto, ImagenPerfil, Contrasenia, NombreSuperadministrador, Correo, Rol)
VALUES (1, 'Victoria Ramirez', '../statics/icons/spidergwen.png', 'd7f8acca0a63b2e39b378f21ee8f79541ffadc25ed87eaecb56054414ef29e21', 'Vic45', 'vichy@gmail.com', 'SuperAdministrador');

-- Población de la tabla Administrador
INSERT INTO Administrador (IDAdministrador, IDSuperAdministrador, NombreCompleto, ImagenPerfil, Contrasenia, NombreAdministrador, Correo, Rol)
VALUES (1, 1, 'Mario Letepichia', '../statics/icons/doge.jpg', 'f4b43cc5fb5dfef20bacc1d17695cf311cb825f7be6f09b0215f7b3704573ec1', 'Marius1141', 'marius@gmail.com', 'Administrador');

-- Población de la tabla Torneo
INSERT INTO Torneo (IDAdministrador, NombreTorneo, FechaInicio, CupoMaximo, Videojuego, Plataforma, Descripcion, Estatus, FechaCreacion)
VALUES (1, "Primer Torneo", "2023-11-30", 16, "Fall Guys", "Consolas", "Estas en un torneo de prueba", TRUE, "2023-11-17");

INSERT INTO Torneo (IDAdministrador, NombreTorneo, FechaInicio, CupoMaximo, Videojuego, Plataforma, Descripcion, Estatus, FechaCreacion)
VALUES (1, "Cartografía", "2023-12-1", 16, "HearthStone", "PC/Movil", "Adentrate a esta gran aventura", TRUE, "2023-11-19");

INSERT INTO Torneo (IDAdministrador, NombreTorneo, FechaInicio, CupoMaximo, Videojuego, Plataforma, Descripcion, Estatus, FechaCreacion)
VALUES (1, "lolcito", "2023-12-6", 32, "League of Legends", "PC", "", TRUE, "2023-11-21");

INSERT INTO Torneo (IDAdministrador, NombreTorneo, FechaInicio, CupoMaximo, Videojuego, Plataforma, Descripcion, Estatus, FechaCreacion)
VALUES (1, "Esta batalla sera legendaria", "2023-12-2", 64, "Mortal Kombat", "Consola (PS4)", "", TRUE, "2023-11-22");

INSERT INTO Torneo (IDAdministrador, NombreTorneo, FechaInicio, CupoMaximo, Videojuego, Plataforma, Descripcion, Estatus, FechaCreacion)
VALUES (1, "Torneo Fortnite", "2023-12-4", 16, "Fortnite", "Multiplataforma", "", TRUE, "2023-11-23");

INSERT INTO Torneo (IDAdministrador, NombreTorneo, FechaInicio, CupoMaximo, Videojuego, Plataforma, Descripcion, Estatus, FechaCreacion)
VALUES (1, "A puro Headshot", "2023-12-8", 128, "Valorant", "PC", "", TRUE, "2023-11-24");

INSERT INTO Torneo (IDAdministrador, NombreTorneo, FechaInicio, CupoMaximo, Videojuego, Plataforma, Descripcion, Estatus, FechaCreacion)
VALUES (1, "Unos Warzone", "2023-12-24", 16, "COD", "Multiplataforma", "", TRUE, "2023-11-25");

INSERT INTO Torneo (IDAdministrador, NombreTorneo, FechaInicio, CupoMaximo, Videojuego, Plataforma, Descripcion, Estatus, FechaCreacion)
VALUES (1, "Copa Piston", "2023-11-30", 16, "Rocket League", "Consola (PS4)", "", TRUE, "2023-11-26");
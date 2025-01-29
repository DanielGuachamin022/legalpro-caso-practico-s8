LegalPro - Caso Práctico S8

📌 Descripción del Proyecto

LegalPro es una aplicación desarrollada con React + Vite en el frontend y Node.js + Express en el backend. Su propósito es gestionar usuarios con distintos perfiles, integrando autenticación y lógica personalizada para cada tipo de usuario.

🚀 Tecnologías Utilizadas

Frontend (React + Vite)

React 18

Vite

React Router DOM

Tailwind CSS

Backend (Node.js + Express)

Node.js

Express

PostgreSQL

Sequelize (ORM)

JSON Web Token (JWT) para autenticación

Dotenv para la configuración de variables de entorno

⚙️ Configuración de Variables de Entorno

📌 Backend (backend/.env)

DB_NAME='legalpro'
DB_USER='postgres'
DB_PASSWORD='root'
DB_HOST='localhost'
DB_PORT='5432'
DB_DIALECT='postgres'

📌 Frontend (frontend/.env)
[VITE_API_URL=http://localhost:5000](http://localhost:5173/)

🔹 Importante: Crear estos archivos .env en cada carpeta y reemplazar los valores según tu configuración.

🗃️ Modelo Físico de la Base de Datos

```md
```sql
CREATE TABLE perfiles (
	idperfil SERIAL PRIMARY KEY,
	nombreperfil VARCHAR(50) NOT NULL,
	estadoperfil BOOLEAN NOT NULL
);

CREATE TABLE tipocasos (
	idtipocaso SERIAL PRIMARY KEY,
	nombretipocaso VARCHAR(70) NOT NULL,
	estadotipocaso BOOLEAN NOT NULL
);

CREATE TABLE evidencias (
	idevidencia SERIAL PRIMARY KEY,
	nombreevidencia VARCHAR(100) NOT NULL,
	estadoevidencia BOOLEAN NOT NULL,
	fechaingresoevidencia DATE NOT NULL
);

CREATE TABLE plazos (
	idplazo SERIAL PRIMARY KEY,
	nombreplazo VARCHAR(50) NOT NULL,
	fechaingresoplazo DATE NOT NULL,
	fechainicioplazo DATE NOT NULL,
	fechafinplazo DATE NOT NULL,
	estadoplazo BOOLEAN NOT NULL
);

CREATE TABLE equipos (
	idequipo SERIAL PRIMARY KEY,
	nombreequipo VARCHAR(50) NOT NULL,
	estadoequipo BOOLEAN NOT NULL
);

CREATE TABLE usuarios (
	idusuario SERIAL PRIMARY KEY,
	ciusuario VARCHAR(10) NOT NULL,
	nombreusuario VARCHAR(100) NOT NULL,
	correousuario VARCHAR(50) NOT NULL,
	telefonousuario VARCHAR(10) NOT NULL,
	contraseniausuario VARCHAR(100) NOT NULL,
	estadousuario BOOLEAN NOT NULL,
	idperfil INT NOT NULL,
	CONSTRAINT fk_usuarios_perfiles FOREIGN KEY (idperfil) REFERENCES perfiles (idperfil) ON DELETE CASCADE
);

CREATE TABLE cabeceracasos (
	idcabeceracaso SERIAL PRIMARY KEY,
	codigocaso VARCHAR(10) NOT NULL,
	fechainiciocabeceracaso DATE NOT NULL,
	nombrecliente VARCHAR(100) NOT NULL,
	estadocabeceracaso BOOLEAN NOT NULL,
	idtipocaso INT NOT NULL,
	CONSTRAINT fk_cabecera_tipocaso FOREIGN KEY (idtipocaso) REFERENCES tipocasos (idtipocaso) ON DELETE SET NULL
);

CREATE TABLE detallecasos (
	iddetallecaso SERIAL PRIMARY KEY,
	observacionesdetallecaso VARCHAR(300) NOT NULL,
	estadodetallecaso BOOLEAN NOT NULL,
	idevidencia INT NOT NULL,
	idplazo INT NOT NULL,
	idcabeceracaso INT NOT NULL,
	CONSTRAINT fk_detallecasos_evidencias FOREIGN KEY (idevidencia) REFERENCES evidencias (idevidencia) ON DELETE CASCADE,
	CONSTRAINT fk_detallecasos_plazos FOREIGN KEY (idplazo) REFERENCES plazos (idplazo) ON DELETE CASCADE,
	CONSTRAINT fk_cabeceracaso FOREIGN KEY (idcabeceracaso) REFERENCES cabeceracasos (idcabeceracaso) ON DELETE CASCADE
);

CREATE TABLE equipousuario (
	idequipo INT NOT NULL,
	idusuario INT NOT NULL,
	PRIMARY KEY (idequipo, idusuario),
	CONSTRAINT fk_equipos FOREIGN KEY (idequipo)
		REFERENCES equipos (idequipo) ON DELETE CASCADE,
	CONSTRAINT fk_usuarios FOREIGN KEY (idusuario)
		REFERENCES usuarios (idusuario) ON DELETE CASCADE
);

CREATE TABLE casousuario (
	idcabeceracaso INT NOT NULL,
	idusuario INT NOT NULL,
	PRIMARY KEY (idcabeceracaso, idusuario),
	CONSTRAINT fk_cabeceracasos FOREIGN KEY (idcabeceracaso)
		REFERENCES cabeceracasos (idcabeceracaso) ON DELETE CASCADE,
	CONSTRAINT fk_usuario FOREIGN KEY (idusuario)
		REFERENCES usuarios (idusuario) ON DELETE CASCADE
);


📦 Librerías Instaladas

📌 Backend

npm install axios@1.7.9 bcrypt@5.1.1 cors@2.8.5 dotenv@16.4.7 express@4.21.2 nodemon@3.1.9 pg-hstore@2.3.4 pg@8.13.1 sequelize@6.37.5

📌 Frontend

npm install @eslint/js@9.19.0 @fullcalendar/daygrid@6.1.15 @fullcalendar/interaction@6.1.15 @fullcalendar/react@6.1.15 @fullcalendar/timegrid@6.1.15 @types/react-dom@18.3.5 @types/react@18.3.18 @vitejs/plugin-react@4.3.4 axios@1.7.9 bcrypt@5.1.1 bootstrap@5.3.3 eslint-plugin-react-hooks@5.1.0 eslint-plugin-react-refresh@0.4.18 eslint-plugin-react@7.37.4 eslint@9.19.0 globals@15.14.0 react-bootstrap@2.10.8 react-dom@18.3.1 react-router-dom@7.1.3 react@18.3.1 vite@6.0.11

🔄 Script de Generación de Datos

Para poblar la base de datos con datos iniciales, ejecuta el siguiente comando en la carpeta backend:

INSERT INTO Perfiles (IdPerfil, NombrePerfil, EstadoPerfil) VALUES
(1, 'Administrador', TRUE),
(3, 'Abogado', TRUE),
(4, 'Cliente', TRUE);

INSERT INTO TipoCaso (IdTipoCaso, NombreTipoCaso, EstadoTipoCaso) VALUES
(1, 'Juridico', TRUE),
(2, 'Legal', TRUE),
(3, 'Familiar', TRUE),
(4, 'Negocios', TRUE);

INSERT INTO Usuarios (IdUsuario, CiUsuario, NombreUsuario, CorreoUsuario, TelefonoUsuario, ContraseniaUsuario, EstadoUsuario, IdPerfil) VALUES
(1, '1750819094', 'Daniel Guachamin', 'dguachamin@gmail.com', '0998663322', 'abcdef', TRUE, 1),
(3, '1750819090', 'Guillermo', 'guillermo@gmail.com', '0998663320', 'abcdef', TRUE, 3),
(4, '1750819091', 'Daniel', 'daniel@gmail.com', 'daniel@gmail.com', 'abcdef', TRUE, 4);

Este script creará los perfiles y usuarios iniciales.

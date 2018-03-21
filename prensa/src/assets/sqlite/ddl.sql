CREATE TABLE IF NOT EXISTS categoria (
	id INTEGER PRIMARY KEY
	, nombre TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS publicador (
	id INTEGER PRIMARY KEY
	, categoriaId INTEGER NOT NULL
	, pais CHAR(2) NOT NULL
	, idioma CHAR(2) NOT NULL
	, nombre TEXT NOT NULL

	, UNIQUE (pais, nombre)
);

INSERT INTO categoria (id, nombre) VALUES (1000, 'Prensa General');
INSERT INTO categoria (id, nombre) VALUES (1010, 'Deportes');
INSERT INTO categoria (id, nombre) VALUES (1020, 'Ciencia');
INSERT INTO categoria (id, nombre) VALUES (1030, 'Radio');


INSERT INTO publicador (id, categoriaId, pais, idioma, nombre) VALUES (10000, 1010, 'ES', 'es', 'Marca');
INSERT INTO publicador (id, categoriaId, pais, idioma, nombre) VALUES (10001, 1010, 'ES', 'es', 'Sport');

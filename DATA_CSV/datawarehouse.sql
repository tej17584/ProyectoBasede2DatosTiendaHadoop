/*
  Creacion de DATA WARE HOUSE en HIVE.
*/

/*
 * tabla centralizada de clientes
 */
--Tienda 1
CREATE TABLE temp_clientes (col_value STRING) STORED AS TEXTFILE
LOAD DATA INPATH '/Tienda1/SalidaClienteTienda1.csv' OVERWRITE INTO TABLE temp_clientes
SELECT * FROM temp_clientes
CREATE TABLE clientes (dpi STRING, nombre STRING, direccion STRING)

INSERT overwrite TABLE clientes
SELECT
  regexp_extract(col_value, '^(?:([^,]*),?){1}', 1) dpi,
  regexp_extract(col_value, '^(?:([^,]*),?){2}', 1) nombre,
  regexp_extract(col_value, '^(?:([^,]*),?){3}', 1) direccion
FROM temp_clientes

SELECT * FROM clientes
SELECT count(*) FROM clientes

--Tienda 2
CREATE TABLE temp_clientes2 (col_value STRING) STORED AS TEXTFILE
LOAD DATA INPATH '/Tienda2/ClientesTienda2.csv' OVERWRITE INTO TABLE temp_clientes2
SELECT * FROM temp_clientes2

INSERT INTO TABLE clientes
SELECT
  regexp_extract(col_value, '^(?:([^,]*),?){1}', 1) dpi,
  regexp_extract(col_value, '^(?:([^,]*),?){2}', 1) nombre,
  regexp_extract(col_value, '^(?:([^,]*),?){3}', 1) direccion
FROM temp_clientes2

SELECT count(*) FROM clientes  


/* 
 * tabla centralizada de categorias
 */ 
--TIENDA 1
CREATE TABLE temp_categorias (col_value STRING) STORED AS TEXTFILE
LOAD DATA INPATH '/Tienda1/SalidaCategoriaTienda1.csv' OVERWRITE INTO TABLE temp_categorias
SELECT * FROM temp_categorias
CREATE TABLE categorias (idcategoria int, nombre STRING, cantidad int)

INSERT overwrite TABLE categorias
SELECT
  regexp_extract(col_value, '^(?:([^,]*),?){1}', 1) idcategoria,
  regexp_extract(col_value, '^(?:([^,]*),?){2}', 1) nombre,
  regexp_extract(col_value, '^(?:([^,]*),?){3}', 1) cantidad
FROM temp_categorias

SELECT * FROM categorias
SELECT count(*) FROM categorias

--TIENDA 2
CREATE TABLE temp_categorias2 (col_value STRING) STORED AS TEXTFILE
LOAD DATA INPATH '/Tienda2/CategoriasTienda2.csv' OVERWRITE INTO TABLE temp_categorias2
SELECT * FROM temp_categorias2

INSERT INTO TABLE categorias
SELECT
  regexp_extract(col_value, '^(?:([^,]*),?){1}', 1) idcategoria,
  regexp_extract(col_value, '^(?:([^,]*),?){2}', 1) nombre,
  regexp_extract(col_value, '^(?:([^,]*),?){3}', 1) cantidad
FROM temp_categorias2

SELECT count(*) FROM categorias  


/* 
 * tabla centralizada de productos
 */
-- TIENDA 1
CREATE TABLE temp_productos (col_value STRING) STORED AS TEXTFILE
LOAD DATA INPATH '/Tienda1/SalidaProductoTienda1.csv' OVERWRITE INTO TABLE temp_productos
SELECT * FROM temp_productos
CREATE TABLE productos (id_producto STRING, nombre STRING, cantidad int,preciounitario FLOAT,id_marca STRING,id_categoria int)

INSERT overwrite TABLE productos
SELECT
  regexp_extract(col_value, '^(?:([^,]*),?){1}', 1) id_producto,
  regexp_extract(col_value, '^(?:([^,]*),?){2}', 1) nombre,
  regexp_extract(col_value, '^(?:([^,]*),?){3}', 1) cantidad,
  regexp_extract(col_value, '^(?:([^,]*),?){4}', 1) preciounitario,
  regexp_extract(col_value, '^(?:([^,]*),?){5}', 1) id_marca,
  regexp_extract(col_value, '^(?:([^,]*),?){6}', 1) id_categoria
FROM temp_productos

SELECT * FROM productos
SELECT count(*) FROM productos

--TIENDA 2
CREATE TABLE temp_productos2 (col_value STRING) STORED AS TEXTFILE
LOAD DATA INPATH '/Tienda2/ProductosTienda2.csv' OVERWRITE INTO TABLE temp_productos2
SELECT * FROM temp_productos2

INSERT INTO TABLE productos
SELECT
  regexp_extract(col_value, '^(?:([^,]*),?){1}', 1) id_producto,
  regexp_extract(col_value, '^(?:([^,]*),?){2}', 1) nombre,
  regexp_extract(col_value, '^(?:([^,]*),?){3}', 1) cantidad,
  regexp_extract(col_value, '^(?:([^,]*),?){4}', 1) preciounitario,
  regexp_extract(col_value, '^(?:([^,]*),?){5}', 1) id_marca,
  regexp_extract(col_value, '^(?:([^,]*),?){6}', 1) id_categoria
FROM temp_productos2

SELECT count(*) FROM productos


/* 
 * tabla centralizada de marcas 
 */
CREATE TABLE temp_marcas (col_value STRING) STORED AS TEXTFILE
LOAD DATA INPATH '/Tienda1/SalidaMarcaTienda1.csv' OVERWRITE INTO TABLE temp_marcas
SELECT * FROM temp_marcas
CREATE TABLE marcas (idmarca int, nombre STRING)

INSERT overwrite TABLE marcas
SELECT
  regexp_extract(col_value, '^(?:([^,]*),?){1}', 1) idmarca,
  regexp_extract(col_value, '^(?:([^,]*),?){2}', 1) nombre
FROM temp_marcas

SELECT * FROM marcas

/*
 * tabla centralizada de facturas
 */ 

--TIENDA 1
CREATE TABLE temp_facturas (col_value STRING) STORED AS TEXTFILE
LOAD DATA INPATH '/Tienda1/Factura_LineaFacturaTienda1.csv' OVERWRITE INTO TABLE temp_facturas
SELECT * FROM temp_facturas
CREATE TABLE facturas (id_factura STRING, dpi STRING,id_tienda int,fecha STRING,hora STRING,id_linea_factura STRING,id_producto STRING, cantidadcomprada int)

INSERT overwrite TABLE facturas
SELECT
  regexp_extract(col_value, '^(?:([^,]*),?){1}', 1) id_factura,
  regexp_extract(col_value, '^(?:([^,]*),?){2}', 1) dpi,
  regexp_extract(col_value, '^(?:([^,]*),?){3}', 1) id_tienda,
  regexp_extract(col_value, '^(?:([^,]*),?){4}', 1) fecha,
  regexp_extract(col_value, '^(?:([^,]*),?){5}', 1) hora,
  regexp_extract(col_value, '^(?:([^,]*),?){6}', 1) id_linea_factura,
  regexp_extract(col_value, '^(?:([^,]*),?){7}', 1) id_producto,
  regexp_extract(col_value, '^(?:([^,]*),?){8}', 1) cantidadcomprada
FROM temp_facturas

SELECT COUNT(*) FROM facturas

--TIENDA 2
CREATE TABLE temp_facturas2 (col_value STRING) STORED AS TEXTFILE
LOAD DATA INPATH '/Tienda2/FacturasTienda2.csv' OVERWRITE INTO TABLE temp_facturas2
SELECT * FROM temp_facturas2

INSERT INTO TABLE facturas
SELECT
  regexp_extract(col_value, '^(?:([^,]*),?){1}', 1) id_factura,
  regexp_extract(col_value, '^(?:([^,]*),?){2}', 1) dpi,
  regexp_extract(col_value, '^(?:([^,]*),?){3}', 1) id_tienda,
  regexp_extract(col_value, '^(?:([^,]*),?){4}', 1) fecha,
  regexp_extract(col_value, '^(?:([^,]*),?){5}', 1) hora,
  regexp_extract(col_value, '^(?:([^,]*),?){6}', 1) id_linea_factura,
  regexp_extract(col_value, '^(?:([^,]*),?){7}', 1) id_producto,
  regexp_extract(col_value, '^(?:([^,]*),?){8}', 1) cantidadcomprada
FROM temp_facturas2

    SELECT COUNT(*) FROM facturas
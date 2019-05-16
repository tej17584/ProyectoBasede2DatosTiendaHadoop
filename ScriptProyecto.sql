create database proyectodb2;

create table if not exists marca
(
    idmarca varchar(20) not null
        constraint marca_pk
            primary key,
    nombre  varchar(50)
);

create table if not exists categoria
(
    idcategoria varchar(20) not null
        constraint categoria_pk
            primary key,
    nombre      varchar(50),
    cantidad    integer
);

create table if not exists producto
(
    id_producto    varchar(20) not null
        constraint producto_pk
            primary key,
    nombre         varchar(50),
    cantidad       integer,
    preciounitario double precision,
    id_marca       varchar(20)
        constraint producto___fkmarca
            references marca,
    id_categoria   varchar(20)
        constraint producto___fkcategoria
            references categoria
);

create table if not exists definicion_datos_custom
(
    id_def_dato_custom varchar(20) not null
        constraint definicion_datos_custom_pk
            primary key,
    nombre             varchar(50),
    tipo               varchar(50)
);

create table if not exists datos_custom
(
    id_def_dato_custom varchar(20)
        constraint datos_custom___fkdefdatoscustom
            references definicion_datos_custom,
    id_producto        varchar(20),
    valor              varchar(50)
);

create table if not exists cliente
(
    dpi       varchar(20) not null
        constraint cliente_pk
            primary key,
    nombre    varchar(50),
    direccion varchar(50)
);

create table if not exists factura
(
    id_factura varchar(20) not null
        constraint factura_pk
            primary key,
    dpi        varchar(50) not null
        constraint factura___fkcliente
            references cliente,
    fecha      date        not null,
    hora       time        not null
);

create sequence linea_factura_id_linea_factura_seq;

create table if not exists linea_factura
(
    -- Only integer types can be auto increment
    id_linea_factura varchar(20) default nextval('linea_factura_id_linea_factura_seq'::regclass) not null
        constraint linea_factura_pk
            primary key,
    id_factura       varchar(20),
    id_producto      varchar(20)
        constraint linea_factura___fkproducto
            references producto,
    cantidadcomprada integer
);

INSERT INTO public.categoria VALUES ('1', 'Congelados', 10);
INSERT INTO public.categoria VALUES ('2', 'Ropa', 10);
INSERT INTO public.categoria VALUES ('3', 'Basicos', 10);
INSERT INTO public.categoria VALUES ('4', 'Comida', 20);
INSERT INTO public.categoria VALUES ('5', 'Cereales', 20);
INSERT INTO public.categoria VALUES ('6', 'Otros', 10);



INSERT INTO public.marca VALUES ('1', 'Adidas');
INSERT INTO public.marca VALUES ('2', 'Nike');
INSERT INTO public.marca VALUES ('3', 'Coca-Cola');
INSERT INTO public.marca VALUES ('4', 'Fritolay');
INSERT INTO public.marca VALUES ('5', 'Anabelly');
INSERT INTO public.marca VALUES ('6', 'Hellmans');
INSERT INTO public.marca VALUES ('7', 'Kellogs');
INSERT INTO public.marca VALUES ('8', 'Polo');
INSERT INTO public.marca VALUES ('9', 'Dolce');
INSERT INTO public.marca VALUES ('10', 'GeneralElectric');
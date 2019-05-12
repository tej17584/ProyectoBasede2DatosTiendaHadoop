create database proyectobasededatos
    with owner postgres;

create table if not exists marca
(
    idmarca varchar(20) not null
        constraint marca_pk
            primary key,
    nombre  varchar(50)
);

alter table marca
    owner to postgres;

create table if not exists categoria
(
    idcategoria varchar(20) not null
        constraint categoria_pk
            primary key,
    nombre      varchar(50),
    cantidad    integer
);

alter table categoria
    owner to postgres;

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

alter table producto
    owner to postgres;

create table if not exists definicion_datos_custom
(
    id_def_dato_custom varchar(20) not null
        constraint definicion_datos_custom_pk
            primary key,
    nombre             varchar(50),
    tipo               varchar(50)
);

alter table definicion_datos_custom
    owner to postgres;

create table if not exists datos_custom
(
    id_def_dato_custom varchar(20)
        constraint datos_custom___fkdefdatoscustom
            references definicion_datos_custom,
    id_producto        varchar(20)
        constraint datos_custom___fkproducto
            references producto,
    valor              varchar(50)
);

alter table datos_custom
    owner to postgres;

create table if not exists cliente
(
    dpi         varchar(20) not null
        constraint cliente_pk
            primary key,
    nombre      varchar(50),
    "dirección" varchar(50)
);

alter table cliente
    owner to postgres;

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

alter table factura
    owner to postgres;

create table if not exists linea_factura
(
    id_linea_factura varchar(20) not null
        constraint linea_factura_pk
            primary key,
    id_factura       varchar(20)
        constraint linea_factura___fkfactura
            references factura,
    id_producto      varchar(20)
        constraint linea_factura___fkproducto
            references producto,
    cantidadcomprada integer
);

alter table linea_factura
    owner to postgres;



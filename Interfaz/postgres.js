var { Pool } = require("pg");
var randomstring = require("randomstring");
const faker = require('faker');


var pool = new Pool({
  user: "postgres",
  password: "andresumsql",
  database: "proyectodb2"
});

function generarID() {
  var id = randomstring.generate(10);
  prod = document.getElementById("idProducto");
  const idinput = `<input type="text" class="input100" value="${id}" placeholder="ID Producto" id="prod" readonly/> `;
  prod.innerHTML += idinput;
}

function generarIDFactura() {
  var idFactura = randomstring.generate(10);
  prod = document.getElementById("idFactura");
  const idinput = `<input type="text" class="input100" value="${idFactura}" placeholder="ID Factura" id="IdFactura" readonly/> `;
  prod.innerHTML += idinput;
}

function prueba(id, nombre, cantidad, precio, marca, categoria) {
  console.log(id + "," + typeof id);
  console.log(nombre + "," + typeof id);
  console.log(cantidad + "," + typeof id);
  console.log(precio + "," + typeof id);
  console.log(marca + "," + typeof id);
  console.log(categoria + "," + typeof id);
}

async function agregarProducto(id, nombre, cantidad, precio, marca, categoria) {
  try {
    var query = "select * from producto where id_producto = $1";
    var response = await pool.query(query, [id]);
    console.log(response.rows);
    if (response.rowCount == 0) {
      var query = "select idmarca from marca where nombre = $1";
      var response3 = await pool.query(query, [marca]);
      var marc = response3.rows[0].idmarca;
      var query = "select idcategoria from categoria where nombre = $1";
      var response4 = await pool.query(query, [categoria]);
      var cat = response4.rows[0].idcategoria;
      var cant = parseInt(cantidad);
      var prec = parseFloat(precio);
      console.log("funciono");
      var query =
        "insert into producto(id_producto,nombre,cantidad,preciounitario,id_marca,id_categoria) values ($1,$2,$3,$4,$5,$6)";
      response2 = await pool.query(query, [id, nombre, cant, prec, marc, cat]);
      alert("Producto ingresado con exito");
    }
  } catch (error) {
    console.log(
      "No se logro ingresar el producto, posiblmente el dato ya existe"
    );
  }
}

//=================Metodo de Agregacion de Cliente============================================
async function agregarCliente(dpi, nombre, direccion) {
  try {
    var query = "select * from cliente where dpi = $1";
    var response = await pool.query(query, [dpi]);
    if (response.rowCount == 0) {
      var query = "insert into cliente(dpi,nombre,direccion) values ($1,$2,$3)";
      response2 = await pool.query(query, [dpi, nombre, direccion]);
      // alert("Cliente ingresado con exito");
    }
  } catch (error) {
    alert(
      "No se logro ingresar el cliente, por el siguiente error" + error
    );
  }
}

async function Consultarcliente() {
  try {
    var query = "select * from cliente";
    var response = await pool.query(query);
    var tableInicial = document.getElementById("tablaClientes");
    for (let index = 0; index < response.rowCount; index++) {
      const nuevaFilacliente = `
          <tbody>
          <tr>
              <td>${response.rows[index].dpi}</td>
              <td>${response.rows[index].nombre}</td>
              <td>${response.rows[index].direccion}</td>
          </tr>
      </tbody>
                  `;
      //Colocamos el inner
      tableInicial.innerHTML += nuevaFilacliente;
    }
  } catch (error) {
    alert("No se pudo consultar");
  }
}

async function agregarProductosTabla() {
  try {
    var query = "select * from producto";
    var response = await pool.query(query);
    var cuenta = response.rowCount;
    var div = document.getElementById("productos");
    for (var i = 0; i < cuenta; i++) {
      const dato = `
                <tbody>
                    <tr>
                        <td>${response.rows[i].id_producto}</td>
                        <td>${response.rows[i].nombre}</td>
                        <td>${response.rows[i].cantidad}</td>
                        <td>${response.rows[i].preciounitario}</td>
                        <td>${response.rows[i].id_marca}</td>
                        <td>${response.rows[i].id_categoria}</td>
                    </tr>
                </tbody>
            `;
      div.innerHTML += dato;
    }
  } catch (error) {
    alerta("No se logro agregar los productos a la tabla");
  }
}

async function getCategoria() {
  var query = "select * from categoria";
  var gCategoria = document.getElementById("categoriaProductoSelect");
  var response = await pool.query(query);
  for (var i = 0; i < response.rowCount; i++) {
    const nuevaFilaComboboxCategoria = `
        <option value="${response.rows[i].nombre}">${
      response.rows[i].nombre
    }</option>
                `;
    //Colocamos el inner
    gCategoria.innerHTML += nuevaFilaComboboxCategoria;
  }
}

async function getMarca() {
  var query = "select * from marca";
  var gmarca = document.getElementById("marcaProductoSelect");
  var response = await pool.query(query);
  for (var i = 0; i < response.rowCount; i++) {
    const nuevaFilaComboboxMarca = `
        <option value="${response.rows[i].nombre}">${
      response.rows[i].nombre
    }</option>
                `;
    //Colocamos el inner
    gmarca.innerHTML += nuevaFilaComboboxMarca;
  }
}
function combobox() {
  getCategoria();
  getMarca();
  generarID();
}

async function AgregarDatoCustom(
  idProducto,
  NombreDatoCustom,
  TipoDatoCustom,
  ValorDatoCustom
) {
  try {
    var id_def_dato_custom = randomstring.generate(10);
    var query =
      "select * from definicion_datos_custom where id_def_dato_custom = $1";
    var response = await pool.query(query, [id_def_dato_custom]);
    if (response.rowCount == 0) {
      var query =
        "insert into definicion_datos_custom(id_def_dato_custom,nombre,tipo) values ($1,$2,$3)";
      response2 = await pool.query(query, [
        id_def_dato_custom,
        NombreDatoCustom,
        TipoDatoCustom
      ]);
      console.log("DefDatoCustom ingresado con exito");
    }

    var query = "select * from datos_custom where id_def_dato_custom = $1";
    var response = await pool.query(query, [id_def_dato_custom]);
    if (response.rowCount == 0) {
      var query =
        "insert into datos_custom(id_def_dato_custom,id_producto,valor) values ($1,$2,$3)";
      response2 = await pool.query(query, [
        id_def_dato_custom,
        idProducto,
        ValorDatoCustom
      ]);
      alert("Dato Custom Ingresado con exito ingresado con exito");
    }
  } catch (error) {
    console.log("No se pudo agregar.");
  }
  document.getElementById("DCNombre").value = "";
  document.getElementById("DCTipo").value = "";
  document.getElementById("DCValor").value = "";
}

//Lennamos el combobox de productos
async function LlenarComboboxProductos() {
  generarIDFactura();
  var query = "select nombre from producto";
  var gProducto = document.getElementById("productosFacturaCombobox");
  var response = await pool.query(query);
  for (var i = 0; i < response.rowCount; i++) {
    const nuevaFilaComboboxProducto = `
        <option value="${response.rows[i].nombre}">${
      response.rows[i].nombre
    }</option>
                `;
    //Colocamos el inner
    gProducto.innerHTML += nuevaFilaComboboxProducto;
  }
}

//actualizamos la data de la tabla.
async function LoadTablaDetalleFactura(
  nombreProducto,
  cantidadProducto,
  IdFactura
) {
  try {
    var query = "select * from producto where nombre = $1";
    var agregamiento = document.getElementById("tabladetalleFactura");
    var response = await pool.query(query, [nombreProducto]);
    const nuevaFilaDetalleFactura = `
          <tbody>
          <tr>
              <td>${IdFactura}</td>
              <td>${response.rows[0].nombre}</td>
              <td>${cantidadProducto}</td>
              <td>${response.rows[0].preciounitario}</td>
          </tr>
      </tbody>
                  `;
    agregamiento.innerHTML += nuevaFilaDetalleFactura;
    //Ahora la ingresamos a la base de datos
    var query2 =
      "insert into linea_factura(id_factura,id_producto,cantidadcomprada) values ($1,$2,$3)";
    response2 = await pool.query(query2, [
      IdFactura,
      response.rows[0].id_producto,
      cantidadProducto
    ]);

    //Ahora hacemos el sum
    var query3 =
      "select sum(preciounitario*lf.cantidadcomprada) as sumatoria from producto inner join linea_factura lf on producto.id_producto = lf.id_producto where id_factura=$1";
    var response3 = await pool.query(query3, [IdFactura]);
    console.log(response3.rows);

    document.getElementById("TotalFactura").value = "";
    document.getElementById("TotalFactura").value = response3.rows[0].sumatoria;
  } catch (error) {
    alert("No se logro acumular datos" + error);
  }
}
async function generarFactura(id,dpi,fecha,hora){
    try {
        console.log(id,dpi,fecha,hora);
        var query = "insert into factura(id_factura,dpi,fecha,hora) values ($1,$2,$3,$4)";
        var response = await pool.query(query,[id,dpi,fecha,hora]);
    } catch (error) {
        alert("Error"+error);
    }
}


//========= Generador de productos aleatorios =================
async function generarProductos(){
  try {
      productos = Math.floor(Math.random()*100);
      for(var i=0;i<=productos;i++){
          var nombre = faker.lorem.words();
          var id = randomstring.generate(10);
          var cantidad = Math.floor(Math.random()*10000);
          var precio = Math.floor(Math.random()*100);
          var query = "select idcategoria from categoria";
          var response = await pool.query(query);
          var valor = Math.floor(Math.random()*response.rowCount);
          var categoria = response.rows[valor].idcategoria;
          query = "select idmarca from marca";
          var response2 = await pool.query(query);
          var valor2 = Math.floor(Math.random()*response2.rowCount);
          var marca = response2.rows[valor2].idmarca;
          query = "insert into producto(id_producto,nombre,cantidad,preciounitario,id_marca,id_categoria) values ($1,$2,$3,$4,$5,$6)";
          response2 = await pool.query(query,[id,nombre,cantidad,precio,marca,categoria]);
          console.log("Producto agregado"+nombre);
          //Creamos un nuevo random para cantidad de datos custom
          var randomCantidadDC= Math.floor(Math.random()*5);
          for (var  index = 0; index < randomCantidadDC; index++) {
            var idDefCustom = randomstring.generate(10);
            var nombreDefCustom =faker.lorem.words();
            var randomTipoDef= Math.floor(Math.random()*3);
            var TipoDefCustomIngreso="";
            if (randomTipoDef==0) {
              TipoDefCustomIngreso="Int";
              query = "insert into definicion_datos_custom (id_def_dato_custom, nombre, tipo) values ($1,$2,$3)";
              responseRandom = await pool.query(query,[idDefCustom,nombreDefCustom,TipoDefCustomIngreso]);
              //Ingresamos en la otra tabla
              query = "insert into datos_custom (id_def_dato_custom, id_producto, valor)  values ($1,$2,$3)";

              responseRandom2 = await pool.query(query,[idDefCustom,id,String(Math.floor(Math.random()*40))]);
            }
            else if (randomTipoDef==1) {
              TipoDefCustomIngreso="Double";
              query = "insert into definicion_datos_custom (id_def_dato_custom, nombre, tipo) values ($1,$2,$3)";
              responseRandom = await pool.query(query,[idDefCustom,nombreDefCustom,TipoDefCustomIngreso]);
              //Ingresamos en la otra tabla
              query = "insert into datos_custom (id_def_dato_custom, id_producto, valor)  values ($1,$2,$3)";

              responseRandom2 = await pool.query(query,[idDefCustom,id,String(parseFloat(Math.floor(Math.random()*40)))]);
            }
            else if (randomTipoDef==2) {
              TipoDefCustomIngreso="String";
              query = "insert into definicion_datos_custom (id_def_dato_custom, nombre, tipo) values ($1,$2,$3)";
              responseRandom = await pool.query(query,[idDefCustom,nombreDefCustom,TipoDefCustomIngreso]);
              //Ingresamos en la otra tabla
              query = "insert into datos_custom (id_def_dato_custom, id_producto, valor)  values ($1,$2,$3)";

              responseRandom2 = await pool.query(query,[idDefCustom,id,faker.lorem.words()]);
            }
          }
      }
      alert("Productos ingresados con exito");
  } catch (error) {
      alert("Error no se pueden agregar los productos"+error);
  }
}
async function generarClientes(){
  try {
      clientes = Math.floor(Math.random()*50);
      for(var i=0;i<=clientes;i++){
          var dpi =  faker.random.number();
          var nombre  = faker.name.findName();
          var direccion = faker.address.streetAddress();
          agregarCliente(dpi,nombre,direccion);
          // alert("cliente agregado con exito"+dpi);
      }
      alert("Clientes creados");
  } catch (error) {
      alert("Error"+error);
  }
}

async function randomFactura(fecha){
  try {
    if(fecha!=""){
      factura = Math.floor(Math.random()*100);
      console.log(factura);
      for(var i=0;i<factura;i++){
          var id = randomstring.generate(10);
          var query = "select dpi from cliente";
          var response = await pool.query(query);
          var num = Math.floor(Math.random()*response.rowCount);
          var dpi = response.rows[num].dpi;
          var hora = String(faker.date.recent()).substring(16,24);
          generarFactura(id,dpi,fecha,hora);
          // query = "insert into factura(id_factura,dpi,fecha,hora) values ($1,$2,$3,$4)"
          var cantProductos = Math.floor(Math.random()*50);
          for(var j=0;j<=cantProductos;j++){
              query = ("select id_producto from producto");
              var cantidad = Math.floor(Math.random()*15);
              response2 = await pool.query(query);
              num = Math.floor(Math.random()*response2.rowCount);
              var producto = response2.rows[num].id_producto;
              query = "insert into linea_factura(id_factura,id_producto,cantidadcomprada) values ($1,$2,$3)";
              response3 = await pool.query(query,[id,producto,cantidad]);
          }
          console.log('exito id ingresado'+id);
      }
      alert("Ventas creadas");
    }else{
      alert("Debe ingresar la fecha");
    }
  } catch (error) {
      alert("Error"+error);
  }
}

//Funcion para consultar factura
async function ConsultarFacturas() {
  try {
    var query = `SELECT factura.id_factura, producto.nombre as NombreProducto,linea_factura.cantidadcomprada,cliente.nombre,factura.fecha
    FROM factura
    INNER JOIN linea_factura
    ON factura.id_factura = linea_factura.id_factura
    INNER JOIN cliente
    ON factura.dpi = cliente.dpi
    INNER JOIN producto
    ON linea_factura.id_producto = producto.id_producto`;
    var response = await pool.query(query);
    var tableInicial = document.getElementById("VentasGeneralTable");
    console.log(response.rows)
    for (let index = 0; index < response.rowCount; index++) {
      const nuevaFilaFactura = `
          <tbody>
          <tr>
              <td>${response.rows[index].id_factura}</td>
              <td>${response.rows[index].nombreproducto}</td>
              <td>${response.rows[index].cantidadcomprada}</td>
              <td>${response.rows[index].nombre}</td>
              <td>${response.rows[index].fecha}</td>
          </tr>
      </tbody>
                  `;
      //Colocamos el inner
      tableInicial.innerHTML += nuevaFilaFactura;
    }
  } catch (error) {
    alert("No se pudo consultar"+error);
  }
}
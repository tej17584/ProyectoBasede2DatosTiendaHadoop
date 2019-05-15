var {Pool} = require('pg');
var randomstring = require("randomstring");

var pool = new Pool({
    user: 'postgres',
    password: '123',
    database: 'proyectodb2'
});

function generarID(){
    var id = randomstring.generate(10);
    prod = document.getElementById("idProducto");
    const idinput = `<input type="text" class="input100" value="${id}" placeholder="ID Producto" id="prod" readonly/> `;
    prod.innerHTML = idinput;
}

function prueba(id,nombre,cantidad,precio,marca,categoria){
    console.log(id+","+typeof id);
    console.log(nombre+","+typeof id);
    console.log(cantidad+","+typeof id);
    console.log(precio+","+typeof id);
    console.log(marca+","+typeof id);
    console.log(categoria+","+typeof id);
}

async function agregarProducto(id,nombre,cantidad,precio,marca,categoria){
    try {
        var query = "select * from producto where id_producto = $1";
        var response = await pool.query(query,[id]);
        console.log(response.rows)
        if (response.rowCount == 0){
            var query = "select idmarca from marca where nombre = $1";
            var response3 = await pool.query(query,[marca]);
            var marc = response3.rows[0].idmarca;
            var query = "select idcategoria from categoria where nombre = $1";
            var response4 = await pool.query(query,[categoria]);
            var cat = response4.rows[0].idcategoria;
            var cant = parseInt(cantidad);
            var prec = parseFloat(precio);
            console.log("funciono")
            var query = "insert into producto(id_producto,nombre,cantidad,preciounitario,id_marca,id_categoria) values ($1,$2,$3,$4,$5,$6)";
            response2 = await pool.query(query,[id,nombre,cant,prec,marc,cat]);
            console.log("Producto ingresado con exito")
        }    
    } catch (error) {
        console.log("No se logro ingresar el producto, posiblmente el dato ya existe");
    }
}

//=================Metodo de Agregacion de Cliente============================================
async function agregarCliente(dpi,nombre,direccion){
    try {
        var query = "select * from cliente where dpi = $1";
        var response = await pool.query(query,[dpi]);
        if (response.rowCount == 0){
            var query = "insert into cliente(dpi,nombre,direccion) values ($1,$2,$3)";
            response2 = await pool.query(query,[dpi,nombre,direccion]);
            console.log("Cliente ingresado con exito");
        }
    } catch (error) {
        console.log("No se logro ingresar el cliente, por el siguiente error"+error)
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
      console.log("No se pudo consultar");
    }
  }

async function agregarProductosTabla()
{
    try {
      var query = "select * from producto";
        var response = await pool.query(query);
        var cuenta = response.rowCount;
        var div = document.getElementById("productos");
        for (var i = 0; i < cuenta; i++)
        { 
            const dato =`
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
          }    
    catch (error) 
    {
      console.log("No se logro agregar los productos a la tabla");
    }   
  }


async function getCategoria(){
    var query = "select * from categoria";   
    var gCategoria = document.getElementById("categoriaProductoSelect");
    var response = await pool.query(query);
    for(var i=0; i<response.rowCount; i++){
        const nuevaFilaComboboxCategoria = `
        <option value="${response.rows[i].nombre}">${response.rows[i].nombre}</option>
                `;
    //Colocamos el inner
    gCategoria.innerHTML += nuevaFilaComboboxCategoria;
    }
  }

  async function getMarca(){
    var query = "select * from marca";
    var gmarca = document.getElementById("marcaProductoSelect");
    var response = await pool.query(query);
    for(var i=0; i<response.rowCount; i++){
        const nuevaFilaComboboxMarca = `
        <option value="${response.rows[i].nombre}">${response.rows[i].nombre}</option>
                `;
    //Colocamos el inner
    gmarca.innerHTML += nuevaFilaComboboxMarca;
    }
  }
  function combobox(){
      getCategoria();
      getMarca();
      generarID();
  }

  async function AgregarDatoCustom(idProducto,NombreDatoCustom,TipoDatoCustom,ValorDatoCustom){
      try {
        var id_def_dato_custom = randomstring.generate(10);
        var query = "select * from definicion_datos_custom where id_def_dato_custom = $1";
        var response = await pool.query(query,[id_def_dato_custom]);
        if (response.rowCount == 0){
            var query = "insert into definicion_datos_custom(id_def_dato_custom,nombre,tipo) values ($1,$2,$3)";
            response2 = await pool.query(query,[id_def_dato_custom,NombreDatoCustom,TipoDatoCustom]);
            console.log("DefDatoCustom ingresado con exito");
        }

        var query = "select * from datos_custom where id_def_dato_custom = $1";
        var response = await pool.query(query,[id_def_dato_custom]);
        if (response.rowCount == 0){
            var query = "insert into datos_custom(id_def_dato_custom,id_producto,valor) values ($1,$2,$3)";
            response2 = await pool.query(query,[id_def_dato_custom,idProducto,ValorDatoCustom]);
            console.log("Dato Custom Ingresado con exito ingresado con exito");
        }


      } catch (error) {
          console.log("No se pudo agregar.")
      }
      document.getElementById('DCNombre').value = "";
      document.getElementById('DCTipo').value = "";
      document.getElementById('DCValor').value = "";
    
}
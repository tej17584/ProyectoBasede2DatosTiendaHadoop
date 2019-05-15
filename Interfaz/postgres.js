var {Pool} = require('pg');
var randomstring = require("randomstring");

var pool = new Pool({
    user: 'postgres',
    password: 'andresumsql',
    database: 'proyectobasededatos'
});

function generarID(){
    var id = randomstring.generate(10);
    return id
}

async function agregarProducto(nombre,cantidad,precio,marca,categoria){
    try {
        var id = document.getElementById("idProducto");
        var query = "select * from producto where id_producto = $1";
        var response = await pool.query(query,[id]);
        console.log(response.rows)
        if (response.rowCount == 0){
            cant = parseInt(cantidad);
            prec = parseFloat(precio);
            console.log("funciono")
            var query = "insert into producto(id_producto,nombre,cantidad,preciounitario,id_marca,id_categoria) values ($1,$2,$3,$4,$5,$6)";
            response2 = await pool.query(query,[id,nombre,cant,prec,marca,categoria]);
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
  }


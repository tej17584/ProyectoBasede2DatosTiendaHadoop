var {Pool} = require('pg');

var pool = new Pool({
    user: 'postgres',
    password: '123',
    database: 'proyectodb2'
});

async function agregarProducto(id,nombre,cantidad,precio,marca,categoria){
    try {
        var query = "select * from producto where id_producto = $1";
        var response = await pool.query(query,[id]);
        console.log(response.rows)
        if (response.rowCount == 0){
            console.log("funciono")
            var query = "insert into producto(id_producto,nombre,cantidad,preciounitario,id_marca,id_categoria) values ($1,$2,$3,$4,$5,$6)";
            response2 = await pool.query(query,[id,nombre,cantidad,precio,marca,categoria]);
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

// try {
    //     var bandera = false;
    //     await pool.connect().then(client =>{
    //         client.query('select * from producto where id_producto = $1',[id]).then(res =>{
    //             client.release()
    //             // console.log(res.rows[0].id_producto)
    //             if (res.rowCount == 0){
    //                 bandera = true
    //             }
    //             if (bandera == true){
                    
    //             }
    //         })
    //     })
    //     if (bandera == true){
    //         console.log("Funciono")
    //     }
    // } catch (ex) {
    //     console.log("No se pudo agregar a la base de datos")
    // }
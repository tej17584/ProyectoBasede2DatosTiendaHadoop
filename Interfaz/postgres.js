var {Pool} = require('pg');

var pool = new Pool({
    user: 'postgres',
    password: 'andresumsql',
    database: 'proyectobasededatos'
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
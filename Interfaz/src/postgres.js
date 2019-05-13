var {Pool} = require('pg');

var pool = new Pool({
    user: 'postgres',
    password: 'andresumsql',
    database: 'proyectobasededatos'
});

async function agregarProducto(id,nombre,cantidad,precio,marca,categoria){
    try {
        var bandera = false;
        await pool.connect().then(client =>{
            client.query('select * from producto where id_producto = $1',[id]).then(res =>{
                client.release()
                // console.log(res.rows[0].id_producto)
                if (res.rowCount == 0){
                    bandera = true
                }
            })
        })
    } catch (ex) {
        console.log("No se pudo agregar a la base de datos")
    }
}
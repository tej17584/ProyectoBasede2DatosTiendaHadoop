var {Pool} = require('pg');

var pool = new Pool({
    database: 'lab_09',
    user: 'postgres',
    password: 'andresumsql',
    port: 5432
});
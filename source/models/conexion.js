const mysql = require("mysql");
const { promisify } = require('util');

var sqlConnecion = mysql.createConnection({
    host:"contactos.cwqsubtnhviw.us-west-1.rds.amazonaws.com",
    user:"admin",
    password:"melani130290",
    database:"sistemas" 
});

sqlConnecion.connect(function(err){
    if(err){
        console.log(err.message);
    }
    else{
        console.log("Se conectó con exito");
    }

});

sqlConnecion.query = promisify(sqlConnecion.query)

module.exports = sqlConnecion;

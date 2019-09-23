const mysql = require('mysql');

const { promisify } = require('util');

const { database } = require('./keys.js');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('Error: Database connection was closed');
        }
        if(err.code === 'ER_CON_COUNT_ERROR') {
            console.log('Error: Database has to many connections');
        }
        if(err.code === 'ECONNREFUSED') {
            console.log('Error: Database connection was refused');
        }
    }
    if(connection) connection.release();
    console.log('Database is connected');
    return;
});

pool.query = promisify(pool.query); // Pomisify Pool Querys

module.exports = pool;
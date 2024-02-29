const mysql = require('mysql');

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pablo123',
});

// Conectar a la base de datos MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos MySQL establecida.');
});

// Definir la consulta SQL para crear la tabla
const createTableQuery = `
    CREATE DATABASE hola1
`;

// Ejecutar la consulta para crear la tabla
connection.query(createTableQuery, (err, results) => {
    if (err) {
        console.error('Error al crear la tabla:', err);
    } else {
        console.log('base de datos MySQL establecida');
    }
});

// Cerrar la conexión con la base de datos MySQL
connection.end((err) => {
    if (err) {
        console.error('Error al cerrar la conexión con la base de datos:', err);
        return;
    }
    console.log('Conexión con la base de datos MySQL cerrada correctamente.');
});

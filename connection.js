const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "express" 
});

connection.connect(error => {
    if (error) {
        console.error('Database connection failed:', error);
    } else {
        console.log('✅ Connected to MySQL');
    }
});


module.exports = connection;
const express = require('express');
const cors = require('cors');
const db = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.userLogin = "/api/auth";

        //Database
        this.connnectDataBase();


        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async connnectDataBase(){
        await db.dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.usersPath, require('../routes/users'));
        this.app.use( this.userLogin, require('../routes/auth'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;

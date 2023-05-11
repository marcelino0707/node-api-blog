const mysql = require('mysql2/promise');
const dotenv = require('dotenv')

dotenv.config();

class dbConnector {

    constructor() {
        this.connection = null;
    }

    async connect(dbType) {
        try {
            switch (dbType) {
                default:
                    this.connection = await mysql.createConnection({
                        host: process.env.DB_HOST,
                        port: process.env.DB_PORT,
                        user: process.env.DB_USER,
                        password: process.env.DB_PASSWORD,
                        database: process.env.DB_NAME
                    })
                // create update delete
                case 'CUD' :
                    this.connection = await mysql.createConnection({
                        host: process.env.DB_HOST,
                        port: process.env.DB_PORT,
                        user: process.env.DB_USER,
                        password: process.env.DB_PASSWORD,
                        database: process.env.DB_NAME
                    })
                // read
                case 'R' :
                    this.connection = await mysql.createConnection({
                        host: process.env.DB_HOST,
                        port: process.env.DB_PORT,
                        user: process.env.DB_USER,
                        password: process.env.DB_PASSWORD,
                        database: process.env.DB_NAME
                    })
            }
            console.log("DB Connected")
        } catch (error) {
            throw new Error(error)
        }
    }

    async disconnect() {
        try {
            await this.connection.end();
            console.log("DB Disconnected")
        } catch (error) {
            throw new Error(error);
        }
    }

    async execute(query, params, dbType) {
        try {
            await this.connect(dbType)
            let result = []
            if(Array.isArray(params)) {
                const [row] = await this.connection.execute(query,params)
                result = row
            } else {
                [result] = await this.connection.query(query, params);
            }
            await this.disconnect()
            return result
        } catch (error) {
            throw error
        }
    }

    async query(query, dbType) {
        try {
            await this.connect(dbType)
            const [result] = await this.connection.query(query)
            await this.disconnect()
            return result
        } catch (error) {
            throw error
        }
    }
}

module.exports = dbConnector

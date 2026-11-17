import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const conectar = async ()=>{
    try {
        const bdd = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD
        })
        console.log(`CONECTADO !!`);
        return bdd;
    } catch (error) {
        console.log(`error, no se pudo conectar a la bdd\n ${error}`);
    }
}
import { config } from 'dotenv';

config({path: '.env'});

interface Mysql {
    host: any;
    port: any;
    username: any;
    password: any;
    database: any;
}

export const mysql:Mysql = {
    host: process.env.MYSQL_HOST_URL,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
};

export const auth = {
    secret: process.env.JWT_SECRET,
    expirationTime: process.env.JWT_EXPIRATON_TIME,
}
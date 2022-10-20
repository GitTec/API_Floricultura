import { createConnection } from "mysql2";

const conexao = createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_flores'
});

export {conexao}
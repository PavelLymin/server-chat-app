import {Pool} from 'pg';

const pool = new Pool({
    user: 'postgres',
    password: 'VaPa15022005',
    host: 'localhost',
    port: 5433,
    database: 'chat_app'
});

export default pool;
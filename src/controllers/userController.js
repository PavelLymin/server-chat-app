import pool from '../models/db.js';


export const fetchUser = async(req, res) => {
    const id = req.id;
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE id = $1',
            [id]
        );

        return res.json(result.rows);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch user'});
    }
}

export const fetchUsers = async(_, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM users',
        );

        return res.json(result.rows) ;
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch users'});
    }
}
import pool from '../models/db.js';


export const addUser = async(req, res) => {
    const {id, username, email} = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO users (id, username, email) VALUES ($1, $2, $3) RETURNING *',
            [id, username, email]
        );

        const user = result.rows[0];
        res.status(201).json({message: 'User register succesfully', user});
    } catch (error) {
        res.status(500).json({error: 'Failed to register user'});
    }
}
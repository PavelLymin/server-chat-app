import bcrypt from 'bcrypt';
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

// export const login = async(req, res) => {
//     const {email, password} = req.body;
//     try {
//         const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
//         const user = result.rows[0];
//         if (!user) return res.status(404).json({error: 'User not found'});

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({error: 'Invalid credetials'});
//         res.json({message: 'Logged in successfully'})
//     } catch (error) {
//         res.status(500).json({error: 'Failed to log in user'});
//     }
// }
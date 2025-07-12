import pool from '../models/db.js';


export const getLastMessage = async (req, res) => {
    const id = req.id;
    try {
        const result = await pool.query(
            `SELECT c.id AS chat_id,
            CASE 
                WHEN u1.id = $1 THEN u2.username
                ELSE u1.username
            END AS participant_name,
            m.content AS last_message,
            m.created_at AS last_message_time
            FROM chats c
            JOIN users u1 ON u1.id = c.participant_one
            JOIN users u2 ON u2.id = c.participant_two
            LEFT JOIN LATERAL (
                SELECT content, created_at
                FROM messages
                WHERE chat_id =c.id
                ORDER BY created_at DESC
                LIMIT 1    
            ) m ON true
            WHERE c.participant_one = $1 OR c.participant_two = $1
            ORDER BY m.created_at DESC`, 
            [id]
        );
        
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch chats'});
    }
}


import express from 'express';
import pool from '../models/db.js';

export const fetchAllMessagesByChatId = async (req, res) => {
    const chatId = req.id;
    try {
        const result = await pool.query(`
            SELECT *
            FROM messages
            WHERE chat_id = $1
            ORDER BY created_at ASC
            `, [chatId]);

            res.json(result.rows);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch messages'});
    }
}

export const saveMessage = async (chatId, senderId, content) => {
    try {
        const result = await pool.query(`
            INSERT INTO messages (chat_id, sender_id, content)
            VALUES ($1, $2, $3)
            RETURNING *
            `, [chatId, senderId, content]);

        return result.rows[0];
    } catch (error) {
        throw new Error('Failed to save message')
    }
}

export const deleteMessage = async (messageId) => {
    try {
        const result = await pool.query(`
            DELETE FROM messages
            WHERE id = $1
            RETURNING id
            `, [messageId]);

        return result.rows[0];
    } catch (error) {
       throw new Error('Failed to delete message');
    }
}
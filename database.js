import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config();

//MySQL Table Creation 
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getAllNotes() { 
    const [rows, fields] = await pool.query(`
        SELECT * 
        FROM notes
        `);
    return rows;
}

export async function getNote(id) {
    const [rows, fields] = await pool.query(`
        SELECT * 
        FROM notes 
        WHERE id = ?
        `, [id]);
    return rows[0];
}

export async function createNote(title, content) {
    const [result] = await pool.query(`
        INSERT INTO notes (title, content) 
        VALUES (?, ?)
        `, [title, content]);
        const id = result.insertId;
    return getNote(id);
} 

export async function updateNote(id, title, content) {
    await pool.query(`
        UPDATE notes
        SET title = ?, content = ?
        WHERE id = ?
        `, [title, content, id]);
    return getNote(id);
}

export async function deleteNote(id) {
    await pool.query(`
        DELETE FROM notes
        WHERE id = ?
        `, [id]);
    return { message: 'Note deleted successfully' };
}

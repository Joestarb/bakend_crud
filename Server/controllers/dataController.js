const { pool } = require("../db/dbConfig");

const getAllData = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM ContactForm');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDataById = async (req, res) => {
    const id = req.params.id;
    try {
        const [rows] = await pool.query('SELECT * FROM ContactForm WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Data not found' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createData = async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO ContactForm (nombre_completo, direccion_correo, mensaje) VALUES (?, ?, ?)', [name, email, message]);
        res.json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateData = async (req, res) => {
    const id = req.params.id;
    const { name, email, message } = req.body;
    try {
        const [result] = await pool.query('UPDATE ContactForm SET name = ?, email = ?, message = ? WHERE id = ?', [name, email, message, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Data not found' });
        res.json({ message: 'Data updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteData = async (req, res) => {
    const id = req.params.id;
    try {
        const [result] = await pool.query('DELETE FROM ContactForm WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Data not found' });
        res.json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllData,
    getDataById,
    createData,
    updateData,
    deleteData
};

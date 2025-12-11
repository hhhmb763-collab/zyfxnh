import express from 'express';
import pool from '../db/init.js';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await pool.query('DELETE FROM resources WHERE id=$1', [id]);
    res.redirect('/admin');
});

export default app;

import express from 'express';
import pool from '../db/init.js';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';

const app = express();

app.get('/', async (req, res) => {
    const query = req.query.q;
    let sql = 'SELECT * FROM resources ORDER BY sort_order ASC, created_at DESC';
    let values = [];
    if (query) {
        sql = 'SELECT * FROM resources WHERE name ILIKE $1 OR tags ILIKE $1 OR description ILIKE $1 ORDER BY sort_order ASC, created_at DESC';
        values = [`%${query}%`];
    }
    const { rows } = await pool.query(sql, values);
    const template = fs.readFileSync(path.resolve('views/index.ejs'), 'utf-8');
    res.send(ejs.render(template, { resources: rows, search_query: query }));
});

export default app;

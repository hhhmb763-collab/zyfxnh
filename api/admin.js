import express from 'express';
import pool from '../db/init.js';
import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const FORM_CONFIG = {/* 与原Flask项目相同 */};

app.get('/admin', async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM resources ORDER BY sort_order ASC');
    const template = fs.readFileSync(path.resolve('views/admin.ejs'), 'utf-8');
    const html = ejs.render(template, { resources: rows, form_config: FORM_CONFIG });
    res.send(html);
});

app.post('/admin', async (req, res) => {
    const { name, r_type, description, tg_link, pan_link, pan_pass, tags } = req.body;
    const result = await pool.query('SELECT MAX(sort_order) as max_order FROM resources');
    const new_order = (result.rows[0].max_order ?? -1) + 1;

    await pool.query(
        `INSERT INTO resources (name, r_type, description, tg_link, pan_link, pan_pass, tags, sort_order)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [name, r_type, description, tg_link, pan_link, pan_pass, tags, new_order]
    );
    res.redirect('/admin');
});

export default app;

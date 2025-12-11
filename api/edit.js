import express from 'express';
import pool from '../db/init.js';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/admin/edit/:id', async (req, res) => {
    const id = req.params.id;
    const { rows } = await pool.query('SELECT * FROM resources WHERE id=$1', [id]);
    const resource = rows[0];
    const template = fs.readFileSync(path.resolve('views/edit.ejs'), 'utf-8');
    res.send(ejs.render(template, { resource }));
});

app.post('/admin/edit/:id', async (req, res) => {
    const id = req.params.id;
    const { name, r_type, description, tg_link, pan_link, pan_pass, tags } = req.body;
    await pool.query(
        `UPDATE resources SET name=$1,r_type=$2,description=$3,tg_link=$4,pan_link=$5,pan_pass=$6,tags=$7 WHERE id=$8`,
        [name,r_type,description,tg_link,pan_link,pan_pass,tags,id]
    );
    res.redirect('/admin');
});

export default app;

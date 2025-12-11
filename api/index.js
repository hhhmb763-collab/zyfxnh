// api/index.js
import express from 'express';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';

const app = express();
const prisma = new PrismaClient();

app.get('/', async (req, res) => {
    const query = req.query.q;
    try {
        let resources;
        if (query) {
            resources = await prisma.resource.findMany({
                where: {
                    OR: [
                        { name: { contains: query, mode: 'insensitive' } },
                        { tags: { contains: query, mode: 'insensitive' } },
                        { description: { contains: query, mode: 'insensitive' } }
                    ]
                },
                orderBy: [
                    { sort_order: 'asc' },
                    { created_at: 'desc' }
                ]
            });
        } else {
            resources = await prisma.resource.findMany({
                orderBy: [
                    { sort_order: 'asc' },
                    { created_at: 'desc' }
                ]
            });
        }

        const template = fs.readFileSync(path.resolve('views/index.ejs'), 'utf-8');
        res.send(ejs.render(template, { resources, search_query: query }));
    } catch (error) {
        console.error(error);
        res.status(500).send('数据库查询失败');
    }
});

export default app;

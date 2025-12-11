import express from 'express';
import pool from '../db/init.js';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.post('/admin/update_order', async (req, res) => {
    const order_data = req.body;
    if (!order_data) return res.json({ success: false, message: '无效的数据' });
    for (let i=0;i<order_data.length;i++){
        await pool.query('UPDATE resources SET sort_order=$1 WHERE id=$2',[i,parseInt(order_data[i])]);
    }
    res.json({ success:true,message:'排序更新成功' });
});

export default app;

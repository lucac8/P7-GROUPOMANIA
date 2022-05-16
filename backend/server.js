const express = require('express');
const app = express();
const mysql = require('mysql2')

require('dotenv').config({ path: './config/.env' });
const db = require('./config/db');
const path = require('path')
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json())
app.use('/images', express.static(path.join(__dirname, 'images')));


//ROUTES
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes)

app.listen(5000, async () => {
    await db.sync()
})  
require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');

const app = express();

app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect()
.then(() => {
    console.log('Connected to Neon');
})
.catch((err) => {
    console.log(err);
});


app.get('/', function(req, res) {
    res.send('JuConnect Backend Running');
});


app.get('/posts', async function(req, res) {

    try {

        const result = await pool.query(
            'SELECT * FROM posts'
        );

        res.json(result.rows);

    } catch (err) {

        console.log(err);

        res.status(500).send('Server Error');

    }

});


app.post('/posts', async function(req, res) {

    try {

        const title = req.body.title;
        const author = req.body.author;

        const result = await pool.query(
            'INSERT INTO posts (title, author) VALUES ($1, $2) RETURNING *',
            [title, author]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {

        console.log(err);

        res.status(500).send('Server Error');

    }

});


app.listen(5000, function() {
    console.log('Server running on port 5000');
});
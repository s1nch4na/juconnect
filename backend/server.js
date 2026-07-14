require('dotenv').config();

const cors = require('cors');
const jwt = require('jsonwebtoken');
const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());

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

app.get('/posts/:id', async function(req, res) {

    try {

        const id = req.params.id;

        const result = await pool.query(
            'SELECT * FROM posts WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send('Post not found');
        }

        res.json(result.rows[0]);

    } catch (err) {

        console.log(err);

        res.status(500).send('Server Error');

    }

});

app.get('/communities/:communityId/posts', async function(req, res) {

    try {

        const communityId = req.params.communityId;

        const result = await pool.query(

            `SELECT * FROM posts
             WHERE community_id = $1
             ORDER BY created_at DESC`,

            [communityId]

        );

        res.json(result.rows);

    }

    catch(err) {

        console.log(err);

        res.status(500).send('Server Error');

    }

});


app.post('/posts', async function(req, res) {

    try {

        const { title, content, author, communityId } = req.body;

        const result = await pool.query(

            `INSERT INTO posts
            (title, content, author, community_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,

            [title, content, author, communityId]

        );

        res.status(201).json(result.rows[0]);

    } catch (err) {

        console.log(err);

        res.status(500).send('Server Error');

    }

});

app.post('/register', async function(req, res) {

    try {

        const { username, email, password } = req.body;

        const existingUser = await pool.query(
            'SELECT * FROM users WHERE username = $1 OR email = $2',
            [username, email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                message: 'Username or email already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
            [username, email, hashedPassword]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {

        console.log(err);
        res.status(500).send('Server Error');

    }

});

app.post('/login', async function(req,res){

    try{

        const email = req.body.email;
        const password = req.body.password;


        const result = await pool.query(

            'SELECT * FROM users WHERE email=$1',

            [email]

        );


        const user = result.rows[0];


        if(!user){

            return res.status(404).send("User not found");

        }



        const isMatch = await bcrypt.compare(

            password,

            user.password

        );


        if(!isMatch){

            return res.status(401).send("Wrong password");

        }



        const token = jwt.sign(

            {

                id:user.id,

                username:user.username

            },

            process.env.JWT_SECRET,

            {

                expiresIn:'7d'

            }

        );



        res.json({

            token:token

        });



    }


    catch(err){

        console.log(err);

        res.status(500).send("Server Error");

    }


});

app.listen(5000, function() {
    console.log('Server running on port 5000');
});
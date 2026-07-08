require('dotenv').config();

console.log("Seed script started");

const { Pool } = require('pg');
const postsData = require('./postsData');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function seedPosts() {

    try {

        for (const post of postsData) {

            await pool.query(

                `INSERT INTO posts
                (title, content, author, community_id)

                VALUES

                ($1, $2, $3, $4)`,

                [
                    post.title,
                    post.content,
                    post.createdBy,
                    post.communityId
                ]

            );

            console.log('Seeded:', post.title);

        }

        console.log('Finished seeding.');

        process.exit();

    }

    catch(err) {

        console.log(err);

    }

}

seedPosts();
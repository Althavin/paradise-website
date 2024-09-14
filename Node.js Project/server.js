app.use(express.json());
require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
    

// Connect to the database
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'yourpassword', // Replace with your MySQL root password
    database: 'blogDB'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the MySQL database');
});

//Connect a Table for Blogposts
db.query(`
    CREATE TABLE IF NOT EXISTS blogPosts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        author VARCHAR(100),
        category VARCHAR(100),
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        images TEXT
    );
`, (err, result) => {
    if (err) throw err;
    console.log('Blog posts table created or already exists');
});

//Create a new blogpost
app.post('/api/blogposts', (req, res) => {
    const { title, content, author, category, images } = req.body;
    const sql = `
        INSERT INTO blogPosts (title, content, author, category, images)
        VALUES (?, ?, ?, ?, ?)
    `;
    const values = [title, content, author, category, images];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting blog post:', err.stack);
            res.status(500).send('Error inserting blog post');
            return;
        }
        res.status(200).send('Blog post created');
    });
});

//Retrieve All Blogposts
app.get('/api/blogposts', (req, res) => {
    const sql = 'SELECT * FROM blogPosts';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving blog posts:', err.stack);
            res.status(500).send('Error retrieving blog posts');
            return;
        }
        res.status(200).json(results);
    });
});

//Create an Admin Table (SQL)
db.query(`
    CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    );
`, (err, result) => {
    if (err) throw err;
    console.log('Admin table created or already exists');
});
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new admin into the database
    db.query(
        'INSERT INTO admins (username, password) VALUES (?, ?)',
        [username, hashedPassword],
        (err, result) => {
            if (err) {
                console.error('Error registering admin:', err.stack);
                res.status(500).send('Error registering admin');
                return;
            }
            res.status(201).send('Admin registered');
        }
    );
});

//Admin login route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Find the admin by username
    db.query('SELECT * FROM admins WHERE username = ?', [username], async (err, results) => {
        if (err) {
            console.error('Error retrieving admin:', err.stack);
            res.status(500).send('Error retrieving admin');
            return;
        }

        if (results.length === 0) {
            return res.status(401).send('Invalid credentials');
        }

        const admin = results[0];

        // Compare the password
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        // Generate a JWT token
        const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    });
});

//Create Authentication middleware
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).send('A token is required for authentication');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }

    return next();
};

//Apply authentication middleware
app.post('/api/blogposts', authenticateToken, (req, res) => {
    // Code to create a blog post
});

app.get('/api/blogposts', authenticateToken, (req, res) => {
    // Code to retrieve blog posts
});


//
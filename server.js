const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const { v4: uuidv4 } = require('uuid'); // Import uuid for unique IDs
const cors = require('cors'); // Import cors

const app = express();

// Enable CORS for specific origin (localhost:5500)
const corsOptions = {
    origin: 'http://127.0.0.1:5500', // Allow requests from this origin
    methods: ['GET', 'POST', 'DELETE'], // Allow specific methods
    allowedHeaders: ['Content-Type'], // Allow specific headers
};

app.use(cors(corsOptions)); // Apply CORS middleware

app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data storage
let users = [];
let notes = [];
let passwords = [];

// Routes
app.post('/validate-user', (req, res) => {
    const { userId } = req.body;
    const user = users.find(u => u.userId === userId);
    if (!user) {
        return res.status(401).json({ message: 'Invalid user ID' });
    }
    res.status(200).json({ message: 'User validated' });
});

// Register User
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Check if username already exists
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = uuidv4(); // Generate a unique userId
    users.push({ userId, username, password: hashedPassword });
    res.json({ userId });
});

// Login User
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Find the user
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ userId: user.userId });
});

app.get('/notes/:userId', (req, res) => {
    const { userId } = req.params;
    const userNotes = notes.filter(note => note.userId === userId);
    res.json(userNotes);
});

app.post('/notes', (req, res) => {
    const { userId, content } = req.body;
    notes.push({ userId, content, id: uuidv4() });
    res.status(201).json({ message: 'Note saved' });
});

// Delete Note
app.delete('/notes/:noteId', (req, res) => {
    const { noteId } = req.params;
    notes = notes.filter(note => note.id !== noteId);
    res.status(200).json({ message: 'Note deleted' });
});

app.get('/passwords/:userId', (req, res) => {
    const { userId } = req.params;
    const userPasswords = passwords.filter(pw => pw.userId === userId);
    res.json(userPasswords);
});

app.post('/passwords', (req, res) => {
    const { userId, label, password } = req.body;
    passwords.push({ userId, label, password, id: uuidv4() });
    res.status(201).json({ message: 'Password saved' });
});

// Delete Password
app.delete('/passwords/:passwordId', (req, res) => {
    const { passwordId } = req.params;
    passwords = passwords.filter(pw => pw.id !== passwordId);
    res.status(200).json({ message: 'Password deleted' });
});

// Serve the HTML file for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));

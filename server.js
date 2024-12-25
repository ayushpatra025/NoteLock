const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data storage
let users = [];
let notes = [];
let passwords = [];

// Routes
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const userId = Date.now().toString();
    users.push({ userId, username, password });
    res.json({ userId });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) return res.json({ userId: user.userId });
    res.status(401).json({ message: 'Invalid credentials' });
});

app.get('/notes/:userId', (req, res) => {
    const { userId } = req.params;
    const userNotes = notes.filter(note => note.userId === userId);
    res.json(userNotes);
});

app.post('/notes', (req, res) => {
    const { userId, content } = req.body;
    notes.push({ userId, content, id: Date.now().toString() });
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
    passwords.push({ userId, label, password, id: Date.now().toString() });
    res.status(201).json({ message: 'Password saved' });
});

// Delete Note
app.delete('/notes/:noteId', (req, res) => {
    const { noteId } = req.params;
    notes = notes.filter(note => note.id !== noteId);
    res.status(200).json({ message: 'Note deleted' });
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

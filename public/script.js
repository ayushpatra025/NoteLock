document.addEventListener('DOMContentLoaded', async () => {
    const API_BASE_URL = 'http://localhost:5000'; // Update with your backend URL

    // DOM Elements
    const authSection = document.getElementById('auth-section');
    const notesSection = document.getElementById('notes-section');
    const passwordsSection = document.getElementById('passwords-section');

    const registerBtn = document.getElementById('register-btn');
    const loginBtn = document.getElementById('login-btn');
    const saveNoteBtn = document.getElementById('save-note');
    const savePasswordBtn = document.getElementById('save-password');

    const notesList = document.getElementById('notes-list');
    const passwordsList = document.getElementById('passwords-list');

    let userId = localStorage.getItem('userId');

    // Validate User ID with Backend
    const validateUser = async () => {
        if (!userId) return false;

        try {
            const response = await fetch(`${API_BASE_URL}/validate-user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId }),
            });

            if (!response.ok) throw new Error('User validation failed');
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const isAuthenticated = await validateUser();
    if (!isAuthenticated) {
        // Clear invalid userId from localStorage and redirect to auth section
        localStorage.removeItem('userId');
        userId = null;
    }

    // Show/Hide Sections Based on Authentication
    const toggleSections = (isAuthenticated) => {
        authSection.classList.toggle('hidden', isAuthenticated);
        notesSection.classList.toggle('hidden', !isAuthenticated);
        passwordsSection.classList.toggle('hidden', !isAuthenticated);
    };

    toggleSections(isAuthenticated);

    // Register User
    registerBtn.addEventListener('click', async () => {
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Registration failed.');
            }

            const data = await response.json();
            localStorage.setItem('userId', data.userId);
            alert('Registration successful!');
            window.location.reload();
        } catch (err) {
            alert('Registration failed. Try again.');
        }
    });

    // Login User
    loginBtn.addEventListener('click', async () => {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed.');
            }

            const data = await response.json();
            localStorage.setItem('userId', data.userId);
            alert('Login successful!');
            window.location.reload();
        } catch (err) {
            alert('Login failed. Try again.');
        }
    });

    // Fetch Notes
    const fetchNotes = async () => {
        const response = await fetch(`${API_BASE_URL}/notes/${userId}`);
        const notes = await response.json();

        notesList.innerHTML = '';
        notes.forEach(note => {
            const li = document.createElement('li');
            li.textContent = note.content;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', async () => {
                await deleteNote(note.id);
                fetchNotes();
            });
            li.appendChild(deleteBtn);
            notesList.appendChild(li);
        });
    };

    // Delete Note
    const deleteNote = async (noteId) => {
        try {
            await fetch(`${API_BASE_URL}/notes/${noteId}`, {
                method: 'DELETE',
            });
        } catch (err) {
            alert('Failed to delete note.');
        }
    };

    // Save Note
    saveNoteBtn.addEventListener('click', async () => {
        const noteInput = document.getElementById('note-input').value;

        if (!noteInput.trim()) {
            alert('Please enter a note before saving.');
            return;
        }

        try {
            await fetch(`${API_BASE_URL}/notes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, content: noteInput }),
            });
            fetchNotes();
            document.getElementById('note-input').value = '';
        } catch (err) {
            alert('Failed to save note.');
        }
    });

    // Fetch Passwords
    const fetchPasswords = async () => {
        const response = await fetch(`${API_BASE_URL}/passwords/${userId}`);
        const passwords = await response.json();

        passwordsList.innerHTML = '';
        passwords.forEach(password => {
            const li = document.createElement('li');

            const passwordLabel = document.createElement('span');
            passwordLabel.textContent = `${password.label}: `;

            const passwordInput = document.createElement('input');
            passwordInput.type = 'password';
            passwordInput.value = password.password;
            passwordInput.classList.add('password-input');

            const showHideBtn = document.createElement('button');
            showHideBtn.textContent = 'Show';
            showHideBtn.addEventListener('click', () => {
                togglePasswordVisibility(passwordInput, showHideBtn);
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', async () => {
                await deletePassword(password.id);
                fetchPasswords();
            });

            li.appendChild(passwordLabel);
            li.appendChild(passwordInput);
            li.appendChild(showHideBtn);
            li.appendChild(deleteBtn);
            passwordsList.appendChild(li);
        });
    };

    // Toggle Password Visibility
    const togglePasswordVisibility = (passwordInput, button) => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            button.textContent = 'Hide';
        } else {
            passwordInput.type = 'password';
            button.textContent = 'Show';
        }
    };

    // Delete Password
    const deletePassword = async (passwordId) => {
        try {
            await fetch(`${API_BASE_URL}/passwords/${passwordId}`, {
                method: 'DELETE',
            });
        } catch (err) {
            alert('Failed to delete password.');
        }
    };

    // Save Password
    savePasswordBtn.addEventListener('click', async () => {
        const label = document.getElementById('password-label').value;
        const passwordInput = document.getElementById('password-input').value;

        if (!label.trim() || !passwordInput.trim()) {
            alert('Please enter both a label and a password before saving.');
            return;
        }

        try {
            await fetch(`${API_BASE_URL}/passwords`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, label, password: passwordInput }),
            });
            fetchPasswords();
            document.getElementById('password-label').value = '';
            document.getElementById('password-input').value = '';
        } catch (err) {
            alert('Failed to save password.');
        }
    });

    // Fetch Notes and Passwords on Load
    if (isAuthenticated) {
        fetchNotes();
        fetchPasswords();
    }
});

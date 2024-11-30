const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB Connection
mongoose
    .connect(
        'mongodb+srv://labradorsummershine:labradorsummershine123456789@finalproject.pvc9k.mongodb.net/myDatabase?retryWrites=true&w=majority'
    )
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    fullName: String,
    username: String,
    email: String,
    password: String,
});
const User = mongoose.model('User', userSchema);

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/testmongoDB/member.html');
});

// Register Endpoint
app.post('/register', async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email is already registered.');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).send('User registered successfully!');
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).send('Error registering user: ' + err.message);
    }
});

// Login Endpoint
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Invalid email or password.');
        }

        // Compare hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid email or password.');
        }

        res.send('Login successful!');
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).send('Error logging in: ' + err.message);
    }
});

// Debugging: Log all users in the database
User.find().then((users) => console.log('All users in the database:', users));

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

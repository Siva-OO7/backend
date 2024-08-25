const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON

// POST /bfhl - Process the input data
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, error: 'Invalid input' });
    }

    const user_id = 'john_doe_17091999'; // Hardcoded for now
    const email = 'john@xyz.com'; // Hardcoded for now
    const roll_number = 'ABCD123'; // Hardcoded for now
    const numbers = [];
    const alphabets = [];
    let highest_lowercase = null;

    // Iterate over the input data
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string') {
            alphabets.push(item);

            if (item >= 'a' && item <= 'z') {
                if (!highest_lowercase || item > highest_lowercase) {
                    highest_lowercase = item;
                }
            }
        }
    });

    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highest_lowercase ? [highest_lowercase] : []
    });
});

// GET /bfhl - Return operation code
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

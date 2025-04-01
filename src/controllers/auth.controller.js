const db = require('../config/mysql');
const bcrypt = require('bcrypt');


module.exports.Register = async (req, res) => {
    const { email, password } = req.body;

    try {
        db.query('SELECT * FROM users', (err, results) => {
            const user = results.find((user) => user.email === email);
            if (user) return res.status(400).json({ message: "User already exists" });

            bcrypt.hash(password, 10, (err, hash) => {
                const sql = `INSERT INTO users (email, password) VALUES (?, ?)`;
                db.query(sql, [email, hash], (err, results) => {
                    if (err) {
                        console.error("Error inserting user:", err);
                        return res.status(500).json({ message: "Error inserting user" });
                    }
                    res.status(201).json({ message: "User created successfully", userId: results.insertId });
                });
            });
        });
    }
    catch (ex) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports.Login = async (req,res )=> {
    const {email, password} = req.body;

    try {
        db.query('SELECT * FROM users', (err, results) => {
            const users = results;

            const user = users.find((user) => user.email === email);
            console.log(user);
            if(!user) return res.status(400).json({ message: "Invalid credentials" });

            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    console.error("Error password :", err);
                    return res.status(500).json({ message: "Invalid credentials" });
                }

                if (result) {
                    return res.status(200).json({ message: "Login successful", user });
                } else {
                    return res.status(401).json({ message: "Invalid credentials" });
                }
            });
        });
    }
    catch (ex) {
        res.status(500).json({ message: "Server error" });
    }
}

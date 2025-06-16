const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./connection'); 
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/create', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  connection.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error('Error inserting into database:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.status(200).json({ message: 'User created successfully', userId: result.insertId });
  });
});
app.delete('/delete', (req, res) => {
  const { users_id } = req.body;

  if (!users_id) {
    return res.status(400).json({ message: 'Missing user ID' });
  }

  const sql = 'DELETE FROM users WHERE users_id = ?';
  connection.query(sql, [users_id], (err, result) => {
    if (err) {
      console.error('Error deleting from database:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  });
});
app.put('/update', (req, res) => {
  const { users_id, password } = req.body;

  if (!users_id || !password) {
    return res.status(400).json({ message: 'Missing user ID or password' });
  }

  const sql = 'UPDATE users SET password = ? WHERE users_id = ?';
  connection.query(sql, [password, users_id], (err, result) => {
    if (err) {
      console.error('Error updating database:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully' });
  });
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

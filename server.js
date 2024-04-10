const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Song!4736251',
  database: 'teagarden'
});

// Middleware to set CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/getrecords', (req, res) => {
  connection.query('SELECT name, date, weight FROM records', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error retrieving data');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('No data found');
      return;
    }
    res.json(results);
  });
});

// Close the connection when the server is closed
app.on('close', () => {
  connection.end(err => {
    if (err) {
      console.error('Error closing MySQL connection: ', err);
      return;
    }
    console.log('MySQL connection closed');
  });
});

const server = app.listen(3300, () => {
  console.log('Server is running on port 3300 http://localhost:3300/getrecords');
});



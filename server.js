const express = require('express')
const mysql = require('mysql2');

// Establishing connection with database

const connection = mysql.createConnection({
    host: 'arre_server',
    user: 'arre_admin',
    password: 'wav_over_mp3',
    database: 'whatsapp_group_chat'
  });
connection.connect();

// Using express.js to make a basic server
const app = express()
const port = 3000

// Due to time constraints I am assuming that the phone number, group etc have already been created.

app.post('/newMessage', (req, res) => {
    // Getting a post request from a newMessage page to enter the new message into the database.
    const { phone_number, group_id, message_text } = req.body;
    const sql = `INSERT INTO messages (phone_number, group_id, message_name) VALUES ('${phone_number}', ${group_id}, '${message_text}')`;
    connection.query(sql, (error, results) => {
      if (error) throw error;
      res.status(200).send('Message added successfully.');
      // add a redirection to viewMessages if successful
    });
  });

app.get('/viewMessages', (req, res) => {
    const group_id = req.query.group_id;
    const phone_number = req.query.phone_number;

    // Validate if user is in group by checking in access table
    // which will have all group_id and corresponding phone_numbers in the table.
    // if the phone_number does have access to the group, continue

    // Using the SQL function to create a message view for the user
    // in a given Group
    const sql = `SELECT * FROM group_chat_view('${group_id}')`;
    connection.query(sql, (error, results) => {
      if (error) throw error;
      // else here we show the messages from the group chat
    });
  });


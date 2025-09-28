// backend.js
 /*const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Bot API
app.post('/api/predict', (req, res) => {
    const text = req.body.text.toLowerCase();
    let message = "Sorry, I don't understand 😅";

    // Bot logic
    if (text.includes('hi')) {
        message = "Hello Abhi";
    } 
    else if (text.includes('bro kya hal chal')) {
        message = "Me bedeya bhaye! Tu suna apne 😄";
    } 
    else if (text.includes('how are you')) {
        message = "I'm fine, thanks for asking! 😄";
    }

    res.json({ message });
});

// Serve HTML + CSS directly
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Abhi's Chat Bot</title>
<style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: Arial; }
    body { height: 100vh; display: flex; justify-content: center; align-items: center; background: #000; }
    #chat-container { width: 100%; max-width: 500px; height: 90vh; background: #111; border-radius: 15px; box-shadow: 0 5px 20px rgba(0,0,0,0.5); display: flex; flex-direction: column; overflow: hidden; }
    #bot-header { text-align: center; color: #00ffea; font-size: 32px; font-weight: bold; font-family: 'Verdana', sans-serif; margin: 15px 0; }
    #messages { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; }
    .message { max-width: 80%; padding: 15px 20px; border-radius: 20px; line-height: 1.4; word-wrap: break-word; color: white; }
    .user { align-self: flex-end; background: #007bff; color: white; border-bottom-right-radius: 0; }
    .bot { align-self: flex-start; background: #333; color: #fff; border-bottom-left-radius: 0; }
    #input-area { display: flex; padding: 15px; border-top: 1px solid #444; }
    #userInput { flex: 1; padding: 15px 20px; border-radius: 25px; border: 1px solid #555; outline: none; font-size: 16px; background: #222; color: white; }
    button { padding: 15px 25px; margin-left: 10px; border-radius: 25px; border: none; background: #28a745; color: white; cursor: pointer; font-size: 16px; transition: background 0.3s; }
    button:hover { background: #218838; }
</style>
</head>
<body>
<div id="chat-container">
    <div id="bot-header">Abhi Chat Bot</div>
    <div id="messages"></div>
    <div id="input-area">
        <input type="text" id="userInput" placeholder="Type a message..." onkeypress="if(event.key==='Enter'){sendMessage()}"/>
        <button onclick="sendMessage()">Send</button>
    </div>
</div>

<script>
const messagesDiv = document.getElementById('messages');
const input = document.getElementById('userInput');
const header = document.getElementById('bot-header');

async function sendMessage() {
    const userText = input.value.trim();
    if(!userText) return;

    // Hide header on first message
    if(header.style.display !== 'none') {
        header.style.display = 'none';
    }

    // Show user message
    const userMsg = document.createElement('div');
    userMsg.classList.add('message','user');
    userMsg.textContent = userText;
    messagesDiv.appendChild(userMsg);
    input.value = '';
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // Send to backend
    try {
        const response = await fetch('/api/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: userText })
        });
        const data = await response.json();

        // Show bot message
        const botMsg = document.createElement('div');
        botMsg.classList.add('message','bot');
        botMsg.textContent = data.message;
        messagesDiv.appendChild(botMsg);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    } catch(err) {
        console.error(err);
    }
}
</script>
</body>
</html>
    `);
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
*/


 /*const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

// Serve login page directly from server
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Login Page</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: linear-gradient(to right, #74ebd5, #ACB6E5);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .container {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 0 15px rgba(0,0,0,0.2);
          width: 300px;
          text-align: center;
        }
        input {
          width: 90%;
          padding: 10px;
          margin: 10px 0;
          border-radius: 8px;
          border: 1px solid #ccc;
        }
        button {
          padding: 10px 20px;
          border: none;
          background-color: #6C63FF;
          color: white;
          border-radius: 8px;
          cursor: pointer;
        }
        button:hover { background-color: #5952d4; }
        .forgot { margin-top: 10px; }
        #forgotBtn { color: #6C63FF; cursor: pointer; text-decoration: underline; }
        .forgot-box { display: none; margin-top: 20px; }
        #msg { margin-top: 10px; color: green; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Login</h2>
        <input type="email" id="loginEmail" placeholder="Email">
        <input type="password" id="loginPassword" placeholder="Password">
        <button id="loginBtn">Login</button>
        <p class="forgot">Forgot Password? <span id="forgotBtn">Click here</span></p>
        <div class="forgot-box" id="forgotBox">
          <h3>Reset Password</h3>
          <input type="email" id="forgotEmail" placeholder="Email">
          <input type="password" id="newPassword" placeholder="New Password">
          <button id="resetBtn">Reset Password</button>
          <p id="msg"></p>
        </div>
      </div>
      <script>
        const forgotBtn = document.getElementById('forgotBtn');
        const forgotBox = document.getElementById('forgotBox');
        const resetBtn = document.getElementById('resetBtn');
        const msg = document.getElementById('msg');

        forgotBtn.addEventListener('click', () => {
          forgotBox.style.display = forgotBox.style.display === 'block' ? 'none' : 'block';
        });

        resetBtn.addEventListener('click', async () => {
          const email = document.getElementById('forgotEmail').value;
          const newPassword = document.getElementById('newPassword').value;

          const res = await fetch('/forgot-password', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, newPassword })
          });

          const text = await res.text();
          msg.textContent = text;
        });
      </script>
    </body>
    </html>
  `);
});

// PUT route for forgot password
app.put('/forgot-password', (req, res) => {
  const { email, newPassword } = req.body;

  let users = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  let user = users.find(u => u.email === email);

  if (!user) return res.status(404).send("User not found");
,
  user.password = newPassword;
  fs.writeFileSync('data.json', JSON.stringify(users, null, 2));

  res.send("Password updated successfully!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
*/

 /*const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("camera-stream", (data) => {
        console.log("Camera data received", data.length);
        // You can broadcast to other clients if needed
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(3000, () => console.log("Server running on http://localhost:3000"));
*/

/*const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS for all origins
app.use(cors());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Parse JSON body
app.use(bodyParser.json());

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// POST /register route
app.post('/register', (req, res) => {
    const { number, password } = req.body;

    // Check empty fields
    if (!number || !password) {
        return res.status(400).send('Error: Both number and password are required!');
    }

    // Number validation
    const numberRegex = /^\d{10}$/;
    if (!numberRegex.test(number)) {
        return res.status(400).send('Error: Number must be exactly 10 digits.');
    }

    // Password validation
    if (password.length < 8) {
        return res.status(400).send('Error: Password must be at least 8 characters.');
    }

    // Read existing users
    const usersPath = path.join(__dirname, 'users.json');
    let users = [];
    if (fs.existsSync(usersPath)) {
        users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
    }

    // Save new user
    users.push({ number, password });
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

    res.send('User saved successfully!');
});

// Start server
app.listen(PORT, () => {
	    console.log(`Server running at http://localhost:${PORT}`);
});
*/


onst express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const usersPath = path.join(__dirname, 'users.json');

// POST /register route
app.post('/register', (req, res) => {
    const { number, password } = req.body;

    if (!number || !password) {
        return res.status(400).send('Error: Both number and password are required!');
    }
    if (!/^\d{10}$/.test(number)) {
        return res.status(400).send('Error: Number must be exactly 10 digits.');
    }
    if (password.length < 8) {
        return res.status(400).send('Error: Password must be at least 8 characters.');
    }

    // Read existing users
    let users = [];
    if (fs.existsSync(usersPath)) {
        users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
    }

    // Duplicate check
    if (users.find(u => u.number === number)) {
        return res.status(400).send('Error: This number is already registered!');
    }

    // Save new user
    users.push({ number, password });
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

    res.send('User saved successfully!');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


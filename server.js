/* const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.get('/',(req,res) => {
res.send('backend server are running sucessfully................................................................................................................................................ ');
}
);
app.listen(PORT,() => {
console.log('server listen in 3000 port');
}
);

 /*const express = require('express');
const app = express();
const PORT =3000;

app.use(express.json());
const accounts = [
{id:1,username:'Abhishek',password :'2345'},
{id:2,username:'neha',password :'7890'}
];
app.get('/login',(req,res) => {
res.send('welcome to the backend server');
}
);
app.post('/login',(req,res) => {
const {usenname,password} = req.body;

const user = account.find(
acc=> acc.username===username &&
acc.password === password);

if(user) {
res.json({status:'sucess',message:'login sucessfully for username'});
}else{
res.json({status:'fail',message:'invalid username or password'});
}
});
app.listen(3000,() =>{
console.log('server running in local host 3000');
});*/

 /*const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

app.get('/',(req,res) => {
res.send(`<!DOCTYPE html>
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
    button:hover {
      background-color: #5952d4;
    }
    .forgot {
      margin-top: 10px;
    }
    #forgotBtn {
      color: #6C63FF;
      cursor: pointer;
      text-decoration: underline;
    }
    .forgot-box {
      display: none;
      margin-top: 20px;
    }
    #msg {
      margin-top: 10px;
      color: green;
    }
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
  
</body>
</html>
<script>
const forgotBtn = document.getElementById('forgotBtn');
const forgotBox = document.getElementById('forgotBox');
const resetBtn = document.getElementById('resetBtn');
const msg = document.getElementById('msg');

forgotBtn.addEventListener('click',() => {
forgotBox.style.display = forgotBox.style.display === 'block'?'none': 'block';
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


app.put('/forgot-password', (req, res) => {
  const { email, newPassword } = req.body;
let users = JSON.parse(fs.readFileSync('data.json','utf8'));
let user = users.find(u => u.email === email);
if(!user) return  res.status(404).send('user not found');

user.password = newPassword;
fs.writeFileSync('data.json',JSON.stringify(users,null,2));
res.send('password updated successfully');
});
app.listen(3000,() => {
console.log('server running port 3000');
});*/

 /*const express = require('express');
const app = express();
const PORT = 5000;

// Fruits API
app.get('/api/fruits', (req, res) => {
  const fruits = ["Apple", "Banana", "Mango", "Orange", "Pineapple"];
  res.json(fruits);
});

app.listen(PORT, () => {
console.log("local host running in port 3000");
});*/

 /*const bcrypt = require('bcryptjs');   // yaha change kiya
const express = require('express');
const app = express();
app.use(express.json());

// Ye functions users read/save karne ke liye
const fs = require('fs');
const path = './users.json';

function readUsers() {
  if (!fs.existsSync(path)) return [];
  return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

function saveUsers(users) {
  fs.writeFileSync(path, JSON.stringify(users, null, 2));
}

// Signup route
app.post('/signup', (req, res) => {
  const { number, password } = req.body;

  if (!/^\d{10}$/.test(number)) {
    return res.status(400).json({ message: 'Number must be exactly 10 digits' });
  }

  if (!password || password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' });
  }

  let users = readUsers();
  if (users.find(u => u.number === number)) {
    return res.status(400).json({ message: 'Number already exists' });
  }

  const hashed = bcrypt.hashSync(password, 8); // bcryptjs bhi same hai
  users.push({ number, password: hashed });
  saveUsers(users);

  res.json({ message: 'Signup successful' });
});

// ✅ Login route
app.post('/login', (req, res) => {
  const { number, password } = req.body;

  let users = readUsers();
  const user = users.find(u => u.number === number);
  if (!user) {
    return res.status(400).json({ message: 'Number not found' });
  }

  const isMatch = bcrypt.compareSync(password, user.password); // bcryptjs bhi same tarike se kaam karta hai
  if (!isMatch) {
    return res.status(400).json({ message: 'Password incorrect' });
  }

nom  res.json({ message: 'Login successful' });
});

// Server start
app.listen(5000, () => console.log('Server running on port 5000'));
*/


 /*const express = require('express');
const app = express();
const PORT = 5000;

app.get('/start', (req, res) => {
    res.json({ message: "Welcome to backend server" });
});

app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});*/

 /*const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const filePath = './users.json';


function readUsers() {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file:', err);
        return [];
    }
}

function writeUsers(users) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    } catch (err) {
        console.error('Error writing file:', err);
    }
}


app.get('/users', (req, res) => {
    const users = readUsers();
    res.json(users);
});


app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    let users = readUsers();

    const userExists = users.some(user => user.id === userId);
    if (!userExists) {
        return res.status(404).json({ message: 'User not found.' });
    }

    users = users.filter(user => user.id !== userId);
    writeUsers(users);
    res.json({ message: `User with ID ${userId} deleted.` });
});


app.listen(5000, () => {
    console.log('Backend server running on http://localhost:5000');
});*/

 /*const express = require('express');
const cors = require('cors'); // cors package import karo
const app = express();
const port = 5000;

app.use(cors()); // sabhi origin se requests allow karo
app.use(express.json());

let users = [{ id: 1, name: 'Jk' }];

app.get('/users', (req, res) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});*/


 /*const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

const usersFile = path.join(__dirname, 'users.json');

// Auto-create users.json if missing
if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify([]), 'utf-8');
}

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname));

// Load users from JSON
function loadUsers() {
    const data = fs.readFileSync(usersFile, 'utf-8');
    return JSON.parse(data);
}

// Save users to JSON
function saveUsers(data) {
    fs.writeFileSync(usersFile, JSON.stringify(data, null, 4), 'utf-8');
}

app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email format!" });
    }

    if (password.length !== 8) {
        return res.status(400).json({ success: false, message: "Password must be exactly 8 characters long!" });
    }

    const users = loadUsers();

    const existingUser = users.find(user => user.username.toLowerCase() === username.toLowerCase());
    if (existingUser) {
        return res.status(400).json({ success: false, message: "Username already taken!" });
    }

    users.push({ username, email, password });
    saveUsers(users);

    res.json({ success: true, message: "Account created for " + username + "!" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
*/
// serve
// server.js
const express = require('express');
const app = express();
const path = require('path');

// Serve frontend folder
app.use(express.static(path.join(__dirname, 'frontend')));

// Frontend runs on port 3001
app.listen(3000, () => console.log('Frontend running at http://localhost:3001'));

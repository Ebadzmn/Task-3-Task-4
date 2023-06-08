const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
require("dotenv").config();
// const secretKey = 'your-secret-key';




// Function to generate JWT token
function generateToken(userId) {
  const payload = {
    userId: userId
  };

  const options = {
    expiresIn: '1h' // Token expiration time
  };

  const token = jwt.sign(payload, process.env.KEY, options);
  return token;
}




// Route to generate a token for a specific user
app.get('/generate-token/:userId', (req, res) => {
  const userId = req.params.userId;
  const token = generateToken(userId);

  res.json({ status:"userID done",token: token });
});






//verify token

function authenticate (req, res, next){
  try {
      const decoded = jwt.verify(
          req.headers.authorization,
          process.env.KEY
      );

      req.userId = decoded;
      next();
  } catch (err) {
      return res.status(401).json(err);
  }
};





app.get('/protected', authenticate, (req, res) => {
res.json({ok :"Done Token True"})
  });
  




// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

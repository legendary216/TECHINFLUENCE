
const express = require('express');
const { register, login, logout,getuser } = require('../controllers/authControllers');
const router = express.Router();
const {uploadPNG} = require('../middleware/multerMiddleware')

router.post("/register", uploadPNG, register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/candidates/:id',getuser)

module.exports = router; 





 




// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// const router = express.Router(); //can have multiple routes attached to it
// require('dotenv').config();

// // Register Route
// router.post('/register', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
    
    
//     let user = await User.findOne({ email });
    
    
//     if (user) return res.status(400).json({ msg: 'User already exists' });
    
//     const salt = await bcrypt.genSalt(10); //creates a random string with 2^10 iterations
//     const hashedPassword = await bcrypt.hash(password, salt);//creates a hashed passward using salt and passward
//     console.log(user);
    
//     user = new User({ name, email, password: hashedPassword }); //creates a new user objects
//     await user.save();//saves the object in DB

//     res.status(201).json({ msg: 'User registered successfully' });
//   } catch (error) {
//     console.error("Error in /register:", error); // More detailed error logging
//     res.status(500).json({ error: error.message || 'Server error' });
//   } 
// });

// // Login Route
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     let user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Logout Route
// router.post('/logout', (req, res) => {
//   res.json({ msg: 'Logged out successfully' });
// });

// module.exports = router;



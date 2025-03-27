const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');



// exports.register = async (req, res) => {
//     try {
//       const { name, email, password, role, phoneNumber, address, profilePicture } = req.body;
  
//       // Validate required fields
//       if (!name || !email || !password || !role) {
//         return res.status(400).json({ msg: 'Please provide all required fields' });
//       }
  
//       let user = await User.findOne({ email });
//       if (user) return res.status(400).json({ msg: 'User already exists' });
  
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(password, salt);
  
//       user = new User({
//         name,
//         email,
//         password: hashedPassword,
//         role, // Ensure role is either 'candidate' or 'employer'
//         phoneNumber,
//         address,
//         profilePicture
//       });
  
//       await user.save();
  
//       res.status(201).json({ msg: 'User registered successfully', user: { id: user._id, name, email, role } });
//     } catch (error) {
//       console.error("Register Error:", error);
//       res.status(500).json({ error: error.message || 'Server error' });
//     }
//   };
  
exports.register = async (req, res) => {
  try {
      const { name, email, password, role, phoneNumber, address } = req.body; // Removed profilePicture from body

      // Validate required fields
      if (!name || !email || !password || !role) {
          return res.status(400).json({ msg: 'Please provide all required fields' });
      }

      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: 'User already exists' });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Get the uploaded file URL
      const profilePictureUrl = req.file ? `/uploads/profiles/${req.file.filename}` : null; // Store file path

      user = new User({
          name,
          email,
          password: hashedPassword,
          role, // Ensure role is either 'candidate' or 'employer'
          phoneNumber,
          address, 
          profilePicture: profilePictureUrl, // Store file URL instead of the actual file
      });

      await user.save();

      res.status(201).json({
          msg: 'User registered successfully',
          user: {
              id: user._id,
              name,
              email,
              role,
              profilePicture: profilePictureUrl, // Return the URL
          }
      });
  } catch (error) {
      console.error("Register Error:", error);
      res.status(500).json({ error: error.message || 'Server error' });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.logout = (req, res) => {
  res.json({ msg: 'Logged out successfully' });
};

const multer = require('multer');
const path = require('path');

// Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save PDF files in "uploads"
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// File Filter to Accept Only PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Only PDFs are allowed!'), false); // Reject file
  }
};

const pngStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profiles/"); // Store PNGs in 'uploads/profiles/'
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});


const fileFilterPNG = (req, file, cb) => {
  if (file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only PNG files are allowed!"), false);
  }
};

const uploadPNG = multer({ 
  storage: pngStorage,
   fileFilter: fileFilterPNG ,
   
  }).single('profileImage');

// Initialize Multer 
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB size limit
});

module.exports =  { upload, uploadPNG };

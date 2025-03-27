
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const docuementRoutes = require('./routes/documentsRoutes')
const backgroundCheckRoutes = require('./routes/backgroundCheckRoutes')
const VerificationStatusRoutes = require('./routes/verificationStatusRoutes')
const riskAssessmentRoutes = require('./routes/riskAssessmentRoutes')
const path = require('path');  
 

dotenv.config(); 
const app = express();

app.use('/uploads', express.static(path.join(__dirname,'uploads')));
 
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes); 
app.use('/api/documents', docuementRoutes);
app.use('/api/backgroundCheck',backgroundCheckRoutes)
app.use('/api/verificationStatus',VerificationStatusRoutes)
app.use('/api/RiskAssessment',riskAssessmentRoutes) 


    
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

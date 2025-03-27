
const Document = require('../models/documents.js');
const mongoose = require('mongoose')

exports.getcandidatedocument = async (req, res) => {
  try {
    // Fetch only the document IDs for the given candidateId
    const documents = await Document.find({ candidateId: req.params.candidateId })
      .select('_id') // Only selecting the document ID
      .sort({ createdAt: -1 });

    // Check if no documents are found
    if (!documents.length) {
      return res.status(404).json({ error: 'No documents found for this candidate' });
    }

    // Return only the document IDs in the response
    const documentIds = documents.map(doc => doc._id);

    // Respond with the array of document IDs
    res.json(documentIds);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
};

exports.getDocuments = async( req, res ) => {

  try{  

  const userDoc = await Document.findById(req.params.id)

  if(!userDoc) return res.status(404).json({msg: 'Doucement does not exist '})

    res.status(201).json({ message: 'Documents imoprted succesfu', userDoc });
      
  } catch(error){
    console.error('Error gettting document:', error);
    res.status(500).json({ error: 'Failed to Get document' });
  }
}

// Controller to submit a document SIngle pdf
// exports.submitDocument = async (req, res) => { 
//   try {
//     const { candidateId } = req.body;
    
//     const filePath = req.file ? req.file.path.replace(/\\/g, "/") : null;
    
//     if (!filePath) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }
//     console.log(filePath);
    
//     const newDocument = new Document({
//       candidateId,
//       filePath,
//       status: 'pending',
//     });

//     await newDocument.save();

//     res.status(201).json({ message: 'Document submitted successfully', newDocument });
//   } catch (error) {
//     console.error('Error submitting document:', error);
//     res.status(500).json({ error: 'Failed to submit document' });
//   }
// };

exports.submitDocument = async (req, res) => {
  try {
    const { candidateId } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    // Convert file paths into a list
    const uploadedDocuments = req.files.map((file) => ({
      candidateId,
      filePath: file.path.replace(/\\/g, "/"),
      status: "pending",
    }));

    // Save documents to the database
    const newDocuments = await Document.insertMany(uploadedDocuments);

    res.status(201).json({
      message: "Documents submitted successfully",
      documents: newDocuments,
    });
  } catch (error) {
    console.error("Error submitting documents:", error);
    res.status(500).json({ error: "Failed to submit documents" });
  }
};

// Controller to get document validation status
exports.getDocumentStatus = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);


    
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json(document);
  } catch (error) {
    console.error('Error fetching document status:', error);
    res.status(500).json({ error: 'Failed to fetch document status' });
  }
};

//npm i  tesseract.js      provides Optical Character Recognition (OCR) capabilities, allowing you to extract text from images within web browsers

const fs = require('fs');
const pdfParse = require('pdf-parse');
const path = require('path');




// const Tesseract = require('tesseract.js');
// const { fromPath } = require("pdf2pic");
// const { convert } = require("pdf2image");

// const extractTextUsingOCR = async (filePath) => {
//   try {
//     console.log(`Converting PDF (${filePath}) to image...`);
//     const images = await convert(filePath, { density: 300, format: "png" });

//     if (!images || images.length === 0) throw new Error("No images generated");

//     console.log(`Processing ${images[0]} with OCR...`);
//     const { data } = await Tesseract.recognize(images[0], "eng");
//     return data.text.trim();
//   } catch (error) {
//     console.error("OCR extraction failed:", error);
//     return "";
//   }
// };


const extractTextFromPDF = async (filePath) => {
  try{

    //const dataBuffer = fs.readFileSync(filePath); //Reads the file from disk (fs.readFileSync(filePath))
    //const pdfData = await pdfParse(dataBuffer);//Processes the file using pdf-parse
    //return pdfData.text; //Extracts text from the document
    const pdfData = await pdfParse(fs.readFileSync(filePath));
    if (pdfData.text.trim().length > 100) {
      
      return pdfData.text;
      
    } else {
      console.log('PDF seems to be image-based, using OCR...');
      return await extractTextUsingOCR(filePath);
    }
  }
catch (error) {
  console.error('Error extracting text with pdf-parse, using OCR:', error);
  return await extractTextUsingOCR(filePath);
}

};

const validateDocumentType = (text) => {
  const lowerText = text.toLowerCase(); // Convert everything to lowercase for case insensitivity

  if (
    lowerText.includes("passport") ||
    lowerText.includes("national id") ||
    lowerText.includes("id card") ||
    lowerText.includes("driver’s license")
  ) {
    return "ID Verification";
  }

  if (
    lowerText.includes("education") ||
    lowerText.includes("degree") ||
    lowerText.includes("diploma") ||
    lowerText.includes("work experience") ||
    lowerText.includes("employment") ||
    lowerText.includes("resume") ||
    lowerText.includes("cv")
  ) {
    return "Employment History";
  }

  if (
    lowerText.includes("criminal record") ||
    lowerText.includes("court case") ||
    lowerText.includes("police report") ||
    lowerText.includes("background check")
  ) {
    return "Criminal Record";
  }

  return "Unknown";
};




// Controller to validate a document
exports.validateDocument = async (req, res) => {
  try {
 
    const { id } = req.params;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid document ID format' });
    }

    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

     // Get full file path
     const filePath = path.join(__dirname, '..', document.filePath);
     console.log(filePath);
     
    //__dirname is a built-in Node.js variable that represents the absolute path of the directory where the current script is located.
    //'..' means go up one directory.
     // Extract text from PDF
     const extractedText = await extractTextFromPDF(filePath);
    console.log("extracted text : ",extractedText);
    
     // Validate document type
     const detectedType = validateDocumentType(extractedText);
     console.log("detected type : ",detectedType );
     
     if (detectedType === "Unknown") {
       document.status = 'failed';
       document.validationDetails = { success: false, reason: 'Invalid document type' };
     } else {
       document.status = 'validated';
       //document.validationDetails = { success: true, type: detectedType };
     }

    
     document.validatedAt = new Date();
    await document.save();

    res.json({ message: 'Document validated successfully', document });
  } catch (error) {
    console.error('Error validating document:', error);
    res.status(500).json({ error: 'Failed to validate document' });
  }
};

 
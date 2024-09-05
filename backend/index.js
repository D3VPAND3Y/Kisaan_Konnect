const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const multer = require('multer'); // For file upload
const path = require('path');
const onnx = require('onnxruntime-node');
const dotenv = require("dotenv");
const sharp = require('sharp');

dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// File Upload Configuration using Multer
const upload = multer({ dest: 'frontend/src/models' }); // Destination folder for file uploads

// Correct the path to model.onnx
const modelPath = path.join(__dirname, '../frontend/src/models/model.onnx');
console.log("Loading model from: ", modelPath); // Log the correct path

// Load ONNX Model
let session;
onnx.InferenceSession.create(modelPath)  // Ensure the path now points to the correct location in frontend/src/models
  .then((s) => {
    session = s;
    console.log('Model loaded successfully');
  })
  .catch((err) => {
    console.error('Failed to load model:', err);
  });

// Route for running ML Model
app.post('/predict', upload.single('image'), async (req, res) => {
  try {
    const inputPath = req.file.path; // File path for the uploaded image

    // Preprocess the image to convert it into a tensor
    const inputTensor = await preprocessImage(inputPath);

    // Update the tensor name to 'input.1', which your model is expecting
    const feeds = { 'input.1': inputTensor }; // Replace 'input.1' with the correct input tensor name
    const results = await session.run(feeds);

    // Extract the output tensor
    const outputTensor = results['18']; // Replace '18' with the actual output name from the model

    // Extract the data from the output tensor's cpuData field
    const outputData = outputTensor.cpuData;

    // Return prediction result to client
    res.json({ prediction: outputData });
  } catch (err) {
    console.error('Error running model:', err);
    res.status(500).json({ error: 'Prediction failed' });
  }
});

// Listen
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// Preprocess Image Function
async function preprocessImage(filePath) {
  // Read the image using sharp
  const imageBuffer = await sharp(filePath)
    .resize(150, 150) // Resize the image to 150x150, as expected by your model
    .raw() // Extract the raw pixel data
    .toBuffer(); // Convert the image to a buffer

  // Convert the image buffer (which is Uint8) to a Float32Array
  const floatArray = new Float32Array(imageBuffer.length);
  for (let i = 0; i < imageBuffer.length; i++) {
    floatArray[i] = imageBuffer[i] / 255.0; // Normalize pixel values between 0 and 1
  }

  // Create an ONNX Tensor from the Float32Array
  const tensor = new onnx.Tensor('float32', floatArray, [1, 3, 150, 150]); // Adjust dimensions to [1, 3, 150, 150]

  return tensor;
}
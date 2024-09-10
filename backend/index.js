const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const multer = require('multer'); // For file upload
const path = require('path');
const onnx = require('onnxruntime-node');
const dotenv = require("dotenv");
const sharp = require('sharp');
const {db} = require('./db');
const {userRoute} = require('./controllers/auth_controller')
const {productRoute} = require('./controllers/product_route')
const cartRoute = require('./controllers/cart_route')
const bodyParser = require('body-parser');
const axios = require('axios');

dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/",cartRoute)





const upload = multer({ dest: 'frontend/src/models' });

const modelPath = path.join(__dirname, '../frontend/src/models/model.onnx');
console.log("Loading model from: ", modelPath);

const cropPredictionPath = path.join(__dirname, '../frontend/src/models/Crop_prediction_no_zipmap.onnx');
const fertilizerPath = path.join(__dirname, '../frontend/src/models/random_forest_classifier.onnx');
console.log("Loading model from: ", cropPredictionPath);


let session;
onnx.InferenceSession.create(modelPath)
  .then((s) => {
    cropDiseaseSession = s;
    console.log('Crop Disease Model loaded successfully');
  })
  .catch((err) => {
    console.error('Failed to load Crop Disease model:', err);
  });

let cropSession;
onnx.InferenceSession.create(cropPredictionPath)
  .then((s) => {
    cropSession = s;
    console.log('Crop Prediction Model loaded successfully');
  })
  .catch((err) => {
    console.error('Failed to load Crop Prediction model:', err);
  });

let fertilizerSession;
onnx.InferenceSession.create(fertilizerPath)
  .then((s) => {
    fertilizerSession = s;
    console.log('Fertilizer Prediction Model loaded successfully');
  })
  .catch((err) => {
    console.error('Failed to load Fertilizer Prediction model:', err);
  });


  app.post('/predict-fertilizer', async (req, res) => {
    try {
      const formData = req.body;
      const response = await axios.post('https://kisaan-konnect-python-backend.onrender.com/predict-fertilizer', formData);
      res.json(response.data);
    } catch (error) {
      console.error('Error forwarding request:', error.message);
      res.status(500).json({ error: 'Prediction failed' });
    }
  });

app.post('/predict-crop', async (req, res) => {
  try {
      const response = await axios.post('https://kisaan-konnect-python-backend.onrender.com/predict-crop', req.body);
      console.log(response.data);
      res.json(response.data);
  } catch (error) {
      console.error('Error predicting crop:', error);
      res.status(500).json({ error: 'Prediction failed' });
  }
});




// Route for Crop Disease Prediction (using image input)
app.post('/predict-crop-disease', upload.single('image'), async (req, res) => {
  try {
    const inputPath = req.file.path;

    // Preprocess the image to convert it into a tensor
    const inputTensor = await preprocessImage(inputPath, [150, 150]); // Resize to 150x150

    const feeds = { 'input.1': inputTensor }; // Replace 'input.1' with the correct input tensor name
    const results = await cropDiseaseSession.run(feeds);

    const outputTensor = results['18']; // Replace '18' with the actual output name from the model
    const outputData = outputTensor.cpuData;

    res.json({ prediction: outputData });
  } catch (err) {
    console.error('Error running Crop Disease model:', err);
    res.status(500).json({ error: 'Prediction failed' });
  }
});

// Preprocess Image Function
async function preprocessImage(filePath, size) {
  // Read the image using sharp
  const imageBuffer = await sharp(filePath)
    .resize(size[0], size[1]) // Resize the image to the desired dimensions
    .raw() // Extract the raw pixel data
    .toBuffer(); // Convert the image to a buffer

  // Convert the image buffer (which is Uint8) to a Float32Array
  const floatArray = new Float32Array(imageBuffer.length);
  for (let i = 0; i < imageBuffer.length; i++) {
    floatArray[i] = imageBuffer[i] / 255.0; // Normalize pixel values between 0 and 1
  }

  // Create an ONNX Tensor from the Float32Array
  const tensor = new onnx.Tensor('float32', floatArray, [1, 3, size[0], size[1]]); // Adjust dimensions

  return tensor;
}

// Listen
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
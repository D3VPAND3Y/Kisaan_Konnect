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


dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

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

let session;
onnx.InferenceSession.create(modelPath)
  .then((s) => {
    cropDiseaseSession = s;
    console.log('Crop Disease Model loaded successfully');
  })
  .catch((err) => {
    console.error('Failed to load Crop Disease model:', err);
  });

// Route for Fertilizer Prediction
app.post('/predict-fertilizer', async (req, res) => {
  try {
    const { temperature, humidity, moisture, nitrogen, potassium, phosphorous } = req.body;

    // Create input tensor based on the received values
    const inputTensor = new onnx.Tensor('float32', Float32Array.from([
      temperature, humidity, moisture, nitrogen, potassium, phosphorous,
    ]), [1, 6]); // Adjust dimensions as per your model's input shape

    const feeds = { 'input.1': inputTensor }; // Make sure 'input.1' matches your model's input name
    const results = await fertilizerSession.run(feeds);
    const outputTensor = results['18']; // Adjust output tensor name if needed
    const outputData = outputTensor.cpuData;

    res.json({ prediction: outputData });
  } catch (err) {
    console.error('Error running Fertilizer model:', err);
    res.status(500).json({ error: 'Prediction failed' });
  }
});

// Route for Crop Prediction
app.post('/predict-crop', async (req, res) => {
  try {
    const { nitrogen, phosphorous, potassium, temperature, humidity, ph, rainfall } = req.body;

    // Create input tensor based on the received values
    const inputTensor = new onnx.Tensor('float32', Float32Array.from([
      nitrogen, phosphorous, potassium, temperature, humidity, ph, rainfall,
    ]), [1, 7]); // Adjust dimensions to [1, 7] based on model input shape

    const feeds = { 'input.1': inputTensor }; // Adjust 'input.1' based on model's input name
    const results = await cropSession.run(feeds);
    const outputTensor = results['output_label']; // Adjust output tensor name based on your model
    const outputData = outputTensor.data;

    res.json({ prediction: outputData });
  } catch (err) {
    console.error('Error running Crop model:', err);
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
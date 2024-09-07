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

const cropPredictionPath = path.join(__dirname, '../frontend/src/models/Crop_prediction.onnx');
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




// Route for Fertilizer Prediction
app.post('/predict-fertilizer', async (req, res) => {
  try {
    const { temperature, humidity, moisture, soilType, cropType, nitrogen, potassium, phosphorous } = req.body;
    console.log(req.body);

    // Convert categorical variables to numerical values
    const soilTypeMapping = {
      'Sandy': 1,
      'Loamy': 2,
      'Clay': 3
    };

    const cropTypeMapping = {
      'Maize': 1,
      'Wheat': 2,
      'Barley': 3
    };

    const soilTypeEncoded = soilTypeMapping[soilType] || 0; // Default to 0 if unknown
    const cropTypeEncoded = cropTypeMapping[cropType] || 0; // Default to 0 if unknown

    // Create input tensor based on the received values and encoded categorical values
    const inputTensor = new onnx.Tensor('float32', Float32Array.from([
      parseFloat(temperature),
      parseFloat(humidity),
      parseFloat(moisture),
      parseFloat(soilTypeEncoded),
      parseFloat(cropTypeEncoded),
      parseFloat(nitrogen),
      parseFloat(potassium),
      parseFloat(phosphorous),
    ]), [1, 8]);

    const feeds = { 'float_input': inputTensor };
    console.log("Feeds", feeds);

    // Run the model
    const results = await fertilizerSession.run(feeds);
    console.log("Results", results);

    // Extract output_label and output_probability from the model results
    const outputLabelTensor = results['output_label'];  // Ensure this is correct by checking available output names
    const outputProbabilityTensor = results['output_probability'];  // Ensure this is correct by checking available output names

    if (!outputLabelTensor || !outputProbabilityTensor) {
      throw new Error("Output tensors are missing");
    }

    const outputLabel = outputLabelTensor.data;  // Get the label data
    const outputProbabilities = outputProbabilityTensor.data;  // Get the probability data

    res.json({ prediction: outputLabel, probabilities: outputProbabilities });
  } catch (err) {
    console.error('Error running Fertilizer model:', err);
    res.status(500).json({ error: 'Prediction failed' });
  }
});


// Route for Crop Prediction
app.post('/predict-crop', async (req, res) => {
  try {
    const { nitrogen, phosphorous, potassium, temperature, humidity, ph, rainfall } = req.body;
    console.log("Input Names: ", cropSession.inputNames);
    console.log("Input Types: ", cropSession.inputTypes);
    console.log("Output Names: ", cropSession.outputNames);
    console.log("Output Types: ", cropSession.outputTypes);
    console.log(cropSession)

    // Create input tensor based on the received values
    const inputTensor = new onnx.Tensor('float32', Float32Array.from([
      nitrogen, phosphorous, potassium, temperature, humidity, ph, rainfall,
    ]), [1, 7]); // Adjust dimensions to [1, 7] based on model input shape
    console.log(inputTensor);

    const feeds = { 'float_input': inputTensor }; // Adjust 'input.1' based on model's input name
    console.log("feeds",feeds);
    const results = await cropSession.run(feeds);
    console.log("Results", results);
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
from flask import Flask, request, jsonify
import onnxruntime as ort
import numpy as np

app = Flask(__name__)

# Load the ONNX model
cropSession = ort.InferenceSession("../frontend/src/models/Crop_prediction.onnx")
fertilizerSession = ort.InferenceSession("../frontend/src/models/random_forest_classifier.onnx")

@app.route('/predict-crop', methods=['POST'])
def predict_crop():
    try:
        data = request.json
        nitrogen = data['nitrogen']
        phosphorous = data['phosphorous']
        potassium = data['potassium']
        temperature = data['temperature']
        humidity = data['humidity']
        ph = data['ph']
        rainfall = data['rainfall']

        # Prepare input data as a NumPy array
        input_data = np.array([[nitrogen, phosphorous, potassium, temperature, humidity, ph, rainfall]], dtype=np.float32)

        # Get input name for the ONNX model
        input_name = cropSession.get_inputs()[0].name

        # Perform inference
        results = cropSession.run(None, {input_name: input_data})
        predicted_crop = results[0][0]

        return jsonify({'prediction': predicted_crop})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def preprocess_soil_type(soil_type):
    soil_mapping = {
        "Sandy": 0,
        "Loamy": 1,
        "Clay": 2,
        "Silty": 3,
        "Peaty": 4,
        "Chalky": 5,
    }
    return soil_mapping.get(soil_type, 0)

def preprocess_crop_type(crop_type):
    crop_mapping = {
        "Wheat": 0,
        "Rice": 1,
        "Maize": 2,
        "Barley": 3,
        "Soyabean": 4,
        "Cotton": 5,
        # Add more crops as per your dataset
    }
    return crop_mapping.get(crop_type, 0)

@app.route('/predict-fertilizer', methods=['POST'])
def predict_fertilizer():
    try:
        # Get JSON data from request
        data = request.get_json()
        print(data)
        # Extract the input values from the request
        temperature = float(data['temperature'])
        humidity = float(data['humidity'])
        moisture = float(data['moisture'])
        soilType = preprocess_soil_type(data['soilType'])
        cropType = preprocess_crop_type(data['cropType'])
        nitrogen = float(data['nitrogen'])
        potassium = float(data['potassium'])
        phosphorous = float(data['phosphorous'])

        # Prepare input data as a numpy array
        input_data = np.array([
            temperature, humidity, moisture, soilType, cropType, nitrogen, potassium, phosphorous
        ], dtype=np.float32).reshape(1, 8)

        # Get the input name from the ONNX model
        input_name = fertilizerSession.get_inputs()[0].name

        # Run the model and get the result
        result = fertilizerSession.run(None, {input_name: input_data})

        # Extract the prediction (adjust based on your model's output)
        predicted_fertilizer = result[0][0]

        # Send the prediction as a JSON response
        return jsonify({'prediction': predicted_fertilizer})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001)

import numpy as np
import cv2
import tensorflow as tf
from tensorflow.keras.models import load_model
from flask import Flask, request, jsonify
from PIL import Image
import io

app = Flask(__name__)

# Load the trained model
model_path = "mobilenetv2_autism_model_improved.h5"
model = load_model(model_path)


def preprocess_image(file):
    try:

        image = Image.open(file).convert("RGB")
        image = image.resize((224, 224)) 
        image = np.array(image) / 255.0 
        image = np.expand_dims(image, axis=0)  
        return image
    except Exception as e:
        print(f"Error processing image: {e}")
        return None

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    img = preprocess_image(file)

    if img is None:
        return jsonify({"error": "Invalid image file"}), 400

    prediction = model.predict(img)[0][0]  

    result = {
        "autism_detected": bool(prediction >= 0.5),
        "confidence": round(float(prediction) * 100, 2) if prediction >= 0.5 else round((1 - float(prediction)) * 100, 2)
    }
    
    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

from flask import Flask, render_template, request, jsonify
import numpy as np
import modelLoad

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route('/')
def home():
    return render_template('HomePage.html')

@app.route('/AI_page')
def ai_page():
    return render_template('AI_page.html')

@app.route('/predict', methods=['POST', 'GET'])
def postInput():

    print(request.form)

    try:
        model_selection = request.form.get('model_selection')
        if not model_selection:
            return jsonify({"error": "Model selection is required"}), 400

        a = float(request.form["condition"])
        b = float(request.form["interview_type"])
        c = float(request.form["type"])
        e = float(request.form["place"])
        f = float(request.form["tec"])
        g = float(request.form.get("Cloud", 0))
        h = float(request.form.get("back", 0))
        i = float(request.form.get("Hibernate", 0))
        j = float(request.form.get("PostgreSQL", 0))
        k = float(request.form.get("Struts", 0))
        l = float(request.form.get("Other", 0))

        x1 = 1 if a == 1 else -1
        x2 = 1 if b == 0 else -1
        x3 = 1 if b == 1 else -1
        x4 = 1 if e == 1 else -1
        x5 = 1 if e == 2 else -1
        x6 = 1 if e == 0 else -1
        x7 = 1 if e == 3 else -1
        x8 = 1 if e == 4 else -1
        x9 = 1 if c == 0 else -1
        x10 = 1 if g == 1 else -1
        x11 = 1 if l == 1 else -1
        x12 = 1 if h == 1 else -1
        x13 = 1 if f == 1 else -1
        x14 = 1 if i == 1 else -1
        x15 = 1 if j == 1 else -1
        x16 = 1 if k == 1 else -1

        input_data = np.array([[x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, x14, x15, x16]])
        result = modelLoad.predict(model_selection, input_data)

        return jsonify({model_selection: f"{str(result)} %"})
    
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": "An error occurred during prediction"}), 500

if __name__ == '__main__':
    app.run(debug=True)

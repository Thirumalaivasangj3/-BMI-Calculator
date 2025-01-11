import { useState } from 'react';
import './App.css';

function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiStatus, setBmiStatus] = useState("");
  const [bmiHistory, setBmiHistory] = useState([]);

  const calculateBmi = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        alert("Please enter valid positive numbers for height and weight.");
        return;
      }
      const bmiValue = weight / (heightInMeters * heightInMeters);
      const roundedBmi = bmiValue.toFixed(2);
      setBmi(roundedBmi);

      let status = "";
      if (bmiValue < 18.5) {
        status = "Underweight";
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        status = "Normal Weight";
      } else if (bmiValue >= 25 && bmiValue < 29.9) {
        status = "Overweight";
      } else {
        status = "Obese";
      }
      setBmiStatus(status);

      // Add to history
      setBmiHistory([{ height, weight, bmi: roundedBmi, status }, ...bmiHistory]);
    } else {
      alert("Please fill in both height and weight fields.");
      setBmi(null);
      setBmiStatus("");
    }
  };

  const resetForm = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setBmiStatus("");
  };

  const getMotivationalMessage = (status) => {
    switch (status) {
      case "Underweight":
        return "You're doing great! Consider adding more nutrition to your meals.";
      case "Normal Weight":
        return "Awesome! You're in a healthy range. Keep up the good work!";
      case "Overweight":
        return "Stay motivated! Small lifestyle changes can make a big difference.";
      case "Obese":
        return "Don't give up! Consult a health professional for a personalized plan.";
      default:
        return "";
    }
  };

  return (
    <div className="bmicalculator">
      <div className="box"></div>
      <div className="data">
        <h1>BMI Calculator</h1>
        <div className="input-container">
          <label htmlFor="height">Height (cm):</label>
          <input
            type="text"
            value={height}
            id="height"
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter your height"
          />
        </div>
        <div className="input-container">
          <label htmlFor="weight">Weight (kg):</label>
          <input
            type="text"
            value={weight}
            id="weight"
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter your weight"
          />
        </div>

        <div className="button-container">
          <button onClick={calculateBmi}>Calculate BMI</button>
          <button onClick={resetForm} className="reset-button">
            Reset
          </button>
        </div>

        {bmi !== null && (
          <div className="result animated">
            <p>
              Your BMI is: <strong>{bmi}</strong>
            </p>
            <p className={`status ${bmiStatus.replace(" ", "").toLowerCase()}`}>
              Status: <strong>{bmiStatus}</strong>
            </p>
            <p className="motivational-message">{getMotivationalMessage(bmiStatus)}</p>
          </div>
        )}

        {bmiHistory.length > 0 && (
          <div className="history">
            <h2>BMI History</h2>
            <ul>
              {bmiHistory.map((entry, index) => (
                <li key={index}>
                  <span>Height: {entry.height} cm</span> | 
                  <span> Weight: {entry.weight} kg</span> | 
                  <span> BMI: {entry.bmi}</span> | 
                  <span className={`status ${entry.status.replace(" ", "").toLowerCase()}`}>
                    {entry.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

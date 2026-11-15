import { useState } from 'react'
import './App.css';

function App() {
  const [principal, setPrincipal] = useState(500000);
  const [interest, setInterest] = useState(8.5);
  const [tenure, setTenure] = useState(5);

  const P = Number(principal);
  const r = Number(interest) / 12 / 100;
  const n = Number(tenure) * 12;

  const validInputs =
    principal !== '' &&
    P > 0 &&
    interest !== '' &&
    r >= 0 &&
    tenure !== '' &&
    n > 0;

  const factor = (1 + r) ** n;

  const monthlyEmi = !validInputs
    ? 0
    : r === 0
    ? P / n
    : (P * r * factor) / (factor - 1);
  const totalAmountPayable = monthlyEmi * n;

  const formatNumber = (value, decimals = 2) =>
  new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

  return (
    <div className="calculator-container">
      <h1>EMI Calculator</h1>

      {/* 1. Principal Loan Amount */}
      <div className="input-group">
        <label htmlFor="principal">Loan Amount (₹)</label>
        <input
          id="principal"
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value === '' ? '' : Number(e.target.value))}
        />
      </div>

      {/* 2. Annual Interest Rate */}
      <div className="input-group">
        <label htmlFor="interest">Annual Interest Rate (%)</label>
        <input
          id="interest"
          type="number"
          step="0.1"
          value={interest}
          onChange={(e) => setInterest(e.target.value === '' ? '' : Number(e.target.value))}
        />
      </div>

      {/* 3. Loan Tenure */}
      <div className="input-group">
        <label htmlFor="tenure">Loan Tenure (Years)</label>
        <input
          id="tenure"
          type="number"
          value={tenure}
          onChange={(e) => setTenure(e.target.value === '' ? '' : Number(e.target.value))}
        />
      </div>


      {/* 4. Results Display Area (Hardcoded for now) */}
      <div className="results-box">
        <p>Monthly EMI: <strong>₹{validInputs ? formatNumber(monthlyEmi) : 'N/A'}</strong></p>
        <p>Total Principal: <strong>₹{validInputs ? formatNumber(principal) : 'N/A'}</strong></p>
        <p>Total Interest: <strong>₹{validInputs ? formatNumber(totalAmountPayable - P) : 'N/A'}</strong></p>
        <p>Total Amount Payable: <strong>₹{validInputs ? formatNumber(totalAmountPayable) : 'N/A'}</strong></p>
      </div>
    </div>
  );
}

export default App;
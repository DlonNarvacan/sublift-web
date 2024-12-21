'use client';
import { useState } from 'react';
import { calculationTypes, inputMappings } from '@/utils/constants/calculationTypes';
import { PerformanceCalculator } from '@/utils/formulas/calculator';
import { AircraftInputs, CalculationType } from '@/utils/formulas/types';
import './styles.css';

export const Calculator: React.FC = () => {
  const [calculationType, setCalculationType] = useState<string>(calculationTypes[0]);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string>('0');
  
  const calculator = new PerformanceCalculator();

  const handleInputChange = (name: string, value: string) => {
    if (value && !/^\d*\.?\d*$/.test(value)) {
      return;
    }
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getRequiredInputs = () => {
    const type = calculationType.toLowerCase().replace(/ /g, '_') as CalculationType;
    return inputMappings[type] || [];
  };

  const calculate = () => {
    try {
      const type = calculationType.toLowerCase().replace(/ /g, '_') as CalculationType;
      const numericInputs: AircraftInputs = {
        velocity: parseFloat(inputs.velocity) || 0,
        weight: parseFloat(inputs.weight) || 0,
        density: parseFloat(inputs.density) || 0,
        wing_area: parseFloat(inputs.wing_area) || 0,
        profile_drag: parseFloat(inputs.profile_drag) || 0,
        efficiency: parseFloat(inputs.efficiency) || 0,
        aspect_ratio: parseFloat(inputs.aspect_ratio) || 0,
        coefficient_of_lift: parseFloat(inputs.coefficient_of_lift) || 0,
        coefficient_of_drag: parseFloat(inputs.coefficient_of_drag) || 0,
        thrust_required: parseFloat(inputs.thrust_required) || 0
      };

      let calculationResult: number;

      switch (type) {
        case 'coefficient_of_lift':
          calculationResult = calculator.coefficientOfLift(numericInputs);
          break;
        case 'coefficient_of_drag':
          calculationResult = calculator.coefficientOfDrag(
            numericInputs.coefficient_of_lift || 0,
            numericInputs
          );
          break;
        case 'thrust_required':
          calculationResult = calculator.thrustRequired(
            numericInputs.coefficient_of_lift || 0,
            numericInputs.coefficient_of_drag || 0,
            numericInputs.weight
          );
          break;
        case 'power_required':
          calculationResult = calculator.powerRequired(
            numericInputs.thrust_required || 0,
            numericInputs,
            numericInputs.coefficient_of_lift || 0
          );
          break;
        case 'thrust_required_minimum':
          calculationResult = calculator.thrustRequiredMinimum(numericInputs);
          break;
        case 'power_required_minimum':
          calculationResult = calculator.powerRequiredMinimum(numericInputs);
          break;
        default:
          throw new Error('Invalid calculation type');
      }

      setResult(calculationResult.toString());
    } catch (error) {
      setResult('Error: ' + (error as Error).message);
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator-content">
        <div className="logo-container">
          <img 
            src="/logo.png"
            alt="SubLift Logo" 
            className="logo"
            style={{ maxWidth: '120px', height: 'auto' }}
          />
        </div>

        <h1 className="title">
          Choose an Aircraft Performance Solution
        </h1>

        <div className="select-container">
          <select
            value={calculationType}
            onChange={(e) => setCalculationType(e.target.value)}
            className="custom-select"
          >
            {calculationTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <div className="select-arrow">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="black" strokeWidth="2"/>  /* Change stroke="white" to stroke="black" */
          </svg>
          </div>
        </div>

        <div className="input-grid">
          {getRequiredInputs().map(input => (
            <div key={input} className="input-group">
              <label className="input-label">
                {input.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </label>
              <input
                type="text"
                value={inputs[input] || ''}
                onChange={(e) => handleInputChange(input, e.target.value)}
                className="input-field"
                style={{ color: '#000000' }}
              />
            </div>
          ))}
        </div>

        <div className="result">
          Result: {result}
        </div>

        <button
          onClick={calculate}
          className="calculate-button"
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default Calculator;
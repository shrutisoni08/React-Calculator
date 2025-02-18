import { useState, useEffect } from "react";
import useCalculatorStore from "../store/useCalculatorStore";
import { evaluate } from "mathjs";

const AdvanceCal = () => {
  const { updateInput, history, future, undo, redo } = useCalculatorStore();
  const [expression, setExpression] = useState("");

  // Handle Button Clicks (Existing Function)
  const handleButtonClick = (value) => {
    const newExpression = expression + value;
    setExpression(newExpression);
    updateInput(newExpression);
  };

  // Clear the Input
  const handleClear = () => {
    setExpression("");
    updateInput("");
  };

  // Calculate the Result
  const handleCalculate = () => {
    try {
      const result = evaluate(expression);
      updateInput(result.toString());
      setExpression(result.toString());
    } catch (error) {
      updateInput("Error");
    }
  };

  // Keyboard Input Handler
  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;

      // Allow only valid inputs
      if (/[0-9+\-*/().]/.test(key)) {
        setExpression((prev) => prev + key);
        updateInput(expression + key);
      } 
      else if (key === "Enter") {
        handleCalculate();
      } 
      else if (key === "Backspace") {
        setExpression((prev) => prev.slice(0, -1));
        updateInput(expression.slice(0, -1));
      } 
      else if (key === "Escape") {
        handleClear();
      }
    };

    // Attach Event Listener
    window.addEventListener("keydown", handleKeyPress);
    
    // Cleanup Event Listener
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [expression]); // Re-run effect when expression changes

  return (
    <div className="main-div flex flex-col md:flex-row items-center justify-center w-[80%] h-[90vh] bg-gradient-to-r from-[#E0F7FA] to-[#B2EBF2] px-6">
      {/* Sidebar */}
      <div className="res-div w-full md:w-1/4 h-[90%] bg-gray-800 text-white p-6 rounded-xl shadow-lg flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-6 text-center">Menu</h2>
        <ul className="menu-list space-y-6 text-center">
          <li>
            <a href="/calculator" className="text-[#0CCCCC] hover:underline">Simple Calculator</a>
          </li>
          <li>
            <a href="/age-calculator" className="text-[#0CCCCC] hover:underline">Age Calculator</a>
          </li>
          <li>
            <a href="/advanced-calculator" className="text-[#0CCCCC] hover:underline">Advanced Calculator</a>
          </li>
          <li>
            <a
              href="/calorie-calculator"
              className="text-[#0CCCCC] hover:underline"
            >
              Calorie Calculator
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="contentbox flex flex-col items-center justify-center flex-1 p-6">
        <h2 className="main-heading text-3xl font-bold mb-6 text-center">Advanced Calculator</h2>
        <input
          type="text"
          className="calc-input p-3 border rounded-md mb-4 text-black w-full max-w-xs"
          value={expression}
          placeholder="Enter expression"
          readOnly
        />

        <div className="grid grid-cols-4 gap-3 w-full max-w-xs">
          {["7", "8", "9", "+", "4", "5", "6", "-", "1", "2", "3", "*", "C", "0", "=", "/", "sin", "cos", "tan", "log", "exp", "sqrt", "(", ")"].map((btn) => (
            <button
              key={btn}
              className={`p-3 rounded-md shadow-md text-lg ${btn === "C" ? "bg-red-500 text-white hover:bg-red-600" : btn === "=" ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-200 text-black hover:bg-gray-300"}`}
              onClick={() =>
                btn === "C"
                  ? handleClear()
                  : btn === "="
                  ? handleCalculate()
                  : handleButtonClick(btn)
              }
            >
              {btn}
            </button>
          ))}
        </div>

        <div className="flex gap-4 mt-6 w-full max-w-xs">
          <button
            className={`w-1/2 px-4 py-2 text-white rounded-md shadow-md transition-all ${history.length > 0 ? "bg-yellow-500 hover:bg-yellow-600" : "bg-gray-400 cursor-not-allowed"}`}
            onClick={undo}
            disabled={history.length === 0}
          >
            Undo
          </button>

          <button
            className={`w-1/2 px-4 py-2 text-white rounded-md shadow-md transition-all ${future.length > 0 ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"}`}
            onClick={redo}
            disabled={future.length === 0}
          >
            Redo
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvanceCal;

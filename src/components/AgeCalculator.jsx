import { useState } from "react";
import useCalculatorStore from "../store/useCalculatorStore";

const AgeCalculator = () => {
  const { input, calculateAge, undo, redo, updateInput, history, future } =
    useCalculatorStore();
  const [birthDate, setBirthDate] = useState("");
  const [isManual, setIsManual] = useState(false); // Toggle for manual input

  const handleCalculate = () => {
    calculateAge(birthDate);
  };

  const formatDateInput = (value) => {
    let newDate = value.replace(/\D/g, ""); // Remove non-numeric characters

    if (newDate.length > 8) return birthDate;

    let formattedDate = "";
    if (newDate.length <= 4) {
      formattedDate = newDate; 
    } else if (newDate.length <= 6) {
      formattedDate = `${newDate.slice(0, 4)}-${newDate.slice(4)}`;
    } else {
      formattedDate = `${newDate.slice(0, 4)}-${newDate.slice(4, 6)}-${newDate.slice(6)}`;
    }

    return formattedDate;
  };

  const handleNumberClick = (num) => {
    if (!isManual) setIsManual(true);

    const newDate = formatDateInput(birthDate + num.toString());
    setBirthDate(newDate);
    updateInput(newDate);

    if (newDate.length === 10) {
      calculateAge(newDate);
    }
  };

  const handleDateChange = (e) => {
    setIsManual(false);
    setBirthDate(e.target.value);
    updateInput(e.target.value);
  };

  const handleClear = () => {
    setBirthDate(""); // Clear input field
    updateInput(""); // Clear global store input
  };

  return (
    <div className="main-div flex flex-col md:flex-row items-center justify-center w-[80%] h-[90vh] bg-gradient-to-r from-[#E0F7FA] to-[#B2EBF2] px-6">
      {/* Sidebar */}
      <div className="res-div w-full md:w-1/4 h-[90%] bg-gray-800 text-white p-6 rounded-xl shadow-lg flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-6 text-center">Menu</h2>
        <ul className="menu-list space-y-6 text-center">
          <li>
            <a href="/calculator" className="text-[#0CCCCC] hover:underline">
              Simple Calculator
            </a>
          </li>
          <li>
            <a href="/age-calculator" className="text-[#0CCCCC] hover:underline">
              Age Calculator
            </a>
          </li>
          <li>
            <a href="/calorie-calculator" className="text-[#0CCCCC] hover:underline">
              Calorie Calculator
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="contentbox flex flex-col items-center justify-center flex-1 p-6">
        <h2 className="main-heading text-3xl font-bold mb-6 text-center">Age Calculator</h2>

        {/* Input Field */}
        <input
          type={isManual ? "text" : "date"}
          className="age-input p-3 border rounded-md mb-4 text-black w-full max-w-xs"
          value={birthDate}
          placeholder="YYYY-MM-DD"
          onChange={handleDateChange}
          onInput={(e) => setBirthDate(formatDateInput(e.target.value))}
          onClick={() => setIsManual(false)}
        />

        <div className="flex gap-2 mb-4">
          <button
            className="px-6 py-3 bg-[#0CCCCC] text-white rounded-md shadow-md hover:bg-blue-600 transition-all w-full max-w-xs"
            onClick={handleCalculate}
          >
            Calculate Age
          </button>
        </div>

        <p className="text-xl font-semibold mb-6">Result: {input}</p>

        {/* Number Pad with Clear Button */}
        <div className="age-div grid grid-cols-3 gap-3 w-full max-w-xs">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              className="age-button p-3 bg-gray-200 text-black rounded-md shadow-md hover:bg-gray-300 transition-all text-lg"
              onClick={() => handleNumberClick(num)}
            >
              {num}
            </button>
          ))}

          {/* Clear "C" Button */}
          <button
            className="p-3 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition-all text-lg"
            onClick={handleClear}
          >
            C
          </button>

          {/* Zero Button */}
          <button
            className="p-3 bg-gray-200 text-black rounded-md shadow-md hover:bg-gray-300 transition-all text-lg"
            onClick={() => handleNumberClick(0)}
          >
            0
          </button>
        </div>

        {/* Undo/Redo Buttons */}
        <div className="flex gap-4 mt-6 w-full max-w-xs">
          <button
            className={`w-1/2 px-4 py-2 text-white rounded-md shadow-md transition-all ${
              history.length > 0
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={undo}
            disabled={history.length === 0}
          >
            Undo
          </button>

          <button
            className={`w-1/2 px-4 py-2 text-white rounded-md shadow-md transition-all ${
              future.length > 0
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
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

export default AgeCalculator;
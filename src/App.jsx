import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import useCalculatorStore from "./store/useCalculatorStore";
import Calculator from "./components/Calculator";
import AgeCalculator from "./components/AgeCalculator";
import CalorieCalculator from "./components/CalorieCalculator";
import "./App.css";

const App = () => {
  const { darkMode, toggleDarkMode } = useCalculatorStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <Router>
      <div className={`h-screen w-screen flex flex-col ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
        <div className="flex flex-col items-center justify-center w-full h-screen relative">
          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="absolute top-4 right-4 p-2 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-700 transition-all"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          <Routes>
            {/* Landing Page */}
            <Route
              path="/"
              element={
                <div className="h-full flex flex-col justify-center items-center gap-6">
                  <h1 className="text-3xl font-bold text-[#0CCCCC]">Choose Your Calculator</h1>
                  <div className="flex flex-col gap-4">
                    <Link to="/calculator" className="p-4 bg-[#0CCCCC] text-white rounded-md shadow-md hover:bg-[#0096AE] transition-all">Simple Normal Calculator</Link>
                    <Link to="/age-calculator" className="p-4 bg-[#0CCCCC] text-white rounded-md shadow-md hover:bg-[#0096AE] transition-all">Age Calculator</Link>
                    <Link to="/calorie-calculator" className="p-4 bg-[#0CCCCC] text-white rounded-md shadow-md hover:bg-[#0096AE] transition-all">Calorie Calculator</Link>
                  </div>
                </div>
              }
            />
            
            {/* Routes for different calculators */}
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/age-calculator" element={<AgeCalculator />} />
            <Route path="/calorie-calculator" element={<CalorieCalculator />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

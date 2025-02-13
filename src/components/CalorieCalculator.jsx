import { useState } from "react";

const CalorieCalculator = () => {
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [activity, setActivity] = useState("moderate");
  const [calories, setCalories] = useState(null);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const activityLevels = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };

  const calculateCalories = () => {
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    const newCalories = Math.round(bmr * activityLevels[activity]);
    setHistory([...history, calories]);
    setCalories(newCalories);
  };

   // Undo Functionality
  const undo = () => {
    if (history.length > 0) {
      setRedoStack([calories, ...redoStack]);
      setCalories(history[history.length - 1]);
      setHistory(history.slice(0, -1));
    }
  };

   // Redo Functionality
  const redo = () => {
    if (redoStack.length > 0) {
      setHistory([...history, calories]);
      setCalories(redoStack[0]);
      setRedoStack(redoStack.slice(1));
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-[80%] h-[90vh] bg-gradient-to-r from-[#E0F7FA] to-[#B2EBF2] px-6 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 h-[90%] bg-gray-800 text-white p-6 rounded-xl shadow-lg flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-6 text-center">Menu</h2>
        <ul className="space-y-6 text-center">
          <li>
            <a href="/calculator" className="text-[#0CCCCC] hover:underline">
              Simple Calculator
            </a>
          </li>
          <li>
            <a
              href="/age-calculator"
              className="text-[#0CCCCC] hover:underline"
            >
              Age Calculator
            </a>
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
      <div className="w-full md:w-3/4 flex flex-col items-center justify-center p-6">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#0CCCCC] mb-6 text-center dark:text-[#0CCCCC]">
            Calorie Calculator
          </h2>

          {/* Inputs */}
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700 dark:text-gray-300">Age:</span>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="border dark:border-gray-500 dark:bg-gray-900 dark:text-white p-3 rounded-lg w-full mt-1 shadow-sm focus:ring-2 focus:ring-[#AB47BC]"
              />
            </label>

            <label className="block">
              <span className="text-gray-700 dark:text-gray-300">
                Weight (kg):
              </span>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="border dark:border-gray-500 dark:bg-gray-900 dark:text-white p-3 rounded-lg w-full mt-1 shadow-sm focus:ring-2 focus:ring-[#AB47BC]"
              />
            </label>

            <label className="block">
              <span className="text-gray-700 dark:text-gray-300">
                Height (cm):
              </span>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="border dark:border-gray-500 dark:bg-gray-900 dark:text-white p-3 rounded-lg w-full mt-1 shadow-sm focus:ring-2 focus:ring-[#AB47BC]"
              />
            </label>

            <label className="block">
              <span className="text-gray-700 dark:text-gray-300">
                Activity Level:
              </span>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="border dark:border-gray-500 dark:bg-gray-900 dark:text-white p-3 rounded-lg w-full mt-1 shadow-sm focus:ring-2 focus:ring-[#AB47BC]"
              >
                <option value="sedentary">Sedentary</option>
                <option value="light">Light Exercise</option>
                <option value="moderate">Moderate Exercise</option>
                <option value="active">Active</option>
                <option value="veryActive">Very Active</option>
              </select>
            </label>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <button
              onClick={calculateCalories}
              className="px-6 py-3 bg-[#0CCCCC] text-white font-bold rounded-lg shadow-md hover:bg-[#9C27B0] transition"
            >
              Calculate
            </button>
            <button
              onClick={undo}
              className="px-6 py-3 bg-gray-400 text-white font-bold rounded-lg shadow-md hover:bg-gray-500 transition"
            >
              Undo
            </button>
            <button
              onClick={redo}
              className="px-6 py-3 bg-gray-400 text-white font-bold rounded-lg shadow-md hover:bg-gray-500 transition"
            >
              Redo
            </button>
          </div>

          {/* Result Display */}
          {calories && (
            <p className="mt-6 text-xl text-center font-semibold text-gray-800 dark:text-gray-300">
              Daily Calorie Needs:{" "}
              <span className="text-[#6A1B9A] dark:text-[#AB47BC]">
                {calories}
              </span>{" "}
              kcal
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalorieCalculator;

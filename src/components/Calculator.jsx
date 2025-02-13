import { useState } from "react";
import { useDrop } from "react-dnd";
import DraggableButton from "./DraggableButton";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [buttons] = useState([
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
    "C" 
  ]);

  // Drop target for buttons
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "BUTTON",
    drop: (item) => {
      if (item.value === "C") {
        setInput("");
        setHistory([]);
        setRedoStack([]);
      } else {
        setHistory([...history, input]);
        setRedoStack([]);
        setInput((prev) => prev + item.value);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Handle Button Click
  const handleButtonClick = (value) => {
    if (value === "C") {
      setInput("");
      setHistory([]);
      setRedoStack([]);
    } else {
      setHistory([...history, input]);
      setRedoStack([]);

      if (value === "=") {
        try {
          setInput(eval(input).toString());
        } catch {
          setInput("Error");
        }
      } else {
        setInput((prev) => prev + value);
      }
    }
  };

  // Undo Functionality
  const undo = () => {
    if (history.length > 0) {
      setRedoStack([input, ...redoStack]);
      setInput(history[history.length - 1]);
      setHistory(history.slice(0, -1));
    }
  };

  // Redo Functionality
  const redo = () => {
    if (redoStack.length > 0) {
      setHistory([...history, input]);
      setInput(redoStack[0]);
      setRedoStack(redoStack.slice(1));
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-[80%] h-[90vh] bg-gradient-to-r from-[#E0F7FA] to-[#B2EBF2] px-6">
    {/* Sidebar */}
    <div className="w-full md:w-1/4 h-[90%] bg-gray-800 text-white p-6 rounded-xl shadow-lg flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-6 text-center">Menu</h2>
      <ul className="space-y-6 text-center">
        <li><a href="/calculator" className="text-[#0CCCCC] hover:underline">Simple Calculator</a></li>
        <li><a href="/age-calculator" className="text-[#0CCCCC] hover:underline">Age Calculator</a></li>
        <li><a href="/calorie-calculator" className="text-[#0CCCCC] hover:underline">Calorie Calculator</a></li>
      </ul>
    </div>

    {/* Increased gap between Sidebar and Calculator Box */}
    <div className="w-6"></div>  

    {/* Calculator Box */}
    <div className="w-full md:w-2/3 h-[85%] bg-white shadow-2xl rounded-2xl p-8 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-[#0CCCCC] mb-6">Calculator</h2>

      {/* Input Field (Drop Target) */}
      <input
  ref={drop}
  type="text"
  value={input}
  readOnly
  className={`border p-3 rounded-lg mb-6 w-full max-w-md text-center text-xl font-semibold shadow-inner 
    ${isOver ? "bg-gray-100" : "bg-white"} 
    dark:bg-gray-800 dark:text-white dark:border-gray-600`}
/>

      {/* Draggable Buttons */}
      <div className="grid grid-cols-5 gap-2 w-full max-w-md ">
        {buttons.map((char, index) => (
          <DraggableButton key={index} value={char} onClick={handleButtonClick} />
        ))}
      </div>

      {/* Undo/Redo Buttons */}
      <div className="mt-6 flex gap-6">
        <button onClick={undo} className="px-8 font-bold py-2 bg-[#0CCCCC] text-white rounded-lg shadow-md hover:bg-[#0AA6A6] transition">Undo</button>
        <button onClick={redo} className="px-8 font-bold py-2 t bg-[#0CCCCC] text-white rounded-lg shadow-md hover:bg-[#0AA6A6] transition">Redo</button>
      </div>
    </div>
  </div>
  );
};

export default Calculator;

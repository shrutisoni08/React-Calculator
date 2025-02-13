/* eslint-disable react/prop-types */
import { useDrag } from "react-dnd";
import useCalculatorStore from "../store/useCalculatorStore";

const DraggableComponent = ({ type, index }) => {
  const { removeComponent, updateInput } = useCalculatorStore();

  const actualValue =
    typeof type === "string" ? type : type?.label || type?.type || "";

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "COMPONENT",
      item: { type: actualValue, index },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [actualValue, index]
  );

  return (
    <button
      ref={drag}
      onClick={() => updateInput(actualValue)}
      className={`p-3 text-xl font-bold rounded-md shadow-md transition-all cursor-pointer flex items-center justify-center gap-2
        ${isDragging ? "opacity-50" : "opacity-100"} 
        ${
          "0123456789".includes(actualValue)
            ? "bg-gray-300 dark:bg-gray-600"
            : "bg-blue-500 dark:bg-blue-700 text-white"
        }`}
    >
      {actualValue}
      <span
        onClick={(e) => {
          e.stopPropagation();
          removeComponent(index);
        }}
        className="text-red-500 cursor-pointer hover:text-red-700"
      >
        ❌
      </span>
    </button>
  );
};

export default DraggableComponent;

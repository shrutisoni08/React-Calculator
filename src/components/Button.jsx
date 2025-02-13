import { useDrag } from "react-dnd";
import useCalculatorStore from "../store/useCalculatorStore";

// eslint-disable-next-line react/prop-types
const Button = ({ label }) => {
  const { addComponent } = useCalculatorStore();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "COMPONENT",
    item: { label },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <button
      ref={drag}
      onClick={() => addComponent(label)}
      className={`p-4 bg-gray-500 text-white rounded-md cursor-pointer transition-all shadow-md hover:bg-gray-600 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {label}
    </button>
  );
};

export default Button;

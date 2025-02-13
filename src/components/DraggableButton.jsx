import { useDrag } from "react-dnd";

// eslint-disable-next-line react/prop-types
const DraggableButton = ({ value, onClick }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "BUTTON",
    item: { value },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <button
      ref={drag}
      onClick={() => onClick(value)}
      className={`p-4 bg-[#0CCCCC] text-white rounded-md ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      {value}
    </button>
  );
};

export default DraggableButton;

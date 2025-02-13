/* eslint-disable react/prop-types */
import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion } from "framer-motion";

const DraggableButton = ({ button, index, moveButton, removeButton }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "BUTTON",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "BUTTON",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveButton(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <motion.div
      ref={(node) => drag(drop(node))}
      className={`p-2 bg-blue-500 text-white rounded-md cursor-grab shadow-md flex justify-between items-center ${isDragging ? "opacity-50" : ""}`}
      layout
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {button.label}
      <button className="ml-2 bg-red-500 p-1 rounded" onClick={() => removeButton(index)}>X</button>
    </motion.div>
  );
};

const DragAndDropSidebar = () => {
  const [buttons, setButtons] = useState([
    { id: 1, label: "Simple Calculator", link: "/calculator" },
    { id: 2, label: "Age Calculator", link: "/age-calculator" },
    { id: 3, label: "Calorie Calculator", link: "/calorie-calculator" },
  ]);

  const moveButton = (fromIndex, toIndex) => {
    const updatedButtons = [...buttons];
    const [movedButton] = updatedButtons.splice(fromIndex, 1);
    updatedButtons.splice(toIndex, 0, movedButton);
    setButtons(updatedButtons);
  };

  const removeButton = (index) => {
    setButtons(buttons.filter((_, i) => i !== index));
  };

  const addButton = () => {
    const newButton = { id: Date.now(), label: "New Button", link: "#" };
    setButtons([...buttons, newButton]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-64 bg-gray-800 text-white p-4 flex flex-col gap-2">
        <h2 className="text-xl font-bold mb-4">Sidebar</h2>
        <div className="flex flex-col gap-2">
          {buttons.map((button, index) => (
            <DraggableButton
              key={button.id}
              button={button}
              index={index}
              moveButton={moveButton}
              removeButton={removeButton}
            />
          ))}
        </div>
        <button className="mt-4 bg-green-500 p-2 rounded" onClick={addButton}>Add Button</button>
      </div>
    </DndProvider>
  );
};

export default DragAndDropSidebar;

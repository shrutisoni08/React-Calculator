import { useDrag } from "react-dnd";
import useCalculatorStore from "../store/useCalculatorStore";

// eslint-disable-next-line react/prop-types
const SidebarItem = ({ label, type }) => {
  const { addComponent } = useCalculatorStore();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "COMPONENT",
    item: { label, type }, 
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <button
      ref={drag}
      onClick={() => addComponent({ label, type })}
            className={`p-2 border rounded-md bg-gray-300 cursor-pointer text-center transition-all shadow-md hover:bg-gray-400 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {label}
    </button>
  );
};

const Sidebar = () => {
  const components = [
    { label: "1", type: "number" },
    { label: "2", type: "number" },
    { label: "3", type: "number" },
    { label: "4", type: "number" },
    { label: "5", type: "number" },
    { label: "6", type: "number" },
    { label: "7", type: "number" },
    { label: "8", type: "number" },
    { label: "9", type: "number" },
    { label: "0", type: "number" },
    { label: "+", type: "operator" },
    { label: "-", type: "operator" },
    { label: "*", type: "operator" },
    { label: "/", type: "operator" },
  ];

  return (
    <div className="w-40 p-4 bg-gray-500 border-r h-screen">
      <h2 className="text-lg font-bold mb-2">Drag Items</h2>
      <div className="grid grid-cols-2 gap-2">
        {components.map((comp, index) => (
          <SidebarItem key={index} label={comp.label} type={comp.type} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

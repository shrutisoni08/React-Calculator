import useCalculatorStore from "../store/useCalculatorStore";

const Display = () => {
  const { input } = useCalculatorStore();
  return (
    <div className="w-full p-3 mb-4 text-right bg-gray-200 rounded-md text-xl font-mono">
      {input || "0"}
    </div>
  );
};

export default Display;

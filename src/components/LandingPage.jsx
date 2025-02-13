import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex items-center justify-end h-screen bg-gradient-to-r from-[#E0F7FA] to-[#B2EBF2] px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-[#0CCCCC] mb-6 text-center">
          Choose Your Calculator
        </h1>
        <div className="space-y-4">
          <Link to="/simple-calculator">
            <button className="w-full py-3 bg-[#0CCCCC] text-white text-lg font-semibold rounded-lg shadow-md hover:bg-[#0096AE] transition duration-300">
              Simple Normal Calculator
            </button>
          </Link>
          <Link to="/age-calculator">
            <button className="w-full py-3 bg-[#0CCCCC] text-white text-lg font-semibold rounded-lg shadow-md hover:bg-[#0096AE] transition duration-300">
              Age Calculator
            </button>
          </Link>
          <Link to="/calorie-calculator">
            <button className="w-full py-3 bg-[#0CCCCC] text-white text-lg font-semibold rounded-lg shadow-md hover:bg-[#0096AE] transition duration-300">
              Calorie Calculator (kg)
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

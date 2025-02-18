import { create } from "zustand";
import { evaluate } from "mathjs";

const toRadians = (degrees) => (degrees * Math.PI) / 180;

const useCalculatorStore = create((set) => ({
  input: "",
  history: [],
  future: [],
  darkMode: false, // Add darkMode to initial state

  updateInput: (value) =>
    set((state) => ({
      input: value,
      history: [...state.history, state.input], // Save previous state for undo
      future: [], // Clear redo history when new input is added
    })),

    calculateResult: () => {
      set((state) => {
        try {
          if (!state.input) return { input: "Error" };
          
          let expression = state.input.replace(/sin\(([^)]+)\)/g, (_, angle) => `sin(${toRadians(parseFloat(angle))})`);
          expression = expression.replace(/cos\(([^)]+)\)/g, (_, angle) => `cos(${toRadians(parseFloat(angle))})`);
          expression = expression.replace(/tan\(([^)]+)\)/g, (_, angle) => `tan(${toRadians(parseFloat(angle))})`);
  
          const result = evaluate(expression);
          return {
            input: String(result),
            history: [...state.history, state.input],
            future: [],
          };
        } catch (error) {
          return { input: "Error" };
        }
      });
    },

  calculateScientific: (func) => {
    set((state) => {
      try {
        const expression = state.input;
        let result;

        switch (func) {
          case "sin":
            result = Math.sin(evaluate(expression));
            break;
          case "cos":
            result = Math.cos(evaluate(expression));
            break;
          case "tan":
            result = Math.tan(evaluate(expression));
            break;
          case "log":
            result = Math.log10(evaluate(expression));
            break;
          case "ln":
            result = Math.log(evaluate(expression));
            break;
          case "exp":
            result = Math.exp(evaluate(expression));
            break;
          case "sqrt":
            result = Math.sqrt(evaluate(expression));
            break;
          default:
            return { input: "Error" };
        }

        return {
          input: String(result),
          history: [...state.history, state.input],
          future: [],
        };
      } catch (error) {
        return { input: "Error" };
      }
    });
  },

  calculateAge: (birthDate) => {
    if (!birthDate) return;
    const birth = new Date(birthDate);
    if (isNaN(birth.getTime())) return; // Invalid date check

    const today = new Date();
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();

    if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
      years--;
      months += 12;
    }

    const ageString = `${years} years and ${months} months`;

    set((state) => ({
      input: ageString,
      history: [...state.history, state.input],
      future: [],
    }));
  },

  clearInput: () =>
    set(() => ({
      input: "",
      history: [],
      future: [],
    })),

  undo: () =>
    set((state) => {
      if (state.history.length === 0) return state;
      const prevInput = state.history[state.history.length - 1];
      return prevInput !== undefined
        ? {
            input: prevInput,
            history: state.history.slice(0, -1), // Remove last state from history
            future: [state.input, ...state.future], // Save current input in future for redo
          }
        : state;
    }),

  redo: () =>
    set((state) => {
      if (state.future.length === 0) return state;
      const nextInput = state.future[0];
      return nextInput !== undefined
        ? {
            input: nextInput,
            history: [...state.history, state.input], // Add current input to history
            future: state.future.slice(1), // Remove first item from future
          }
        : state;
    }),

  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return { darkMode: newMode };
    }),
}));

export default useCalculatorStore;
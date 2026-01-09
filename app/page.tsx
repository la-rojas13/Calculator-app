"use client";

import { useState, useEffect, useRef } from "react";
import { calculate } from "@/app/utils/calculatorFunctions";

export default function Home() {
  const [display, setDisplay] = useState("");
  const [currentNumber, setCurrentNumber] = useState("");
  const [previousNumber, setPreviousNumber] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];
  const operators = ["+", "-", "*", "/"];

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleNumberClick = (num: string) => {
    setCurrentNumber((prev) => prev + num);
    setDisplay((prev) => prev + num);
    focusInput();
  };

  const handleOperatorClick = (op: string) => {
    if (currentNumber === "") return;

    if (previousNumber === null) {
      setPreviousNumber(parseFloat(currentNumber));
    } else if (operator) {
      const result = calculate(
        previousNumber,
        parseFloat(currentNumber),
        operator
      );
      setPreviousNumber(result);
      setDisplay(result.toString());
    }

    setOperator(op);
    setCurrentNumber("");
    setDisplay((prev) => prev + op);
    focusInput();
  };

  const handleEquals = () => {
    if (operator && previousNumber !== null && currentNumber !== "") {
      const result = calculate(
        previousNumber,
        parseFloat(currentNumber),
        operator
      );
      setDisplay(result.toString());
      setPreviousNumber(null);
      setOperator(null);
      setCurrentNumber(result.toString());
    }
    focusInput();
  };

  const handleReset = () => {
    setDisplay("");
    setCurrentNumber("");
    setPreviousNumber(null);
    setOperator(null);
    focusInput();
  };

  const handleDelete = () => {
    setDisplay((prev) => prev.slice(0, -1));
    setCurrentNumber((prev) => prev.slice(0, -1));
    focusInput();
  };

  // Keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      if (numbers.includes(key)) {
        handleNumberClick(key);
      } else if (operators.includes(key)) {
        handleOperatorClick(key);
      } else if (key === "Enter" || key === "=") {
        handleEquals();
      } else if (key === "Backspace") {
        handleDelete();
      } else if (key.toLowerCase() === "c") {
        handleReset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentNumber, previousNumber, operator]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="calculator-body w-72 bg-gray-100 rounded-xl shadow-lg p-4">
        {/* Display */}
        <input
          ref={inputRef}
          type="text"
          readOnly
          value={display}
          className="mb-4 w-full p-2 text-right  rounded-lg bg-white text-lg"
        />

        {/* Reset Buttons */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button
            onClick={handleReset}
            className="p-2 bg-red-500 text-white rounded shadow font-semibold hover:bg-red-600"
          >
            AC
          </button>
          <button
            onClick={handleDelete}
            className="p-2 bg-yellow-500 text-white rounded shadow font-semibold hover:bg-yellow-600"
          >
            C
          </button>
          <button
            onClick={handleEquals}
            className="p-2 bg-green-500 text-white rounded shadow font-semibold hover:bg-green-600"
          >
            =
          </button>
        </div>

        {/* Numbers + Operators */}
        <div className="grid grid-cols-4 gap-2">
          {/* Numbers */}
          <div className="col-span-3 grid grid-cols-3 gap-2">
            {numbers.map((num) => (
              <button
                key={num}
                className="p-4 bg-white rounded-lg shadow text-lg font-medium hover:bg-gray-200"
                onClick={() => handleNumberClick(num)}
              >
                {num}
              </button>
            ))}
          </div>

          {/* Operators */}
          <div className="flex flex-col gap-2">
            {operators.map((op) => (
              <button
                key={op}
                className="operator-btn p-4 shadow text-lg font-medium hover:bg-blue-600"
                onClick={() => handleOperatorClick(op)}
              >
                {op}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

import React, { useEffect, useState } from "react";

interface PayoutCalculatorProps {
  articleCount: number;
  onRateChange: (rate: number) => void; // ✅ Add this prop
}

const PayoutCalculator: React.FC<PayoutCalculatorProps> = ({ articleCount, onRateChange }) => {
  const [rate, setRate] = useState<number>(0);

  // Load payout rate from localStorage
  useEffect(() => {
    const savedRate = localStorage.getItem("payoutRate");
    if (savedRate) {
      const parsed = parseFloat(savedRate);
      setRate(parsed);
      onRateChange(parsed); //Initialize parent with saved value
    }
  }, [onRateChange]);

  // Save rate to localStorage and update parent
  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRate = parseFloat(e.target.value);
    setRate(newRate);
    localStorage.setItem("payoutRate", newRate.toString());
    onRateChange(newRate); // Notify parent of change
  };

  const totalPayout = (rate * articleCount).toFixed(2);

  return (
    <div className="mt-4 border p-4 rounded-lg shadow-md bg-white dark:bg-gray-900">
      <h2 className="text-lg font-semibold mb-2">💵 Payout Calculator</h2>

      <label className="block mb-2">
        Payout Rate per Article:
        <input
          type="number"
          value={rate}
          onChange={handleRateChange}
          className="ml-2 p-1 border border-gray-300 rounded"
        />
      </label>

      <p className="mt-2 font-medium">
        Total Payout: <span className="text-green-600">${totalPayout}</span>
      </p>
    </div>
  );
};

export default PayoutCalculator;

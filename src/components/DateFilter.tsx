import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateFilterProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  const parseDate = (dateStr: string) => (dateStr ? new Date(dateStr) : null);

  return (
    <div className="flex gap-4 items-center flex-wrap">
      <div>
        <label className="block text-sm font-medium">From:</label>
        <DatePicker
          selected={parseDate(startDate)}
          onChange={(date: Date | null) => {
            if (date) onStartDateChange(date.toISOString().split("T")[0]);
          }}
          dateFormat="yyyy-MM-dd"
          className="p-2 border rounded-md w-full"
          placeholderText="Select start date"
          isClearable
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={100}
          autoComplete="off"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">To:</label>
        <DatePicker
          selected={parseDate(endDate)}
          onChange={(date: Date | null) => {
            if (date) onEndDateChange(date.toISOString().split("T")[0]);
          }}
          dateFormat="yyyy-MM-dd"
          className="p-2 border rounded-md w-full"
          placeholderText="Select end date"
          isClearable
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={100}
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default DateFilter;

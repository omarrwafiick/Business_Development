import React from 'react';

export default function CustomeMultipleSelect({ name, data, value, onChange }) {
  return (
    <div className='w-full mb-4'>
      <label htmlFor="custome-select" className="block mb-2 text-sm capitalize font-medium text-gray-900 dark:text-white">{name}</label>
      <select
        multiple
        value={value}
        onChange={(e) => {
          const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
          onChange(selectedOptions);
        }}
        required
        id="custome-select"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-[#15A0DC] focus:border-[#15A0DC]
             block w-full p-2 h-40"  
      >
        {data?.map((item, index) => (
          <option key={item[1]} value={item[1]}>
            {item[0]}
          </option>
        ))}
      </select>
    </div>
  );
}

import React from 'react';

const SidePanel = () => {
  return (
    <div className="w-72 h-screen bg-gray-100 shadow-lg p-5 flex flex-col">
      <label htmlFor="file-upload" className="mb-4 px-4 py-2 text-black rounded cursor-pointer">
        Add PDF
      </label>
      <input id="file-upload" type="file" className="hidden" accept="application/pdf" multiple />
      <div className="overflow-y-auto flex-1 mt-4">
        {/* Placeholder for PDF items */}
        <div className="bg-white p-4 mb-4 shadow-sm rounded">PDF File 1</div>
        <div className="bg-white p-4 mb-4 shadow-sm rounded">PDF File 2</div>
        <div className="bg-white p-4 mb-4 shadow-sm rounded">PDF File 3</div>
      </div>
    </div>
  );
};

export default SidePanel;

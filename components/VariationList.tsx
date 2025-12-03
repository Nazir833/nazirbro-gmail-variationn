
import React, { useState } from 'react';
import { GmailVariation } from '../types';

interface VariationListProps {
  variations: GmailVariation[];
}

const VariationList: React.FC<VariationListProps> = ({ variations }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (address: string, id: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Optionally show a user-friendly error message
    }
  };

  if (variations.length === 0) {
    return null; // Don't render anything if no variations
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Generated Variations</h2>
      <ul className="space-y-3">
        {variations.map((variation) => (
          <li
            key={variation.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200"
          >
            <span className="text-gray-800 break-all text-sm sm:text-base pr-2">
              {variation.address}
            </span>
            <button
              onClick={() => handleCopy(variation.address, variation.id)}
              className={`flex items-center px-3 py-1 text-xs sm:text-sm font-medium rounded-md transition duration-150 ease-in-out
                ${copiedId === variation.id
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75'
                }`}
              aria-label={copiedId === variation.id ? `Copied ${variation.address}` : `Copy ${variation.address}`}
            >
              {copiedId === variation.id ? (
                <>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                  Copy
                </>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VariationList;

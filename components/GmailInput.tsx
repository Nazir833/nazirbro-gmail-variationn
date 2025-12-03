
import React, { useState } from 'react';

interface GmailInputProps {
  onGenerate: (email: string) => void;
  isLoading: boolean;
}

const GmailInput: React.FC<GmailInputProps> = ({ onGenerate, isLoading }) => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  const isValidGmail = (input: string): boolean => {
    // Basic validation for a non-empty string that looks like an email and ends with @gmail.com
    const emailRegex = /^[^\s@]+@gmail\.com$/i;
    return emailRegex.test(input);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trim();
    setEmail(inputValue);
    if (inputValue && !isValidGmail(inputValue)) {
      setError('Please enter a valid Gmail address (e.g., example@gmail.com).');
    } else {
      setError('');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValidGmail(email) && !isLoading) {
      onGenerate(email);
      setError('');
    } else if (!email) {
      setError('Gmail address cannot be empty.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md mb-6">
      <div className="mb-4">
        <label htmlFor="gmail-input" className="block text-gray-700 text-sm font-bold mb-2">
          Enter Base Gmail Address
        </label>
        <input
          id="gmail-input"
          type="text"
          value={email}
          onChange={handleInputChange}
          placeholder="e.g., john.doe@gmail.com"
          className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-label="Gmail address input"
        />
        {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
      </div>
      <button
        type="submit"
        disabled={!isValidGmail(email) || isLoading}
        className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ${
          (!isValidGmail(email) || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        aria-live="polite"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </div>
        ) : (
          'Generate Variations'
        )}
      </button>
    </form>
  );
};

export default GmailInput;

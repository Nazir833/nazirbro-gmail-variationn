
import React, { useState, useCallback } from 'react';
import GmailInput from './components/GmailInput';
import VariationList from './components/VariationList';
import { generateGmailVariations } from './services/gmailService';
import { GmailVariation } from './types';

function App() {
  const [variations, setVariations] = useState<GmailVariation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerateVariations = useCallback((baseEmail: string) => {
    setIsLoading(true);
    // Simulate an async operation if needed, though generateGmailVariations is synchronous.
    // This allows the loading state to show up briefly.
    setTimeout(() => {
      const generated = generateGmailVariations(baseEmail);
      setVariations(generated);
      setIsLoading(false);
    }, 300); // Small delay for UX feedback
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8 mt-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Gmail Variator
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Generate various casing and numerical suffix variations for your Gmail address.
        </p>
      </header>

      <main className="w-full max-w-lg flex flex-col gap-6">
        <GmailInput onGenerate={handleGenerateVariations} isLoading={isLoading} />
        {variations.length > 0 && (
          <VariationList variations={variations} />
        )}
      </main>

      <footer className="mt-auto py-6 text-gray-500 text-sm text-center">
        <p>&copy; {new Date().getFullYear()} Gmail Variator. All rights reserved.</p>
        <p className="mt-2 text-xs">
          Note: Gmail is case-insensitive and ignores dots in the username, so many generated
          variations will resolve to the same email address.
        </p>
      </footer>
    </div>
  );
}

export default App;

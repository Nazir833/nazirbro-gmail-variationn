
import { GmailVariation } from '../types';

/**
 * Generates simple variations of a given Gmail address.
 * Variations include different letter casings and optional numerical suffixes.
 * Gmail is case-insensitive and ignores dots in the username,
 * so many of these variations will resolve to the same address.
 *
 * @param baseEmail The base Gmail address (e.g., "example@gmail.com").
 * @returns An array of generated GmailVariation objects.
 */
export function generateGmailVariations(baseEmail: string): GmailVariation[] {
  const variations: Set<string> = new Set(); // Use a Set to ensure unique variations
  const parts = baseEmail.split('@');
  if (parts.length !== 2 || !parts[1].toLowerCase().endsWith('gmail.com')) {
    // Return empty if not a valid Gmail format or not a Gmail address
    return [];
  }

  const username = parts[0];
  const domain = parts[1].toLowerCase(); // Ensure domain is always lowercase

  // Generate casing variations for the username
  const casingVariations: string[] = [];
  casingVariations.push(username.toLowerCase()); // All lowercase
  casingVariations.push(username.toUpperCase()); // All uppercase
  casingVariations.push(username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()); // Capitalize first letter
  casingVariations.push(username); // Original casing

  // Add a few mixed-case variations for visual diversity
  if (username.length > 2) {
    casingVariations.push(
      username.slice(0, 1).toLowerCase() +
        username.slice(1, 2).toUpperCase() +
        username.slice(2).toLowerCase()
    );
    casingVariations.push(
        username.slice(0, username.length - 1).toLowerCase() +
        username.slice(username.length - 1).toUpperCase()
    );
  }

  // Ensure unique casing variations
  const uniqueCasingVariations = Array.from(new Set(casingVariations));

  // Add simple variations without numbers first
  uniqueCasingVariations.forEach(casingUser => {
    variations.add(`${casingUser}@${domain}`);
  });

  // Add number variations to each unique casing variation
  const numberSuffixes = ['', '1', '7', '42', '123', '2024']; // Common numbers

  uniqueCasingVariations.forEach(casingUser => {
    numberSuffixes.forEach(suffix => {
      if (suffix === '' && casingUser === username) {
        // Skip adding without suffix if it's the original, as it's already added.
        // This ensures we don't duplicate the plain original email if already present.
        return;
      }
      variations.add(`${casingUser}${suffix}@${domain}`);
    });
  });

  // Convert Set to Array of GmailVariation objects
  return Array.from(variations).map((address, index) => ({
    id: `variation-${index}`,
    address: address,
  }));
}

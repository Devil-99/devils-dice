import crypto from "crypto";

/**
 * Generate a secure random password
 * @param {Object} options
 * @param {number} options.length - Password length (min 8)
 * @param {boolean} options.uppercase
 * @param {boolean} options.lowercase
 * @param {boolean} options.numbers
 * @param {boolean} options.symbols
 * @returns {string}
 */

export function generatePassword({
  length = 8,
  uppercase = true,
  lowercase = true,
  numbers = true,
  symbols = true
} = {}) {
  if (length < 8) {
    throw new Error("Password length must be at least 8 characters");
  }

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const special = "!@#$%^&*()";

  let allowedChars = "";
  const requiredChars = [];

  if (uppercase) {
    allowedChars += upper;
    requiredChars.push(getRandomChar(upper));
  }

  if (lowercase) {
    allowedChars += lower;
    requiredChars.push(getRandomChar(lower));
  }

  if (numbers) {
    allowedChars += digits;
    requiredChars.push(getRandomChar(digits));
  }

  if (symbols) {
    allowedChars += special;
    requiredChars.push(getRandomChar(special));
  }

  if (!allowedChars) {
    throw new Error("At least one character type must be enabled");
  }

  const remainingLength = length - requiredChars.length;
  const passwordChars = [...requiredChars];

  for (let i = 0; i < remainingLength; i++) {
    passwordChars.push(getRandomChar(allowedChars));
  }

  // Shuffle to avoid predictable positions
  return shuffleArray(passwordChars).join("");
}

/**
 * Get a cryptographically secure random character
 */
function getRandomChar(charset) {
  const index = crypto.randomInt(0, charset.length);
  return charset[index];
}

/**
 * Fisher-Yates shuffle using crypto randomness
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = crypto.randomInt(0, i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

import { PASSWORD_CONFIG } from '../constants/passwordConfig';

interface GeneratePasswordOptions {
  length: number;
  includeUpperCase: boolean;
  includeLowerCase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

export const generatePassword = ({
  length,
  includeUpperCase,
  includeLowerCase,
  includeNumbers,
  includeSymbols
}: GeneratePasswordOptions): string => {
  let characterList = '';
  
  if (includeUpperCase) characterList += PASSWORD_CONFIG.CHAR_SETS.upperCase;
  if (includeLowerCase) characterList += PASSWORD_CONFIG.CHAR_SETS.lowerCase;
  if (includeNumbers) characterList += PASSWORD_CONFIG.CHAR_SETS.numbers;
  if (includeSymbols) characterList += PASSWORD_CONFIG.CHAR_SETS.symbols;

  if (!characterList) {
    throw new Error('En az bir karakter türü seçmelisiniz');
  }

  let result = '';
  for (let i = 0; i < length; i++) {
    const characterIndex = Math.floor(Math.random() * characterList.length);
    result += characterList.charAt(characterIndex);
  }
  
  return result;
};
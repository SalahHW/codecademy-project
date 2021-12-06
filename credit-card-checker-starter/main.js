// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]

// Hash of card companies
const cardCompanies = {
  3: 'American Express',
  4: 'Visa',
  5: 'Mastercard',
  6: 'Discover',
};

/**
 * Return the sum of a serial number folowing the Luhn formula
 * 
 * @param {Array} array 
 * @returns number
 */
const accuLuhnFormula = (array) => {
  let accu = 0;
  // We start the loop at 1 to exclude the control digit
  for (let i = 1; i < array.length; i++) {
    const currentDigit = array[array.length - 1 - i];
    accu += i % 2 === 0 ? currentDigit : calculatePerTwo(currentDigit);
  }
  return accu;
};

/**
 * Check if credit card number is valid folowing the Luhn formula
 * 
 * @param {Array} array 
 * @returns bool
 */
const validateCred = (array) => (accuLuhnFormula(array) + array[array.length - 1]) % 10 === 0;

/**
 * Double the value than sum both digits of the result
 * if the product is greater than 10, otherwise return the doubled value
 * 
 * @param {number} value 
 * @returns number
 */
const calculatePerTwo = (value) => {
  const perTwo = value * 2;
  // Substracting 9 is a shortcut to obtain the sum of both digits
  return perTwo >= 10 ? perTwo - 9 : perTwo;
};

/**
 * Take an invalid serial number and change its control digit to a valid one
 * 
 * @param {Array} serial 
 * @returns Array
 */
const convertToValid = (serial) => {
  const validCard = serial.slice();
  const sum = accuLuhnFormula(validCard);
  let checkDigit = 10 - sum % 10;
  if (checkDigit === 10) {
    checkDigit = 0;
  }
  validCard[validCard.length - 1] = checkDigit;
  return validCard;
};

/**
 * Return an array of invalid cards
 * 
 * @param {Array} cards 
 * @returns Array
 */
const findInvalidCards = (cards) => cards.filter(card => !validateCred(card));

/**
 * Return an array of companies extracted from invalid cards
 * 
 * @param {Array<Array<number>>} invalidCards 
 * @returns Array
 */
const idInvalidCardCompanies = (invalidCards) => {
  const involvedCompanies = [];
  invalidCards.forEach(card => {
    const companyId = parseInt(card[0]);
    const companyExist = companyId in cardCompanies;
    // Check if the company is already involved
    if (companyExist && involvedCompanies.indexOf(cardCompanies[companyId]) < 0) {
      involvedCompanies.push(cardCompanies[companyId]);
    } else if (!companyExist) {
      console.log('Company not found');
    }
  });
  return involvedCompanies;
};

//Testing functions
//console.log(validateCred(valid1)); // should print true
//console.log(findInvalidCards(batch)); // should print an array of invalid cards
//console.log(idInvalidCardCompanies(batch)); // should print an array of companies involved by an invalid card

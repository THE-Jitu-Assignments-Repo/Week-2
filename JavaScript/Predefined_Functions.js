/*Predefined functions
JavaScript has several top-level, built-in functions*/


//parseInt()
// The parseInt()
// function parses a string argument and returns an integer of the specified radix(the base in mathematical numeral systems).


/* The parseInt method parses a value as a string and returns the first integer.

A radix parameter specifies the number system to use:

2 = binary, 8 = octal, 10 = decimal, 16 = hexadecimal.

If radix is omitted, JavaScript assumes radix 10. If the value begins with "0x", JavaScript assumes radix 16.

Syntax
parseInt(string, radix)*/

function roughScale(x, base) {
  const parsed = parseInt(x, base);
  if (isNaN(parsed)) { return 0; }
  return parsed * 100;
}

console.log(roughScale(' 0xF', 16));
// expected output: 1500

console.log(roughScale('321', 2));
// expected output: 0
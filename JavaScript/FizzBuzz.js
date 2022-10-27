/*Write a function that prints the numbers from 1 to 100 and for multiples 
of ‘3’ print “Fizz” instead of the number, for the multiples of ‘5’ print 
“Buzz” and print "FizzBuzz" for the numbers divisible by both 3 and 5. 

To manage this task you're supposed to incorporate conditional Logic, 
function definition and recursion (What we learnt today).

NB: Don't use loops.*/


function FizzBuzz(num = 0){ // To prevent my code from crushing, add default param and initialize it to a base/default number
    
    if(num == 100) return;// this marks when to stop our recursive function

    // conditions to be met by the num
    if (num % 3 === 0 && num % 5 === 0){ // if our num is both divisible by 3 and 5 print to the console: FizzBuzz
        console.log("FizzBuzz")
    }else if (num % 5 === 0 ){// if our num is divisible by 5 print to the console: Buzz
        console.log("Buzz")
    } else if (num % 3 === 0){// if our num is divisible by 3 print to the console: Fizz
        console.log("Fizz")
    } else{ // if our num is not both divisible by 3 and 5 print to the console: num
        console.log(num)
    }
    FizzBuzz(num + 1) // The func is calling itself until the condition is met: num is equal to 100
}

FizzBuzz(0) 
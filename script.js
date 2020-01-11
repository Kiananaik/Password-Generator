var upperChar = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var lowerChar = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var numChar = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var specialChar = ["@", "%", "+", "\\", "/", "'", "!", "#", "$", "^", "?", ":", ",", ")", "(", "}", "{", "]", "[", "~", "-", "_", "."];

function userChooses() {
    var yesUpper = confirm("Should we put upper case letters in your password? Click cancel for no.");
    var yesLower = confirm("Should we put lower case letters in your password? Click cancel for no.");
    var yesNum = confirm("Should we put numbers in your password? Click cancel for no.");
    var yesSpecial = confirm("Should we put special characters into your password? Click cancel for no.");
    if (yesUpper === false && yesLower === false && yesNum === false && yesSpecial === false) {
        alert("You gotta say OK to at least one of them, bub...");
        return;
    }
    var passLength = parseInt(prompt("What is your desired password length? (It's gotta be between 8 and 128 characters)"));
    // parseInt turn a string into a number.
    // isNaN will check if a value is anything other than a number.
    if (isNaN(passLength) === true) {
        alert("That wasn't just a number, dummy. Restart!");
        return;
    }
    // ends prompt if the password length is not between 8 and 129 characters.
    if (passLength > 128 || passLength < 8) {
        alert("Did I stutter? The password length needs to be between 8 and 129 characters. Restart!");
        return;
    }
    // My first working object. It's gonna keep the values from this function.
    var userChoice = {yesUpper: yesUpper, yesLower: yesLower, yesNum: yesNum, yesSpecial: yesSpecial, passLength: passLength};
    return userChoice;
    // creates userChoice from this function for future use.
}

// I want to make sure that at least 1 of each kind of desired 
// character was actually chosen.
function checkPass() {
    if (choices.yesUpper) {
        const foundUpper = finalPass.some(r=> upperChar.indexOf(r) >= 0);  
        return foundUpper;
    }
    if (choices.yesLower) {
        const foundLower = finalPass.some(r=> lowerChar.indexOf(r) >= 0);
        return foundLower;
    }
    if (choices.yesNum) {
        const foundNum = finalPass.some(r=> numChar.indexOf(r) >= 0);
        return foundNum;
    }
    if (choices.yesSpecial) {
        const foundSpecial = finalPass.some(r=> specialChar.indexOf(r) >= 0);
        return foundSpecial;
    }
    var filterCheck = {foundUpper: foundUpper, foundLower: foundLower, foundNum: foundNum, foundSpecial: foundSpecial};        
    filterCheck = filterCheck.push(userChoice[Object.keys(userChoice)[4]]);
    var check = _.isEqual(filterCheck, userChoice);
    console.log(check);
    if (check) {
        finalPass = finalPass.join();
        return checkPass() = true;
    }
    else {
        finalPass.length = 0;
        return checkPass() = false;
    }
}

function generatePass() {
    var choices = userChooses();
    var fullArr = [];
    var finalPass = [];
    // var eachCharArr = [];
    if (choices.yesUpper) {
        fullArr = fullArr.concat(upperChar);
    }
    if (choices.yesLower) {
        fullArr = fullArr.concat(lowerChar);
    }
    if (choices.yesNum) {
        fullArr = fullArr.concat(numChar);
    }
    if (choices.yesSpecial) {
        fullArr = fullArr.concat(specialChar);
    }
    // This for loop will take a random entry from the
    // combined array and place them into a new array one
    // by one until you have the desired amount of password characters.
    do {
        for (var i = 0; i < choices.passLength; i++) {
            // var randChar = fullArr[Math.floor(Math.random() * fullArr.length)]; 
            finalPass = finalPass.push(fullArr[Math.floor(Math.random() * fullArr.length)]);
            // return checkPass; !!!!!!!!!!!!!!!!!!!!! Doesn't make sense.
        }
    } while (checkPass() === false);
    return generatePass() = finalPass;    // -------- WHERE THE ACTUAL PASSWORD IS DECIDED ON!!!!!!!
}
// Get references to the #copy and #generate elements
var copyBtn = document.querySelector(".copy");
var generateBtn = document.querySelector(".generate");

// Write password to the .password input
function writePass() {
  var pass = generatePass();
  var passText = document.querySelector(".password");
  passText.value = pass;
  copyBtn.removeAttribute("disabled");
  copyBtn.focus();
}
function copyToClipboard() {
  var passText = document.querySelector(".password");
  passText.select();
  document.execCommand("copy");
  alert("Your password " + passText.value + " was copied to your clipboard.");
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePass);
// Add event listener to copy button
copyBtn.addEventListener("click", copyToClipboard);


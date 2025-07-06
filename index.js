// import * as imageConversion from 'image-conversion'; // import the libary for image conversion
// const imageConversion = require("image-conversion") // import the libary for image conversion

const convertBTN = document.querySelector(".convertBTN"); // NOTE: ALWAYS PUT A BLOODY FULL STOP when calling a class
// convertBTN.onclick = convert()
convertBTN.addEventListener("click", convert) // add event listener for mouse clicks

function convert() {
    console.log("converting");
    convertBTN.innerHTML = "Converting"
}
// import * as imageConversion from 'image-conversion'; // import the libary for image conversion
// const imageConversion = require("image-conversion") // import the libary for image conversion

const convertBTN = document.querySelector(".convertBTN"); // NOTE: ALWAYS PUT A BLOODY FULL STOP when calling a class
const inpURL = document.getElementById("inputURL")
// inpURL.addEventListener("submit", )
convertBTN.addEventListener("click", convert) // add event listener for mouse clicks

var url = inpURL.value // global / hoisted var

function updateURL() {
    url = inpURL.value
}

function hasURL(  ) { // check if the input box contains a valid url
    if (url.length > 0){return true;}
    return false; 
}

function isPNG(type) {
    console.log("checking if png")
    if (type=="png") { return true;}
    return false;
}



function convert() {
    updateURL() // get latest url
    let fileExt = url.slice(url.length-3, url.length).toLowerCase()

    
    // console.log("converting the file: " + url);
    
    
    if (!hasURL()){ // first check if has a URL
       console.log("Empty / No URL")
       alert("No URL given") 
    } 
    else if( isPNG(fileExt) ) { // then check if already png
        console.log("This is already a PNG")
        // setTimeout( close, 1000) // set timer for 1000ms(1s) and then close
    }
    else{ // then proceed with conversion
        // console.log("Can convert")
        console.log("converting the file: " + url);
        convertBTN.innerHTML = "Converting"

        // console.log(fileExt + " is file extension") 

        let newFile = imageConversion.dataURLtoFile(url, ["image/png"])
    }

    
}


// test image (THESE ARE CC-0):
/*  https://cdn.stocksnap.io/img-thumbs/280h/house-cat_MIZQ6V1ZJU.jpg - cat
    https://w0.peakpx.com/wallpaper/333/363/HD-wallpaper-joker-cool.jpg - joker why so serious
*/


// https://www.w3schools.com/js/js_timing.asp look at JS timing
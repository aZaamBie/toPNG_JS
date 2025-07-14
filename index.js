// import * as imageConversion from 'image-conversion'; // import the libary for image conversion
// import * as imageConversion from './node_modules/image-conversion/dist/image-conversion.min.js';
// import * as imageConversion from 'node_modules/image-conversion/build/conversion.js';
// const imageConversion = require("image-conversion") // import the libary for image conversion


const convertBTN = document.querySelector(".convertBTN"); // NOTE: ALWAYS PUT A BLOODY FULL STOP when calling a class
const inpURL = document.getElementById("inputURL")
// inpURL.addEventListener("submit", )
convertBTN.addEventListener("click", convert) // add event listener for mouse clicks

var url = inpURL.value // global / hoisted var
var urlList = [];

// check if Library is loaded

document.addEventListener('DOMContentLoaded', () => {
    // Check if the library is loaded
    if (typeof imageConversion === 'undefined') {
        console.error('image-conversion library not loaded!');
        return; } 
} )

// if (typeof imageConversion === 'undefined') {
//   throw new Error("image-conversion library failed to load! Check the CDN script.");
// }

// proceed

function updateURL() { // get most recent url
    url = inpURL.value
    urlList.push(url)


    // check the most recent entered URL's \\
    // for (x in urlList){ // check whether url already exists in list
    //     if x
    // }

    // console.log(urlList)
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



async function convert() {
    updateURL() // get latest url
    let fileExt = url.slice(url.length-3, url.length).toLowerCase()
    
    
    if (!hasURL()){ // first check if has a URL
       console.log("Empty / No URL")
       alert("No URL given") 
    } 
    else if( isPNG(fileExt) ) { // then check if already png
        console.log("This is already a PNG")
        // setTimeout( close, 1000) // set timer for 1000ms(1s) and then close
    }
    else{ // then proceed with conversion

        console.log("converting the file: " + url);
        convertBTN.textContent = "Converting"

        
        // attempt 2
        // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        // let response = await fetch(proxyUrl + url)
        let response = await fetch(url)
        let blob = await response.blob()
        
        // let pngIMG = await imageConversion.compress(blob,1.0)
        let pngIMG = await imageConversion.compress(blob, {
            quality: 1.0,
            type: "image/png"}
        );
        imageConversion.downloadFile(pngIMG)

        // attempt 3
        // 1. First await the fetch to get the Response object
        // const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);

        // // 3. Now await the blob() method on the Response
        // const blob = await response.blob();

        // if (!blob.type.startsWith('image/')) {
        //     throw new Error('The URL does not point to an image file');
        // }
        
        // const pngBlob = await imageConversion.compress(blob, 1.0); // convert image

        // imageConversion.downloadFile(pngBlob, "converted.png") // download


    }

    
}


// test image (THESE ARE CC-0):
/*  https://cdn.stocksnap.io/img-thumbs/280h/house-cat_MIZQ6V1ZJU.jpg - cat
    https://w0.peakpx.com/wallpaper/333/363/HD-wallpaper-joker-cool.jpg - joker why so serious
*/


// https://www.w3schools.com/js/js_timing.asp look at JS timing
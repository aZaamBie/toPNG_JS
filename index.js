// import * as imageConversion from 'image-conversion'; // import the libary for image conversion
// const imageConversion = require("image-conversion") // import the libary for image conversion

const convertBTN = document.querySelector(".convertBTN"); // NOTE: ALWAYS PUT A BLOODY FULL STOP when calling a class
const inpURL = document.getElementById("inputURL")
// convertBTN.onclick = convert()
inpURL.addEventListener("submit", )
convertBTN.addEventListener("click", convert) // add event listener for mouse clicks

function hasURL(  ) {

}

function convert() {
    let url = inpURL.value
    let fileExt = url.slice(url.length-3, url.length)

    

    // console.log("converting the file: " + url);
    convertBTN.innerHTML = "Converting"

    if (url != ""){
        console.log("Can convert")
        console.log("converting the file: " + url);

        console.log(fileExt + " is file extension")
    }
    else if( fileExt ) { // get the last 3 characters

    }
    else{
        console.log("Empty")
        alert("No URL given")
    }

    
}


// test image (THESE ARE CC-0):
/* https://cdn.stocksnap.io/img-thumbs/280h/house-cat_MIZQ6V1ZJU.jpg - cat
*/
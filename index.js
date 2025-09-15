/* VARIABLES */
// import * as imageConversion from 'image-conversion'; // import the libary for image conversion
// const imageConversion = require("image-conversion") // import the libary for image conversion

const convertBTN = document.querySelector(".convertBTN"); // NOTE: ALWAYS PUT A BLOODY FULL STOP when calling a class
const btnText = document.getElementById("btnText")
const inpURL = document.getElementById("inputURL")
const urlBox = document.getElementById("urlBox")
convertBTN.addEventListener("click", convert) // add event listener for mouse clicks
inpURL.addEventListener("change", getPreviewName )

const fTypeMenu = document.getElementById('fType-select')
fTypeMenu.addEventListener("change", setFileType) // change better than run for this

// urlBox.addEventListener("mouseover", () => previewHover(true)) // need to wrap the calls in arrow functions for it work
// urlBox.addEventListener("mouseout", () => previewHover(false)) // ^ same here

var url = inpURL.value // global / hoisted var
var urlList = [];

var targetType = "png" // default

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

// CORS stuff
// Alternative CORS proxies:
const proxies = [
  'https://api.codetabs.com/v1/proxy?quest=',
  'https://corsproxy.io/?',
  'https://proxy.cors.sh/'
];


/* METHODS */

function updateURL() { 
    url = inpURL.value // get most recent url
    urlList.push(url)

    // check the most recent entered URL's \\
    // for (x in urlList){ // check whether url already exists in list
    //     if x
    // }

    // console.log(urlList)
}

// validations
function hasURL(  ) { // check if the input box contains a valid url
    if (url.length > 0){return true;}
    return false; 
}

function isPNG(type) {
    if (type=="png") { return true;}
    return false;
}
//


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
        btnText.textContent = "Converting"
        
        /* attempt 2 */
        let response =  await fetch(url) //await fetch(`https://cors-anywhere.herokuapp.com/${url}`); //
        let blob = await response.blob()
        
        // let pngIMG = await imageConversion.compress(blob,1.0) // test 2
        let pngIMG = await imageConversion.compress(blob, { // test MAIN
            quality: 1.0,
            type: "image/png"}
        );

        let parts = url.split("/")
        let filename = parts[parts.length-1]// get the substring from index 0 , until and excluding the last 4 characters (which are the full stop and file extension)
        
        let newFname= getPreviewName(filename, targetType)
        // console.log(newFname + " is new name | convert()")
        imageConversion.downloadFile(pngIMG, newFname) // download image with new filename as associated file name
        // imageConversion.downloadFile(pngIMG, "converted.png") // download with default name [ THIS WORKS]
        /* END OF 2 */

        btnText.textContent = "Finished conversion"
        setTimeout( // reset the button text \\
            () => {btnText.textContent = "Convert"} // pass an arrow-function, so that text isn't immediately changed
            , 2000) // after 2 seconds

    }

}

function getPreviewName(name="", type=targetType){
    if (name==""){ // check for blanks
        fName.innerHTML = "Preview filename: N/A";
        return
    }
    updateURL() // void: get the latest url
    name = url

    let parts = name.split("/") // split the url into different segments, seperated by the forward slash
    let filename = parts[parts.length-1] // get the very last segment, which USUALLY is the filename
    let newName = filename.substring(0, filename.length-3) + type;
    // console.log(newName+ " is name | getPreviewName")

    const fName = document.getElementById("namePreview") // get the namePreview <p> element
    fName.innerHTML = "Preview filename: " + newName
    // return fName // why was i returning the DOM element?? // 
    return newName;// BLOODY IDIOT. YOU'RE MEANT TO RETURN THE STRING, NOT THE DOM ELEMENT!!
}

function setFileType(){ //
    let type = document.getElementById('fType-select').value.toLowerCase()
    // console.log("Type is: " + type)
    targetType = type
}

function previewHover(active) {
    const fName = document.getElementById("namePreview")
    if (active) {
        fName.classList.add("preview-animated");
        console.log("mouse over preview");
    } else {fName.classList.remove("preview-animated"); console.log("mouse exit preview")}
    
}

// test image (THESE ARE CC-0):
/*  https://cdn.stocksnap.io/img-thumbs/280h/house-cat_MIZQ6V1ZJU.jpg - cat
    https://w0.peakpx.com/wallpaper/333/363/HD-wallpaper-joker-cool.jpg - joker why so serious
*/


// https://www.w3schools.com/js/js_timing.asp look at JS timing
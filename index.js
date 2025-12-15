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

function updateURL() 
{ 
    url = inpURL.value // get most recent url
    urlList.push(url)

    // check the most recent entered URL's \\
    // for (x in urlList){ // check whether url already exists in list
    //     if x
    // }

    // console.log(urlList)
}

// validation checks
function hasURL(  ) 
{ // check if the input box contains a valid url
    if (url.length > 0){return true;}
    return false; 
}


function isDesiredType(type) // check if the current image is the same as the desired link
{
    // console.log("Type local: " + type + " | Type targetted: " + targetType)
    if (type.toLowerCase() == targetType.toLowerCase()) { return true }
    return false;
}

function isFromReddit(link) 
{
    let reddit = "preview.redd.it"
    if (link.includes(reddit)) { 
        // console.log("This is from reddit");

        // alert("Redditor found!")

        const img = document.createElement("redditImg")

        // image attributes
        img.src = "https://redditbrand.lingoapp.com/a/Reddit-Icon-FullColor-1E887y?asset_token=g1y2u50KuCzT5SDGlUBPx2EUVUbGQ8jbNtsP2kzawsI&v=42"
        img.width = 300; img.height = 300;

        // Set position using inline styles
        img.style.position = 'absolute'; // or 'fixed', 'relative'
        img.style.left = '1px';
        img.style.top = '5px';
        img.style.zIndex = '10';

        // document.body.appendChild(img);

        const preview = document.getElementById("imgPreview")
        preview.appendChild(img)


        console.log("This is from reddit");
        return true 
    }

    console.log("NOT from reddit")
    return false

}
//


async function convert() {
    updateURL() // get latest url

    // split and process the URL string. Get the new fileName from
    let parts = url.split("/")
    let filename = parts[parts.length-1]// get the substring from index 0 , until and excluding the last 4 characters (which are the full stop and file extension)
    let newFname= getPreviewName(filename, targetType, true) // handle the file new naming here
    let fileExtension = newFname.slice(newFname.length-3, newFname.length).toLowerCase() // retrieve only the file Extensions (.png, .jpg)
    
    if (!hasURL()){ // first check if has a URL
       console.log("Empty / No URL")
       alert("No URL given") 
    } 
    else if( isDuplicate(fileExtension) ) { // then check if file is it's desired fileType.
        console.log("This is already a " + targetType) // console.log("This is already a PNG")
        alert("This is already the desired file type.") 
        // setTimeout( close, 1000) // set timer for 1000ms(1s) and then close
    }
    else{ // then proceed with conversion
        btnText.textContent = "Converting"
        

        let response =  await fetch(url) //await fetch(`https://cors-anywhere.herokuapp.com/${url}`); //
        let blob = await response.blob()
        
        // let pngIMG = await imageConversion.compress(blob,1.0) // test 2
        let pngIMG = await imageConversion.compress(blob, { // test MAIN
            quality: 1.0,
            type: "image/png"}
        );

        // let parts = url.split("/")
        // let filename = parts[parts.length-1]// get the substring from index 0 , until and excluding the last 4 characters (which are the full stop and file extension)
        
        // let newFname= getPreviewName(filename, targetType) // handle the file new naming here
        // console.log(newFname + " is new name | convert()")
        imageConversion.downloadFile(pngIMG, newFname) // download image with new filename as associated file name
        // imageConversion.downloadFile(pngIMG, "converted.png") // download with default name [ THIS WORKS]


        btnText.textContent = "Finished conversion"
        setTimeout( // reset the button text \\
            () => {btnText.textContent = "Convert"} // pass an arrow-function, so that text isn't immediately changed
            , 2000) // after 2 seconds

    }

}

function getPreviewName(name="", type=targetType, withExtension=false){
    if (name=="" || name==" "){ // check for blanks
        fName.innerHTML = "Preview filename: N/A";
        return
    }
    updateURL() // void: get the latest url
    name = url

    let parts = name.split("/") // split the url into different segments, seperated by the forward slash
    let filename = parts[parts.length-1] // get the very last segment, which USUALLY is the filename
    let newName = filename.substring(0, filename.length-3) + type;

    // check if from Reddit --> change filename
    if ( isFromReddit(url) )
    {
        let end = filename.indexOf("?") // stopping newName by the first ? [This could change in future]
        let subtractFactor = 3
        if (withExtension) { subtractFactor = 0; type="" } // subtracting by a value from the end position, to remove the original fileType.
        // subtracting from 3 works on the latest version of reddit [15/12/2025]

        newName = filename.substring(0, end-subtractFactor) + type;
    }

    const fName = document.getElementById("namePreview") // get the namePreview <p> element
    fName.innerHTML = "Preview filename: " + newName


    // return fName // why was i returning the DOM element?? // 
    return newName;// BLOODY IDIOT. YOU'RE MEANT TO RETURN THE STRING, NOT THE DOM ELEMENT!!
}

function setFileType() //
{ 
    let type = document.getElementById('fType-select').value.toLowerCase()
    targetType = type
}

function previewHover(active) 
{
    const fName = document.getElementById("namePreview")
    if (active) {
        fName.classList.add("preview-animated");
        console.log("mouse over preview");
    } else {fName.classList.remove("preview-animated"); console.log("mouse exit preview")}
    
}

/* TO-DO:
* Create a horizontal gallery of the most recent converted images. Display them there, in small image.
*


*/

// test image (THESE ARE CC-0):
/*  https://cdn.stocksnap.io/img-thumbs/280h/house-cat_MIZQ6V1ZJU.jpg - cat
    https://w0.peakpx.com/wallpaper/333/363/HD-wallpaper-joker-cool.jpg - joker why so serious

    Reddit:
    https://preview.redd.it/credits-for-backround-image-to-u-hopeful-fix-41-v0-wu6dctg1v87g1.png?width=640&crop=smart&auto=webp&s=42aeea39b5c1e000c845fbaac6d912094ef06ae7
    https://preview.redd.it/m0f0yi1hwi6g1.png?width=320&crop=smart&auto=webp&s=8031739885a102091b10f5276b902fc14e6ec47a
    https://preview.redd.it/yn6vf345nk6g1.jpeg?width=640&crop=smart&auto=webp&s=bb15357e103645647bacf128cb90674f08102fae
    https://preview.redd.it/advice-for-you-ladies-out-there-v0-5ve9q5sbhw6g1.png?width=320&crop=smart&auto=webp&s=a2b039bee1a6bacf9b0abe86ed34cc5667194300

*/


// https://www.w3schools.com/js/js_timing.asp look at JS timing
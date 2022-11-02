// initialize elements relevant for enlarged image

let imgArray = [    "1.jpg", "2.jpg", "3.jpg", 
                    "4.jpg", "5.jpg", "6.jpg", 
                    "7.jpg", "8.jpg", "9.jpg", 
                    "10.jpg", "11.jpg", "12.jpg" ];

                  
// make a div to hold the enlarged image
let bigDiv = document.createElement("div");
bigDiv.style.display = "none";
bigDiv.setAttribute("class", "big-div");
bigDiv.setAttribute("id", "big-div");
document.getElementById("enlarged-wrapper").appendChild(bigDiv);

let bigImg = document.createElement("img");
bigImg.setAttribute("class", "big-img");
bigImg.setAttribute("id", "big-img");

bigDiv.appendChild(bigImg);


// navigation bar for enlarged image
// these need class attributes for bootstrap
let navBtns = document.createElement("div");
navBtns.setAttribute("class", "btn-group");
navBtns.id = "nav-buttons";

bigDiv.appendChild(navBtns);

let closeBtn = document.createElement("button");
closeBtn.setAttribute("class", "btn btn-primary");
closeBtn.id = "close-button";
closeBtn.innerHTML = "Close";
closeBtn.addEventListener("click", closeBigImage);

// left and right arrows should not have to take in id
// attach a data- attribute to each button
// make helper function that updates each one after click

let leftBtn = document.createElement("button");
leftBtn.setAttribute("class", "btn btn-primary");
leftBtn.id = "left-btn";
leftBtn.innerHTML = "<";
leftBtn.addEventListener("click", function() { leftArrow() });

let rightBtn = document.createElement("button");
rightBtn.setAttribute("class", "btn btn-primary");
rightBtn.id = "right-btn";
rightBtn.innerHTML = ">";
rightBtn.addEventListener("click", function() { rightArrow() });


// append nav buttons to navBtn div in correct order
navBtns.appendChild(leftBtn);
navBtns.appendChild(closeBtn);
navBtns.appendChild(rightBtn);

// function definitions
// function imgInit(img array)
// takes in array of image urls, wraps each in a div
function imgInit(arr) {
    for (i = 0; i < arr.length; i++) {

        let imgDiv = document.createElement("div");
        imgDiv.setAttribute("class", "small-img-div");
        imgDiv.setAttribute("id", "img-div-" + i);
        imgDiv.style.display = "inline-block";
        document.getElementById("small-images").appendChild(imgDiv);
        
        let imgTag = document.createElement("img");
        imgTag.setAttribute("class", "small-img");
        imgTag.setAttribute("id", "small-img-" + i);
        imgTag.setAttribute("src", arr[i]);
        document.getElementById("img-div-" + i).appendChild(imgTag);

        imgDiv.addEventListener("click", function() { enlargeImage(imgTag.getAttribute("id")) });
        imgDiv.addEventListener("mouseover", function() { hoverOver(imgTag.getAttribute("id")) });
        imgDiv.addEventListener("mouseout", function() { hoverOut(imgTag.getAttribute("id")) });
    }
}


// function hoverOver() 
// changes color of border on hover
function hoverOver(id) {
    let el = document.getElementById(id);
    el.style.border = "3px solid red";
}

// function hoverOut() undoes result of hoverOver()
function hoverOut(id) {

    console.log("hoverOut() called");


    let el = document.getElementById(id);
    el.style.border = "none";
}


// function enlargeImage(class or id of image)
// changes link of bigImg <img> that is inside the hidden bigDiv to the url 
// of the clicked image
function enlargeImage(id) {

    document.getElementById("overlay").style.display = "block";

    let chosenLink = document.getElementById(id).getAttribute("src");
    
    bigImg.setAttribute("src", chosenLink);
    bigDiv.style.display = "block";
}


// function closeBigImage()
// set big-div display: none;
function closeBigImage() {
    bigDiv.style.display = "none";
    document.getElementById("overlay").style.display = "none";
}


// arrows are implemented so first and last point to each other
// function leftArrow(current img)
// call closeBigImage() on current image
// figure out previous image, call enlargeImage(previous image)
function leftArrow() {
    closeBigImage();

    let currLink = document.getElementById("big-img").getAttribute("src");

    let index = imgArray.indexOf(currLink);

    let prevIndex = 0;
    if (index == 0) {
        prevIndex = 11;
    } else {
        prevIndex = index - 1;
    }

    let prevId = document.getElementById("small-img-" + prevIndex).getAttribute("id");
    
    enlargeImage(prevId);
}

// function rightArrow(current img)
// call closeBigImage() on current image
// figure out next image, call enlargeImage(next image)
function rightArrow() {
    closeBigImage();

    let currLink = document.getElementById("big-img").getAttribute("src");

    let index = imgArray.indexOf(currLink);

    let nextIndex = 0;
    if (index == 11) {
        nextIndex = 0;
    } else {
        nextIndex = index + 1;
    }

    let nextId = document.getElementById("small-img-" + nextIndex).getAttribute("id");
    
    enlargeImage(nextId);
}

imgInit(imgArray);
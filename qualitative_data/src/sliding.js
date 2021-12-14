Split(['#landing-page-left', '#landing-page-right'], {
    elementStyle: function (dimension, size, gutterSize) {
        return {
            'flex-basis': 'calc(' + size + '% - ' + gutterSize + 'px)',
        }
    },
    gutterStyle: function (dimension, gutterSize) {
        return {
            'flex-basis': gutterSize + 'px',
        }
    },
    sizes: [16, 84],
  
  })

const windowW = window.innerWidth;

var w = document.getElementById("landing-page-right").offsetWidth;
var h = document.getElementById("landing-page-right").offsetHeight;

//once resized, reload the drawing

const resizeObserver_1= new ResizeObserver(entries => {
    for (let entry of entries) {

       

        let ratio = entry.contentRect.width / windowW;

        if (ratio > 0.2){
            //show right-side content
            showRight(ratio)

        } else {
            //show left-side content
            hideRight(ratio)
        }

        if (ratio > 0.6){
            //show right-side content
            hideLeft();
        } else {
            //show left-side content
            showLeft(ratio);
        }
          
 
    }
  
  });
  
const observerTarget_1 = document.getElementById("landing-page-right");
  
resizeObserver_1.observe(observerTarget_1);


function showRight(ratio){
    document.getElementById("landing-introtext").innerHTML = "There is a charm about her rendition of children, whether they be Japanese, Chinese, Mexican or American, which gives token to her sympathy with childhood; and with her passing has gone from the world of life of cheerfulness and courage and high purpose which, like a flower of sweet fragrance, has added beauty to life.";
   
    if (ratio < 0.45){ showImgA()}
    else if (ratio < 0.55){ showImgB();}
    else { showImgC()}

    document.getElementById("landing-img").style.display = "flex";
    document.getElementById("visualization").style.display = "block";
    



}

function hideRight(ratio){
    document.getElementById("landing-img").style.display = "none";
    document.getElementById("visualization").style.display = "none";
    document.getElementById("landing-introtext").innerHTML = "<<< Slide Left to Discover More"

}


function showImgA(){
    document.getElementById("landing-img").src = "./images/Happiness Flower.jpg"
    document.getElementById("landing-introtext").innerHTML = "There is a charm about her rendition of children, whether they be Japanese, Chinese, Mexican or American, which gives token to her sympathy with childhood; and with her passing has gone from the world of life of cheerfulness and courage and high purpose which, like a flower of sweet fragrance, has added beauty to life.";
   
}

function showImgB(){
    document.getElementById("landing-img").src = "./images/Hide and Seek.jpg"
}

function showImgC(){
    document.getElementById("landing-img").src = "./images/Sunday Morning.jpg"

    document.getElementById("landing-introtext").innerHTML = `There is a charm about her rendition of children, whether they be Japanese, Chinese, Mexican or American, which gives token to her sympathy with childhood; and with her passing has gone from the world of life of cheerfulness and courage and high purpose which, like a flower of sweet fragrance, has added beauty to life.
                                                                <br>
                                                                <br>
                                                             Scroll Down to Discover More ▼ `;
   
}



function hideLeft(){

    // document.getElementById("page-title").innerHTML = "<h1>The <br>World<br> Created <br>by <br>Helen <br>Hyde</h1>";
    document.querySelectorAll(".page-title-hide").forEach( function(d){
        d.style.display = "none"
    })

}

function showLeft(ratio){

    if (ratio<0.5){ showImgHelen()}
    else {showImgHelen2()}

    // document.getElementById("page-title").innerHTML = "<h1>The World Created by Helen Hyde</h1>"
    document.querySelectorAll(".page-title-hide").forEach( function(d){
        d.style.display = "flex"
    })
  
}

function showImgHelen(){
    document.getElementById("page-title-img").src = "./src/Helen_Hyde.jpg"
}

function showImgHelen2(){
    document.getElementById("page-title-img").src = "./src/Helen_Hyde_2.jpg"
}

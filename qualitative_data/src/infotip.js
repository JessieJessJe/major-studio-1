function clickinfo(d){
    console.log('clicked!',d);


    let ratio, srcH, srcW;

    // var leftH = document.getElementById("infotip-left").clientHeight;
    // var leftW = document.getElementById("infotip-left").clientWidth;


    var leftH = window.innerHeight * 0.40;
    var leftW = window.innerWidth *0.40;

    console.log('infotipleft', leftH, leftW)

    var myimg = new Image();
    myimg.src = `./images/${d.title}.jpg`;
    myimg.onload = function(){

        srcH = myimg.naturalHeight;
        srcW = myimg.naturalWidth;
        

        ratio = Math.min( leftW / srcW, leftH / srcH)

        var [imgW, imgH] = [srcW * ratio, srcH * ratio]

            //add img
        var elem = document.createElement("img");
        elem.setAttribute("id", `infotip-micro-img`);

        elem.setAttribute("src", `./images/${d.title}.jpg`);

        elem.setAttribute("width", imgW );
    
        elem.setAttribute("height", imgH );

        document.getElementById("infotip-left").innerHTML = '';
        document.getElementById("infotip-left").appendChild(elem);

        addheader(d);
        addcolor(d);
        
        showtip();
        document.getElementById("infotip-btn").addEventListener('click', closetip)
    }

    let cropImgSize = document.getElementById("infotip-right").clientWidth / 2.5;

    d3.json("./data_crop.json", function(err, data) {
        document.getElementById("infotip-right").innerHTML = '';

        data.forEach(da => {
            if (da.title == d.title){
                
                var elem = document.createElement("img");
                elem.setAttribute("src", da.root);
                elem.setAttribute("class", 'infoTipCropImg' );
                elem.setAttribute("width", cropImgSize );
            
                elem.setAttribute("height", cropImgSize);

                var text = document.createElement("p")
                text.innerHTML = `${da.group}`

                var mydiv = document.createElement("div")
                mydiv.appendChild(text);
                mydiv.appendChild(elem);
            
                document.getElementById("infotip-right").appendChild(mydiv);
                // document.getElementById("infotip-right").appendChild(text);

            }
        });
    })

}


function addcolor(d){
    var country = d.place.toLowerCase();

    var top = `<div class="country-color-solid ${country}-color"></div>
             <div class="country-color-gradient"></div>`
    
    document.getElementById("infotip-color-wrapper-top").innerHTML = top;

    var bottom = `<div class="country-color-solid ${country}-color"></div>
    <div class="country-color-gradient-reverse"></div>`

    document.getElementById("infotip-color-wrapper-bottom").innerHTML = bottom;
    
}

function addheader(d){

    d3.json("./data.json", function(err, data) {

        let medium = data.find(item => item.title == d.title).medium

    let text = `<div>
                <h2>${d.title}</h2>
                <p>Date: ${d.date}</p>
                <p>Location: est.${d.place}</p>
                <p>Medium: ${medium}</p>
                <button class="hover-underline-effect">View this item at SAAM</button>
                </div>
               
    `

    // let linkText = `
    //             <h2 onclick="window.open('${d.link}');>Read More<h2>
    // `
    document.getElementById("infotip-title").innerHTML = text;
    // document.getElementById("infotip-link").innerHTML = linkText;
    // document.getElementById("infotip-link").onclick = function(){
    //     window.open(d.link);
    // }

    })//end of d3 == not efficient?????

}

function closetip(){
    document.getElementById("infotip").style.visibility = "hidden";	
    document.getElementById("landing-page-right").style.filter = "blur(0px)";	
}

function showtip(){
    document.getElementById("infotip").style.visibility = "visible";
    document.getElementById("landing-page-right").style.filter = "blur(4px)";	
}
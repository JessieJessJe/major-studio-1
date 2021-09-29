

const JSON = [{"name": "African Americans", "count": "14848"}, {"name": "Africans", "count": "49334"}, {"name": "Americans", "count": "1806801"}, {"name": "Asian Pacific Americans", "count": "628"}, {"name": "Amish", "count": "28"}, {"name": "Asians", "count": "18280"}, {"name": "Buddhists", "count": "950"}, {"name": "Baptists", "count": "2133"}, {"name": "Blacks", "count": "216411"}, {"name": "Chinese Americans", "count": "9765"}, {"name": "Chinese", "count": "24479"}, {"name": "Christian Scientists", "count": "21"}, {"name": "Christians", "count": "16382"}, {"name": "Cossacks", "count": "127"}, {"name": "Creek Indians", "count": "7814"}, {"name": "Europeans", "count": "21028"}, {"name": "Filipino Americans", "count": "329"}, {"name": "Filipinos", "count": "2063"}, {"name": "Eskimos", "count": "36984"}, {"name": "French", "count": "135335"}, {"name": "Hispanics", "count": "1766"}, {"name": "Hippies", "count": "48"}, {"name": "Hawaiians", "count": "20105"}, {"name": "Germans", "count": "21449"}, {"name": "Hindus", "count": "422"}, {"name": "Israelis", "count": "488"}, {"name": "Italians", "count": "8308"}, {"name": "Japanese", "count": "22293"}, {"name": "Indians of North America", "count": "2585354"}, {"name": "Japanese Americans", "count": "4716"}, {"name": "Kabyles", "count": "39"}, {"name": "Jews", "count": "2151"}, {"name": "Latinos", "count": "1899"}, {"name": "Latin Americans", "count": "3698"}, {"name": "Muslims", "count": "1656"}, {"name": "Mexicans", "count": "46254"}, {"name": "Native Americans", "count": "262636"}, {"name": "Russians", "count": "18665"}, {"name": "Romanies", "count": "218"}, {"name": "Native Americans", "count": "262636"}, {"name": "Russians", "count": "18665"}, {"name": "Scots", "count": "1302"}, {"name": "Vietnamese", "count": "501"}, {"name": "Turks", "count": "3190"}, {"name": "Spaniards", "count": "717"}];
let graphics,mycursor;
let img, w=window.innerWidth, h;
let c, colcounts;

let sum; //total number of artifacts
let scrollIndex = 1;
let scroll = 'scroll up or down to explore more';
let ENCODE = [];
let cell = 2;

const palette = ['ffe66d','2ec4b6','ffc857','cbf3f0','b8b8ff']
// const palette = ['000000','333333','666666','999999','CCCCCC','EEEEEE']
// const palette = ['9f1853','4589ff','ff7eb6','bae6ff','007d79']

function preload(){
    
    img = loadImage('type2.jpg');
    // img = loadImage('type3.jpg');
  }

function drawType(){

     
    let cols = Math.floor(width/cell);
    let rows = Math.floor(height/cell);
    let numCells = cols * rows;

    c = new Array(cols).fill(false);
    colcounts = 0;

    img.loadPixels(); // loads image
    img.resize(cols, 0); // resizes image to canvas width
    img.updatePixels(); // updates image


    for (let i = 0; i < numCells; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);

        const r = img.pixels[i * 4 + 0];
        const g = img.pixels[i * 4 + 1];
        const b = img.pixels[i * 4 + 2];
        const a = img.pixels[i * 4 + 3];

        
        if (isRec(r,g,b)){isFirstCol(col);}

    }
    assignCol();
    // getNoise(cols, rows);

    for (let i = 0; i < numCells; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);

        const r = img.pixels[i * 4 + 0];
        const g = img.pixels[i * 4 + 1];
        const b = img.pixels[i * 4 + 2];
        // const a = img.pixels[i * 4 + 3];
        
        if (isRec(r,g,b)){

            if (ENCODE[col].fill){

                // graphics.fill(ENCODE[col].color);
                // graphics.stroke(ENCODE[col].color)                
                // graphics.rect( col * cell , row * cell ,cell,cell)}

                fill(ENCODE[col].color);
                stroke(ENCODE[col].color)                
                rect( col * cell , row * cell ,cell,cell)}

        }

        else{
            //particles in the background
            if(int(random(0, 40)) == 1){

                let n = myNoise[i] * 3 + 0.5;

                // graphics.fill(255);
                // graphics.noStroke();
                // graphics.ellipseMode(CENTER)
                // graphics.ellipse(col * cell , row * cell - n/2, n , n)

                fill(255);
                noStroke();
                ellipseMode(CENTER)
                ellipse(col * cell , row * cell - n/2, n , n)

            }
        }

    }

}



function setup(){
 
    h = w * (img.height/img.width);

    createCanvas(w, h*1.5);
    // pixelDensity(1);

    graphics = createGraphics(w, h);
    // graphics.pixelDensity(1);
    
    mycursor = createGraphics(80, 80);
    mycursor.stroke('white')
    mycursor.line(1,0, 1,height-50)
   
    let cols = Math.floor(width/cell);
    let rows = Math.floor(height/cell);
    let numCells = cols * rows;

    c = new Array(cols).fill(false);
    colcounts = 0;

    img.loadPixels(); // loads image
    img.resize(cols, 0); // resizes image to canvas width
    img.updatePixels(); // updates image


    for (let i = 0; i < numCells; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);

        const r = img.pixels[i * 4 + 0];
        const g = img.pixels[i * 4 + 1];
        const b = img.pixels[i * 4 + 2];
        const a = img.pixels[i * 4 + 3];

        
        if (isRec(r,g,b)){isFirstCol(col);}

    }

    assignCol();
    getNoise(cols, rows);

    for (let i = 0; i < numCells; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);

        const r = img.pixels[i * 4 + 0];
        const g = img.pixels[i * 4 + 1];
        const b = img.pixels[i * 4 + 2];
        // const a = img.pixels[i * 4 + 3];
        
        if (isRec(r,g,b)){

            if (ENCODE[col].fill){

                // graphics.fill(ENCODE[col].color);
                // graphics.stroke(ENCODE[col].color)                
                // graphics.rect( col * cell , row * cell ,cell,cell)}

                fill(ENCODE[col].color);
                stroke(ENCODE[col].color)                
                rect( col * cell , row * cell ,cell,cell)}

        }

        else{
            //particles in the background
            if(int(random(0, 40)) == 1){

                let n = myNoise[i] * 3 + 0.5;

                // graphics.fill(255);
                // graphics.noStroke();
                // graphics.ellipseMode(CENTER)
                // graphics.ellipse(col * cell , row * cell - n/2, n , n)

                fill(255);
                noStroke();
                ellipseMode(CENTER)
                ellipse(col * cell , row * cell - n/2, n , n)

            }
        }

    }

}

function draw(){

    // clear();

    // drawType();

    imageMode(CENTER)
   
    // image(graphics, width/2,height/2);
    // image(graphics, width/2, height/2);


    drawLine(scrollIndex);

    noStroke();
    // rectMode(CORNER)
    textFont('Helvetica')

    cursor('none')

    scrollText = whatText(scrollIndex);

    if (scrollText == 'move your mouse to explore more'){

        // push();
        // // translate(scrollIndex, height/2);
        // // rotate( HALF_PI )
        // textSize(12);
        // textAlign(LEFT, CENTER);
        // text(scrollText,scrollIndex + 40, mouseY, 50);
        // pop();
    }
    else {
        
        if (mycursor){
            // mycursor.textSize(16);
            // mycursor.textAlign(CENTER);
            // mycursor.text(scrollText,mouseX, height - 50);
    
            // //where it my text
            // // console.log(scrollIndex,height - 30, width);
    
            // mycursor.fill(whatColor(scrollIndex));
            // mycursor.circle(mycursor.width/2, mycursor.height/2,mycursor.height/2)

            image(mycursor,scrollIndex,mouseY)
        }
        

        
    }
  
    
};

// function particleScale(count){
//     // return Math.floor( (parseInt(count)/sum) * 20 );
//     // return Math.floor((2-sigmoid(count))*20)
// }

//how to create sigmoid in js https://stackoverflow.com/questions/54580032/sigmoid-with-large-number-in-javascript
// function sigmoid(t) {
//     return 1/(1+Math.exp(-t/2000));
// }

let noiseVal;
let noiseScale = 2;
let myNoise = [];

function getNoise(cols, rows){

    for (let i=0; i<cols; i++){
        for (let j=0; j<rows; j++){
            noiseDetail(2,0.2);
            noiseVal = noise(i*noiseScale, j*noiseScale)
            myNoise.push(noiseVal);
        }
    }
}

function isLine(r,g,b){
    if (r < 50 || g < 50){return true}
}

let sizeScale = []
let originalLoc = [] //store the location in the array before sorting

function assignCol(){
    
    //from less to more
    JSON.sort(function(a, b) {
        return a.count - b.count;})

    sum = 0;
    let jsonid = 0;

    JSON.forEach( d => {
        sum += parseInt(d.count)
        d.jsonid = jsonid;
        jsonid += 1;
    })


    let sizeScaleRaw = JSON.map(d =>{
		return Math.floor((parseInt(d.count)/sum)*colcounts)+1 })

    sizeScaleRaw.forEach((d, index)=>{
        if (index % 2 == 0){ sizeScale.push(d); originalLoc.push(index) }
        else {  sizeScale.unshift(d); originalLoc.unshift(index) }
    })

    colorScroll(sizeScale.length)
}

function colorScroll(scrollIndex){


	let index = 0; //storing the location in c[]

	//loop over cultures categories
	for (let i=0; i<sizeScale.length; i++){

                let color = '#' + palette[ i % palette.length];

                //for each culture category, determine how many columns to fill in
                let fill = 0
                while (fill < sizeScale[i] && index < c.length){
                    //this column is on type
                    if (c[index]){
                        // columnColor[index]=colorScale[i]
                        // let loc = JSON.map( d => d.count).indexOf(sizeScale[i])
                        let ori = originalLoc[i];

                        let obj = {
                            'id': index,
                            'fill': true,
                            'color': color,
                            'name': JSON[ori].name,
                            'count':JSON[ori].count,
                            'loc':JSON[ori].jsonid
                        }

                        ENCODE.push(obj);
              

                        fill += 1
                    } else {
                        let obj = {
                            'id': index,
                            'fill': false
                        }
                        ENCODE.push(obj);
                    }
                    index += 1;
		        }
        
	}        

}




function isFirstCol(col){
    if (!c[col]){
        c[col] = true;
        colcounts += 1;
    } 
}

function isRec(r,g,b){
//  if (r >= 240 && b <=30 ){
    if (b < 150 ){
     return true;
 }else return false;
}


function drawLine(clientX){


        
    stroke(whatColor(scrollIndex));

    let a = 0;
    let b = height;
   
    line(clientX-1,a, clientX+1, b-40)

}

function whatText(scrollIndex = 0){

    let cc = Math.floor(scrollIndex/cell)

    let number = new Intl.NumberFormat('en-IN').format(parseInt(ENCODE[cc].count))

    if ( cc < ENCODE.length && cc > 0 ){
        if (ENCODE[cc].fill){ return `${number} items \n tagged as ${ENCODE[cc].name} culture` }
        else return 'move your mouse to explore more'
    } else {
        return 'move your mouse to explore more'
    }
}

function whatColor(scrollIndex = 0){

    let cc = Math.floor(scrollIndex/cell)
    if ( cc < ENCODE.length && cc > 0 ){
        if (ENCODE[cc].fill){ return ENCODE[cc].color }
        else return '#999999'
    } else {
        return '#999999'
    }
}




//https://p5js.org/reference/#/p5/mouseWheel
function mouseMoved(event) {
    
    if (mycursor){
        mycursor.remove();
    }

    scrollIndex = event.clientX;
    scrollText = whatText(scrollIndex);

    mycursor.textSize(16);
    mycursor.textAlign(CENTER);
    mycursor.text(scrollText,mouseX, height - 50);

    //where it my text
    // console.log(scrollIndex,height - 30, width);

    mycursor.fill(whatColor(scrollIndex));
    mycursor.circle(mycursor.width/2, mycursor.height/2,mycursor.height/2)

    // console.log(scrollIndex);
    //move the square according to the vertical scroll amount
 
    return false;
  }

//instance mode https://p5js.org/reference/#/p5/p5
//all p5 functions are bound up in a single variable

// function dottedLine(clientX){

//     rectMode(CENTER)
    
//     fill(whatColor(scrollIndex));

//     let a = 0;
//     let b = height;
//     let dotCounts = 40;

//     // point(clientX, a);
//     // point(clientX, b)
//     let hh = (height / dotCounts) / 2;

//     for (let i=1; i < dotCounts - 2; i++){

//         rect(clientX,lerp(a, b, i/dotCounts), 4, hh)

//         // point(clientX,lerp(a, b, i/dotCounts) )
//     }
    //isolation mode
    // cover.clear();

    // cover.strokeWeight(2);

    // clientX = clientX / 4;

    // let a = 0;
    // let b = cover.height;
    // // let btw = [];
    // let dotCounts = 100;

    // cover.point(clientX, a);
    // cover.point(clientX, b)

    // for (let i=1; i<dotCounts; i++){
    //     // btw.push(lerp(a, b, i/dotCounts))

    //     cover.point(clientX,lerp(a, b, i/dotCounts) )
    // }


// }
const url = `https://collections.si.edu/search/results.htm?q=&fq=data_source%3A%22National+Museum+of+American+History%22&fq=culture:`

const MYJSON = [{"name": "African Americans", "count": "14848"}, {"name": "Africans", "count": "49334"}, {"name": "Americans", "count": "1806801"}, {"name": "Asian Pacific Americans", "count": "628"}, {"name": "Amish", "count": "28"}, {"name": "Asians", "count": "18280"}, {"name": "Buddhists", "count": "950"}, {"name": "Baptists", "count": "2133"}, {"name": "Blacks", "count": "216411"}, {"name": "Chinese Americans", "count": "9765"}, {"name": "Chinese", "count": "24479"}, {"name": "Christian Scientists", "count": "21"}, {"name": "Christians", "count": "16382"}, {"name": "Cossacks", "count": "127"}, {"name": "Creek Indians", "count": "7814"}, {"name": "Europeans", "count": "21028"}, {"name": "Filipino Americans", "count": "329"}, {"name": "Filipinos", "count": "2063"}, {"name": "Eskimos", "count": "36984"}, {"name": "French", "count": "135335"}, {"name": "Hispanics", "count": "1766"}, {"name": "Hippies", "count": "48"}, {"name": "Hawaiians", "count": "20105"}, {"name": "Germans", "count": "21449"}, {"name": "Hindus", "count": "422"}, {"name": "Israelis", "count": "488"}, {"name": "Italians", "count": "8308"}, {"name": "Japanese", "count": "22293"}, {"name": "Indians of North America", "count": "2585354"}, {"name": "Japanese Americans", "count": "4716"}, {"name": "Kabyles", "count": "39"}, {"name": "Jews", "count": "2151"}, {"name": "Latinos", "count": "1899"}, {"name": "Latin Americans", "count": "3698"}, {"name": "Muslims", "count": "1656"}, {"name": "Mexicans", "count": "46254"}, {"name": "Native Americans", "count": "262636"}, {"name": "Russians", "count": "18665"}, {"name": "Romanies", "count": "218"}, {"name": "Russians", "count": "18665"}, {"name": "Scots", "count": "1302"}, {"name": "Vietnamese", "count": "501"}, {"name": "Turks", "count": "3190"}, {"name": "Spaniards", "count": "717"}];

let graphics,cover,mycursor;
let img, w, h, cols, rows;
let c, colcounts, colheight = [];

let square=[], letterA=[], myline=[], squareSize=0, squareH, ASize = 0, linePos = [], lineTotal = 0;

let sum; //total number of artifacts
let scrollIndex = 1;
let scroll = 'scroll up or down to explore more';

let ENCODE = [];

let whichcolor = 0;
let cell = 2;

const palette = ['ffe66d','2ec4b6','ffc857','b8b8ff','cbf3f0']
// const palette = ['000000','333333','666666','999999','CCCCCC','EEEEEE']
// const palette = ['9f1853','4589ff','ff7eb6','bae6ff','007d79']

function pickColor(){
    if (whichcolor == palette.length){
        return 0
    } else {
        whichcolor += 1;
        return whichcolor
    }
}

function prepareSquare(){

    // figure out what is the height of the rectangles
    colheight.every( d =>{
        if (d == 0){ return true }
        else { 
            squareH = d;
            return false;}
    })

    square = new Array(cols).fill(false);
    colheight.forEach((d,i) =>{
        if (d== squareH){
            square[i] = true;
            squareSize += squareH; 
        }
    })
}

function prepareA(){

    letterA = new Array(cols).fill(false);

    let begin = Math.trunc((251 / 494) * cols);
    let end = Math.trunc((355 / 494) * cols);

    for (let i = begin; i<end; i++){
        if (colheight[i] > 0){
            letterA[i] = true;
            ASize += colheight[i];
        }
    }
}

function prepareLine(){
    myline = new Array(cols).fill(false);

    for ( let i=0; i<cols; i++){

        if (!letterA[i] && colheight[i]>0 && colheight[i] < (squareH/5) ){
            myline[i] = true;
            lineTotal += 1;
            c[i] = false;
            colcounts -= 1;

            console.log(i)

            for ( let j=0; j<rows; j++){
                const r = img.pixels[(j*cols+i) * 4 + 0];
                const g = img.pixels[(j*cols+i) * 4 + 1];
                const b = img.pixels[(j*cols+i) * 4 + 2];

                if (isRec(r,g,b)){
                    linePos[i] = j;
                  
                }
            }
        }
    }

}

function preload(){
    
    img = loadImage('type4.jpg');
    // img = loadImage('type3.jpg');
  }

function setup(){
    // w = img.width*2;
    // h = img.height*2;

    w = windowWidth;
    // h = windowHeight;

    h = windowWidth * (img.height/img.width);

    createCanvas(w, h*1.5);
    // pixelDensity(1);

    graphics = createGraphics(w, h);
    cover = createGraphics(w, height);
    
    mycursor = createGraphics(80, 80);
    mycursor.stroke('white')
   
    cols = Math.floor(width/cell);
    rows = Math.floor(height/cell);
    let numCells = cols * rows;

    c = new Array(cols).fill(false);
    colheight = new Array(cols).fill(0);
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

        
        if (isRec(r,g,b)){registerCol(col);}

    }

    prepareSquare();
    prepareA();
    prepareLine();

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
            if (ENCODE[col]){
                if (ENCODE[col].fill){

                    graphics.fill(ENCODE[col].color);
                    graphics.stroke(ENCODE[col].color)
    
                    
                    graphics.rect( col * cell , row * cell ,cell,cell)}
            }
            }


        else{

            drawLine(col)
            //particles in the background
            if(int(random(0, 40)) == 1){

                let n = myNoise[i] * 3 + 0.5;

                graphics.fill(255);
                graphics.noStroke();
                graphics.ellipseMode(CENTER)
                graphics.ellipse(col * cell , row * cell - n/2, n , n)

            }
        }
        
    }
}

function drawLine(col){

    let j = col +1;

    if (myline[col] && col % 2 == 0 ){
        graphics.stroke(255,255,255);
        graphics.strokeWeight(1);

        graphics.line(col * cell , linePos[col] * cell - 5, col * cell , linePos[col] * cell+ 10)
   
 

           
        }
     
}


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
    
    //ascending Order
    
    MYJSON.sort(function(a, b) {
        return parseInt(a.count) - parseInt(b.count);})

    sum = 0;
    let jsonid = 0;

    //assign unique ID based on the descending order
    MYJSON.forEach( d => {
        sum += parseInt(d.count)
        d.jsonid = jsonid;
        jsonid += 1;
    })     

    let sizeScaleRaw = MYJSON.map(d =>{
		return Math.floor((parseInt(d.count)/sum)*colcounts)+1 })

    sizeScaleRaw.forEach((d, index)=>{
        if (index % 2 == 0){ sizeScale.push(d); originalLoc.push(index) }
        else {  sizeScale.unshift(d); originalLoc.unshift(index) }
    })

  

    colorScroll(sizeScale.length)

    //----------------------------- version 3 begin

    // calculating 
    let topRatio = (parseInt(MYJSON[0].count) + parseInt(MYJSON[1].count) + parseInt(MYJSON[2].count) + parseInt(MYJSON[3].count) + parseInt(MYJSON[4].count) + parseInt(MYJSON[5].count))/ sum;
    let totalSize = Math.round((squareSize + ASize) / topRatio);
    let lineMaxH = (totalSize - (squareSize + ASize)) / lineTotal; 

    //counts per pixel
    let cpp = (squareSize + ASize) / totalSize;

    console.log(lineMaxH)
    console.log(topRatio);
    console.log(totalSize);
    console.log(squareSize + ASize)

    // COLOR = new Array(cols * rows)

    // drawLarge(cpp, 5)

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
                            'name': MYJSON[ori].name,
                            'count': parseInt(MYJSON[ori].count),
                            'loc': MYJSON[ori].jsonid
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



function registerCol(col){
    if (!c[col]){
        c[col] = true;
        colcounts += 1;
        colheight[col] = 1;
    } else {
        colheight[col] += 1;
    }
}

function isRec(r,g,b){
//  if (r >= 240 && b <=30 ){
    if (b < 150 ){
     return true;
 }else return false;
}


function draw(){

    clear();

    imageMode(CENTER)
    image(graphics, width/2,height/2);


    // cover.rectMode(CORNER)
    // cover.fill(155)
    // cover.rect(0,0,10,h)

    dottedLine(scrollIndex)
    // mytext.textSize(20);
    // mytext.textAlign(LEFT, TOP);

    // mytext.fill(155);
    // mytext.strokeWeight(1);

    // mytext.rect(0,0,200,20)

    // scrollText = whatText(scrollIndex);

    // mytext.text = (scrollText,0, 0);

    // imageMode(CORNER)
    // image(cover, scrollIndex, h);

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
       
        textSize(16);
        textAlign(CENTER);
        text(scrollText,mouseX,height - 50);

        mycursor.fill(whatColor(scrollIndex));
        mycursor.circle(mycursor.width/2, mycursor.height/2,mycursor.height/2)
        image(mycursor,scrollIndex,mouseY)
    }
  
    
};

function whatText(scrollIndex = 0){

    let cc = Math.floor(scrollIndex/cell)

    let number = new Intl.NumberFormat().format(ENCODE[cc].count)

    if ( cc < ENCODE.length && cc > 0 ){
        if (ENCODE[cc].fill){ return `${number} items \n have tag: ${ENCODE[cc].name}` }
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
    // scrollIndex += event.delta;
    scrollIndex = event.clientX;

    scrollText = whatText(scrollIndex);
    //move the square according to the vertical scroll amount
    // console.log(scrollIndex);
    //uncomment to block page scrolling
    return false;
  }

//instance mode https://p5js.org/reference/#/p5/p5
//all p5 functions are bound up in a single variable

function dottedLine(clientX){

    // rectMode(CENTER)
    
    fill(whatColor(scrollIndex));

    stroke(whatColor(scrollIndex));
    line(clientX-1, 0, clientX+1, height - 80);


}


// function drawLarge(cpp, count){
//     let numCells = rows * cols;

//     //fix A first:
//     let remainFirst = parseInt(MYJSON[0].count) - (cpp * ASize);

//     console.log(COLOR)

//     //define pixels in A:
//     for (let i=0; i<cols; i++){

//         if (letterA[i]){
           
//             for ( let j=0; j<rows; j++){
//                 const r = img.pixels[(j*rows+i) * 4 + 0];
//                 const g = img.pixels[(j*rows+i) * 4 + 1];
//                 const b = img.pixels[(j*rows+i) * 4 + 2];
    
//                 if (isRec(r,g,b)){

//                     let obj = {    
//                         'fill': true,
//                         'color': palette[pickColor()],
//                         'name': MYJSON[0].name,
//                         'count': parseInt(MYJSON[0].count),
//                         'loc': MYJSON[0].jsonid
//                     }

               
//                         //  COLOR.push(j*rows+i-1, 1, obj);
//                         COLOR.push(obj);
                    
//                 }
//             }

//         }

//     }

//     //now assign squares.....

//     let remain;
//     let currentCol = cols; // storing current col - from right to left

    //looping through the first five JSON objects
    // for (let ha = 0; ha < count; ha++ ){

    //     if (ha=0){ remain = remainFirst; }
    //     else { remain = parseInt(MYJSON[ha].count)}

    //     let fullColumn = Math.trunc(remain / (cpp * squareH));
    //     remain = remain - fullColumn * cpp * squareH;

    //     for (let i = currentCol; i>0; i--){
    //         for (let j= )
    //     }

    // }

    //     let haColor = palette[pickColor()];
   
    //     while (remain>0 && i > 0){

    //         if (square[i]){

    //             let j = 0;

    //             while(j<rows){

    //                 const r = img.pixels[(j*rows+i) * 4 + 0];
    //                 const g = img.pixels[(j*rows+i) * 4 + 1];
    //                 const b = img.pixels[(j*rows+i) * 4 + 2];
        
    //                 if (isRec(r,g,b)){
    
    //                     let obj = {    
    //                         'fill': true,
    //                         'color': haColor,
    //                         'name': MYJSON[ha].name,
    //                         'count': parseInt(MYJSON[ha].count),
    //                         'loc': MYJSON[ha].jsonid
    //                     }
    
    //                     COLOR[j*rows+i] = obj;
    //                     remain = remain - cpp;
    //                 }

    //                 j++;

    //             }

    //         }

    //         i = i - 1;
    //     }
 

    // }

// }
const JSON = [{"name": "African Americans", "count": "14848"}, {"name": "Africans", "count": "49334"}, {"name": "Americans", "count": "1806801"}, {"name": "Asian Pacific Americans", "count": "628"}, {"name": "Amish", "count": "28"}, {"name": "Asians", "count": "18280"}, {"name": "Buddhists", "count": "950"}, {"name": "Baptists", "count": "2133"}, {"name": "Blacks", "count": "216411"}, {"name": "Chinese Americans", "count": "9765"}, {"name": "Chinese", "count": "24479"}, {"name": "Christian Scientists", "count": "21"}, {"name": "Christians", "count": "16382"}, {"name": "Cossacks", "count": "127"}, {"name": "Creek Indians", "count": "7814"}, {"name": "Europeans", "count": "21028"}, {"name": "Filipino Americans", "count": "329"}, {"name": "Filipinos", "count": "2063"}, {"name": "Eskimos", "count": "36984"}, {"name": "French", "count": "135335"}, {"name": "Hispanics", "count": "1766"}, {"name": "Hippies", "count": "48"}, {"name": "Hawaiians", "count": "20105"}, {"name": "Germans", "count": "21449"}, {"name": "Hindus", "count": "422"}, {"name": "Israelis", "count": "488"}, {"name": "Italians", "count": "8308"}, {"name": "Japanese", "count": "22293"}, {"name": "Indians of North America", "count": "2585354"}, {"name": "Japanese Americans", "count": "4716"}, {"name": "Kabyles", "count": "39"}, {"name": "Jews", "count": "2151"}, {"name": "Latinos", "count": "1899"}, {"name": "Latin Americans", "count": "3698"}, {"name": "Muslims", "count": "1656"}, {"name": "Mexicans", "count": "46254"}, {"name": "Native Americans", "count": "262636"}, {"name": "Russians", "count": "18665"}, {"name": "Romanies", "count": "218"}, {"name": "Native Americans", "count": "262636"}, {"name": "Russians", "count": "18665"}, {"name": "Scots", "count": "1302"}, {"name": "Vietnamese", "count": "501"}, {"name": "Turks", "count": "3190"}, {"name": "Spaniards", "count": "717"}];
let graphics;
let img, w, h;
let c, colcounts;
const palette = ['000000','333333','666666','999999','CCCCCC','EEEEEE']
let sum; //total number of artifacts

// const palette = ['8a3ffc','ff7eb6','4589ff','bae6ff','9f1853','b28600']

function preload(){
    
    img = loadImage('type2.jpg');


  }

function setup(){
    w = img.width*2;
    h = img.height*2;

    createCanvas(w, h);
    pixelDensity(1);
    graphics = createGraphics(w, h);


    let cell = 2;
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

    for (let i = 0; i < numCells; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);

        const r = img.pixels[i * 4 + 0];
        const g = img.pixels[i * 4 + 1];
        const b = img.pixels[i * 4 + 2];
        // const a = img.pixels[i * 4 + 3];
        
        if (isRec(r,g,b)){

            if (ENCODE[col].fill){

                graphics.fill(ENCODE[col].color);
                graphics.stroke(ENCODE[col].color)
                graphics.rect( col * cell , row * cell ,cell,cell)}

                // console.log(particleScale(ENCODE[col].count), ENCODE[col].name)

                if (row % ENCODE[col].loc == 0 && random([true,false])){
                    graphics.stroke(255);
                    graphics.line(col * cell , row * cell, col * cell+30, row * cell);
                }
        }
        
        // else{
            
        //     if (isLine(r,g,b)){
        //         graphics.fill(255,204,0);
        //         graphics.stroke(255,204,0);
        //         graphics.rect(col * cell , row * cell ,cell,cell)

               
        //     }
           
        // }
    }
}

let ENCODE = []

// function particleScale(count){
//     // return Math.floor( (parseInt(count)/sum) * 20 );
//     // return Math.floor((2-sigmoid(count))*20)
// }

//how to create sigmoid in js https://stackoverflow.com/questions/54580032/sigmoid-with-large-number-in-javascript
// function sigmoid(t) {
//     return 1/(1+Math.exp(-t/2000));
// }

function isLine(r,g,b){
    if (r < 50 || g < 50){return true}
}

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
    console.log(JSON)

    let sizeScaleRaw = JSON.map(d =>{
		return Math.floor((parseInt(d.count)/sum)*colcounts)+1 })
	    // }).sort(function(a, b) {
        //     return a - b;})

    let sizeScale = []

    sizeScaleRaw.forEach((d, index)=>{
        if (index % 2 == 0){ sizeScale.push(d) }
        else {  sizeScale.unshift(d) }
    })
    console.log('sizescale', sizeScale)
    


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

                let obj = {
                    'id': index,
                    'fill': true,
                    'color': color,
                    'name': JSON[i].name,
                    'count':JSON[i].count,
                    'loc':JSON[i].jsonid
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
        
    console.log(ENCODE);
}

function isFirstCol(col){
    if (!c[col]){
        c[col] = true;
        colcounts += 1;
    } 
}

function isRec(r,g,b){
//  if (r >= 240 && b <=30 ){
    if (r < 50 || g < 50){
     return true;
 }else return false;
}

function draw(){

    image(graphics, 0, 0);
   
 

};

//instance mode https://p5js.org/reference/#/p5/p5
//all p5 functions are bound up in a single variable



// let sketch = function(p) {
//     let graphics;
//     let img;

//   p.preload = function(){
//     graphics.img = p.loadImage('type.jpg');
    
//   }

//   p.setup = function(){
//     p.createCanvas(1000, 1000);
//     graphics = p.createGraphics(500, 500);
    

//     p.background(100);

//     // p.img.loadPixels(); // loads image
//     // p.img.resize(200, 0); // resizes image to canvas width
//     // p.img.updatePixels(); // updates image

//     graphics.img.loadPixels(); // loads image
//     graphics.img.resize(200, 0); // resizes image to canvas width
//     graphics.img.updatePixels(); // updates image

//   }


// p.draw = function(){

//     p.image(graphics.img, 50, 50);
   

//     let cell = 10; //size for each pixel

   

//     // for (let i=0; i< p.img.height; i++){
//     //     for (let j=0; i< p.img.width; j++){
//     //         var index = (i + j * p.img.width) * 4;
//     //         var r = p.img.pixels[index + 0];
//     //         var g = p.img.pixels[index + 1];
//     //         var b = p.img.pixels[index + 2];

//     //         var color = ((0.3 * r) + (0.59 * g) + (0.11 * b))
//     //         p.fill(color)

//     //         p.rect(i, j, cell, cell)

//     //     }
//     // }

//   }
// };

// //instance mode https://p5js.org/reference/#/p5/p5
// //all p5 functions are bound up in a single variable
// new p5(sketch, 'container');

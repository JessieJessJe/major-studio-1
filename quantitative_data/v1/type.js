const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
var JSON = require('./data.json');


const settings = {
	dimensions: [ 1500, 1080 ]
};

let manager;

let text = 'NMAH';
let fontSize = 50;
let fontFamily = 'Helvetica';

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {
	const cell = 5;
	const cols = Math.floor(width  / cell);
	const rows = Math.floor(height / cell);
	const numCells = cols * rows;

	typeCanvas.width  = cols;
	typeCanvas.height = rows;

	return ({ context, width, height }) => {
		typeContext.fillStyle = 'black';
		typeContext.fillRect(0, 0, cols, rows);

		fontSize = cols * 0.3;

		typeContext.fillStyle = 'white';
		typeContext.font = `${fontSize}px ${fontFamily}`;
		typeContext.textBaseline = 'top';

		const metrics = typeContext.measureText(text);
		const mx = metrics.actualBoundingBoxLeft * -1;
		const my = metrics.actualBoundingBoxAscent * -1;
		const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
		const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

		// const tx = (cols - mw) * 0.5 - mx;
		// const ty = (rows - mh) * 0.5 - my;

		const tx = (cols - mw) * 0.1 - mx;
		const ty = (rows - mh) * 0.1 - my;

		typeContext.save();
		typeContext.translate(tx, ty);

		typeContext.beginPath();
		typeContext.rect(mx, my, mw, mh);
		typeContext.stroke();

		
		typeContext.fillText(text, 0, 0);
		typeContext.restore();

		const typeData = typeContext.getImageData(0, 0, cols, rows).data;


		context.fillStyle = 'black';
		context.fillRect(0, 0, width, height);

		context.textBaseline = 'middle';
		context.textAlign = 'center';

		//define array of random colors
		getColor();
		

		let column_has_type = Array.apply(false, Array(cols))

		//first find out which columns are covered by the type
		for (let i = 0; i < numCells; i++) {
			const col = i % cols;
			const row = Math.floor(i / cols);

			const r = typeData[i * 4 + 0];
			const g = typeData[i * 4 + 1];
			const b = typeData[i * 4 + 2];
			const a = typeData[i * 4 + 3];

			if (!column_has_type[col]){
				
				column_has_type[col] = isRow(r, row);
			} 
		}

		// console.log('result of column calculations: ', column_has_type);

		//calculate all true columns
		let column_has_type_count = 0;
		for (let key in column_has_type){
			if (column_has_type[key]){ column_has_type_count += 1}
		}

		// console.log('result of column calculations counts: ', column_has_type_count);

		getSize(column_has_type, column_has_type_count);


		for (let i = 0; i < numCells; i++) {
			const col = i % cols;
			const row = Math.floor(i / cols);

			const x = col * cell;
			const y = row * cell;

			const r = typeData[i * 4 + 0];
			const g = typeData[i * 4 + 1];
			const b = typeData[i * 4 + 2];
			const a = typeData[i * 4 + 3];

			// const glyph = getGlyph(r);
			// const glyph = getGlyph(r, col,text);
			const isrow = isRow(r, row);

			context.font = `${cell * 2}px ${fontFamily}`;
			if (Math.random() < 0.1) context.font = `${cell * 6}px ${fontFamily}`;

			context.fillStyle = 'white';

			context.save();
			context.translate(x, y);
			context.translate(cell * 0.5, cell * 0.5);

			if (isrow){

				//method 1
				// context.fillStyle = colorScale[getIndex()];

				//method 2
				context.fillStyle = columnColor[col];

				context.fillRect(0, 0, cell, cell*2);
				// context.fillText(glyph, 0, 0);
			} else {
				
				// context.fillRect(0, 0, cell/10, cell/10);	
			}

			// context.fillRect(0, 0, cell/10, cell/10);	
			// const size = randomSize(x,y);
			// context.fillRect(0, 0, size, size);	
			

			// context.fillText(glyph, 0, 0);
			
			context.restore();

		}



		
	};
};

let sizeScale = []
let columnColor = []

const getSize = (column_has_type, column_has_type_count)=>{

	let sum = 0;
	JSON.forEach(d =>{
		sum += parseInt(d.count)
	})	

	sizeScale = JSON.map(d =>{
		return Math.trunc((parseInt(d.count)/sum)*column_has_type_count)+1
	})

	let index = 0;
	//loop over 44 cultures categories
	for (let i=0; i<sizeScale.length; i++){

		//loop over # of columns in each culture category
		let fill = 0
		while (fill < sizeScale[i] && index < column_has_type.length){
			if (column_has_type[index]){
				columnColor[index]=colorScale[i]
				fill += 1
			}
			index += 1;
		}
	}

	// console.log('sizeScale', columnColor)

}

const randomSize = (x,y)=>{

	const n = random.noise3D(x, y, 1000, 1.1);
	const scale = math.mapRange(n, -1, 1, 0, 5);

	return scale
	
}

let colorScale = [];

function getColor(){

	c = Math.floor(255/7);

	for (var i = 0; i < 7; i++) {
		for (var j = 0; j < 7; j++) {
		  colorScale.push('rgb(' + Math.floor(255 - c * i) + ', ' +
						   Math.floor(255 - c * j) + ', 200)');
		}
	  }

	//shuffle the order
	colorScale = colorScale.sort(() => Math.random() - 0.5)
	console.log(colorScale)
}

let rangeCol = 0;
let rangeKey = 0;

const getIndex = (col, cols) => {
	//col: current col; cols:total col in the grid

	//method 1: randomly assign each square a color based on %distribution
	const weights = JSON.map(d => parseInt(d.count))
	const index = random.weighted(weights);

	//method 2: column as axis

	rangeCol += 1;

	// for (let key in sizeScale){
	// 	rangeCol += sizeScale[key] * 
	// }

	return index

};

const isRow = (v) => {
	// if (v < 50) return '';
	// if (v < 100) return '.';
	// if (v < 150) return '-';
	if (v > 150){
		return true	
	} 
	else {
	return false
}
	// const glyphs = '_= /'.split('');

	// return random.pick(glyphs);
};

 
const onKeyUp = (e) => {
	text = e.key.toUpperCase();
	manager.render();
};

document.addEventListener('keyup', onKeyUp);


const start = async () => {
	manager = await canvasSketch(sketch, settings);
};

start();





/*
const url = 'https://picsum.photos/200';

const loadMeSomeImage = (url) => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => reject();
		img.src = url;
	});
};

const start = async () => {
	const img = await loadMeSomeImage(url);
	console.log('image width', img.width);
	console.log('this line');
};

// const start = () => {
// 	loadMeSomeImage(url).then(img => {
// 		console.log('image width', img.width);
// 	});
// 	console.log('this line');
// };


start();
*/

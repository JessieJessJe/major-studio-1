var tilesPerRow = 4;
var tileSize = 100;
var barWidth = tilesPerRow * tileSize + 10;

function getTiles(num) {
  var tiles = [];

  for(var i = 0; i < num; i++) {
    var rowNumber = Math.floor(i / tilesPerRow);
    tiles.push({
      x: (i % tilesPerRow) * tileSize,
      y: -(rowNumber + 1) * tileSize
    });
  }

  return tiles
}

function updateBar(d, i, items) {

  console.log (d, i, items)

  var tiles = getTiles(d);

  var u = d3.select("#_" + i)
    .attr("transform", "translate(" + i * barWidth + ", 800)")
    .selectAll("image")
    .data(tiles);


      // customize image------------------------------
      u.enter()
      .append("svg:image")
      .merge(u)
      .attr("x", function(d) {       
        return d.x;
      })
      .attr("y", function(d) {
        return d.y;
      })
      .attr("width", tileSize)
      .attr("height", tileSize)
      .transition()
      .delay(function(d, i) {
        return i * 20;
      })
      .style("opacity", 1)

      .attr("xlink:href", function(d,i){
        return `${items[i].root}`
      })
      // .attr("xlink:href", `https://s3.amazonaws.com/assets.saam.media/files/styles/x_large/s3/files/images/1992/SAAM-1992.13.107_1.jpg`)
      //end of customize


  u.exit().remove();

  updateLabel(i, items)

}


function updateLabel(i, items) {
  var el = d3.select("#_" + i)
    .select("text");
 
  if(el.empty()) {
    el = d3.select("#_" + i)
      .append("text")
      .attr("y", -4)
      .attr("y", +40)
      // .attr("transform", "(rotate(-90))")
      .style("font-weight", "bold")
      .style("font-size", "30px")
      .style("fill", "#777");
  }
 
  el.text(items[0].group);
}


function updateBars(group_items) {

  var u = d3.select("g.bars")
    .selectAll("g")
    .data(getGroupCounts(group_items));
   
  u.enter()
    .append("g")
    .attr("id", function(d,i){ return "_" + i; } )
    .merge(u)
    .each(function(d,i){
      updateBar(d, i, group_items[i])
     
    })
   
      
      
      
   
  u.exit().remove();
}


function getGroupCounts(group_items){
  let counts = new Array(group_items.length).fill(0);

  for (let i=0; i< group_items.length; i++){
    counts[i] = group_items[i].length
  }

  return counts
}


d3.json("./data_crop.json", function(err, data) {
  
 //re-arrange the data_json file to creat bar charts in d3
 let groups = ['Child', 'Figur', 'Tools', 'Lands', 'Animl', 'Plant']

 let group_counts = new Array(groups.length).fill(0);
 let group_items = [];

 for (let i=0; i< groups.length; i++){
   group_items[i] = [];
 }

 for (let i=0; i< groups.length; i++){

    for (let d in data){

      if (data[d].group === groups[i]){

        group_counts[i] += 1;
        group_items[i].push(data[d]);
      }
    }
 }

  console.log(group_items)

  // initialize();
  // update();

  updateBars(group_items);


  // updateBar(15, data.map( d => d.root));

});

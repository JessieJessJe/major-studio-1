var tilesPerRow = 25;
var tileSize = 100;

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

function updateBar(d, title) {
  var tiles = getTiles(d);

  console.log(title)

  var u = d3.select(".bars")
    .attr("transform", "translate(100, 600)")
    .selectAll("image")
    .data(tiles);


      // customize image------------------------------
      u.enter()
      .append("svg:image")
      // .style("opacity", 0)
      // .style("stroke", "white")
      // .style("stroke-width", "0.5")
      // .style("shape-rendering", "crispEdges")
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
        return `./images/${title[i]}.jpg`
      })
      // .attr("xlink:href", `https://s3.amazonaws.com/assets.saam.media/files/styles/x_large/s3/files/images/1992/SAAM-1992.13.107_1.jpg`)
      //end of customize


  u.exit().remove();
}


d3.json("./data_raw.json", function(err, data) {
  

  // initialize();
  // update();

  

  updateBar(125, data.map( d => d.title));

});

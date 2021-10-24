var tilesPerRow = 5;
var tileSize = 80;
var barWidth = tilesPerRow * tileSize + 10;

var filteredData; 
var selectMode = "show", selectedYearBegin = "1894", selectedYearEnd = "1919";

const COLOR = {
  "USA": "#8CC6D4",
  "Japan": "#BAABC8",
  "Mexico": "#EAD971"
}


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

function updateBarHide(d, i, items) {

  console.log (d, i, items)

  var tiles = getTiles(d);

  var u = d3.select("#_" + i)
    .attr("transform", "translate(" + i * barWidth + ", 900)")
    .selectAll("rect")
    .data(tiles);


      // only color tiles------------------------------
      u.enter()
      .append("rect")
      .style("stroke", "white")
      .style("stroke-width", "0.5")
      .style("shape-rendering", "crispEdges")

    
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
      .style("fill", function(d, i) {
        return items[i].color;
      })
       //end of color tiles

  u.exit().remove();

  updateLabel(i, items)

}


function updateBar(d, i, items) {

  console.log (d, i, items)

  var tiles = getTiles(d);

  var u = d3.select("#_" + i)
    .attr("transform", "translate(" + i * barWidth + ", 900)")
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
  
  if (items[0]){
    el.text(items[0].group);
  }

}


function updateBars(group_items, selectMode) {

  var u = d3.select("g.bars")
    .selectAll("g").remove();

    u = d3.select("g.bars")
    .selectAll("g").data(getGroupCounts(group_items));
  
  if (selectMode == "show"){
    u.enter()
    .append("g")
    .attr("id", function(d,i){ return "_" + i; } )
    .merge(u)
    .each(function(d,i){
      updateBar(d, i, group_items[i])  
    })
  }

  else{
    u.enter()
    .append("g")
    .attr("id", function(d,i){ return "_" + i; } )
    .merge(u)
    .each(function(d,i){
      updateBarHide(d, i, group_items[i])  
    })

  }
  
  u.exit().remove();
}


function getGroupCounts(group_items){
  let counts = new Array(group_items.length).fill(0);

  for (let i=0; i< group_items.length; i++){
    counts[i] = group_items[i].length
  }

  return counts
}

function prepareJson(data, selectedYearBegin, selectedYearEnd){

    //re-arrange the data_json file to creat bar charts in d3
    let order = ['Child', 'Mother(Adult)', 'Tool', 'Landscape', 'Animal', 'Plant']

    let g = data.map( d => { return d.group})

    let groups_raw = [...new Set(g)]

    let groups = order.map( function(g){

      console.log(g)
      if (groups_raw.includes(g)){
        return g
      }
    });

    // groups = groups.slice().sort(function(a,b) {
    //   return order.indexOf( a.group ) - order.indexOf( b.group );
    // })

    console.log(groups)

    let group_counts = new Array(groups.length).fill(0);
    let group_items = [];

    for (let i=0; i< groups.length; i++){
      group_items[i] = [];
    }

    for (let i=0; i< groups.length; i++){

        for (let d in data){

          if (data[d].group === groups[i] && data[d].date >= selectedYearBegin && data[d].date <= selectedYearEnd ){

            group_counts[i] += 1;
            group_items[i].push(data[d]);
          }
        }
    }

   return group_items

}

d3.json("./data_crop.json", function(err, data) {
  
 
  let group_items = prepareJson(data, selectedYearBegin, selectedYearEnd);

  updateBars(group_items, selectMode);

  d3.select("select.mode")
  .on("change", function() {
    selectMode = this.value;
    updateBars(group_items, selectMode);
  })

  d3.select("select.year")
  .on("change", function() {
    let value = this.value;
    
    selectedYearBegin = parseInt(value.split(',')[0])
    selectedYearEnd = parseInt(value.split(',')[1])
    let group_items = prepareJson(data, selectedYearBegin, selectedYearEnd);
    updateBars(group_items, selectMode);
  })

});

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
  sizes: [20, 80],

})


  // var w = window.innerWidth * 0.7;
  var w = document.getElementById("landing-page-right").offsetWidth;
  var h = document.getElementById("landing-page-right").offsetHeight;

  var tilesPerRow = 6;
  var tileSize = (w * 0.9 )/ ((tilesPerRow * 6));
  var barWidth = tilesPerRow * tileSize + w*0.01;
  
  var selectMode = "show", selectedYearBegin = "1894", selectedYearEnd = "1919", selectView = "bar";

// const COLOR = {
//   "USA": "#8CC6D4",
//   "Japan": "#BAABC8",
//   "Mexico": "#EAD971"
// }

function setTileSize(){
  w = document.getElementById("landing-page-right").offsetWidth;
  tileSize = (w * 0.9 )/ ((tilesPerRow * 6));
  barWidth = tilesPerRow * tileSize + w*0.01;
}

function setTilesPerRow(a){
  tilesPerRow = a;
  barWidth = tilesPerRow * tileSize + 10;
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
      .transition()
      .delay(function(d, i) {
        return i * 20;
      })
      .attr("width", tileSize)
      .attr("height", tileSize)
      .style("opacity", 1)
      .style("fill", function(d, i) {
        return items[i].color;
      })
       //end of color tiles

  u.exit().remove();

  updateLabel(i, items)

}


function updateBar(d, i, items) {

  var tiles = getTiles(d);

  var u = d3.select("#_" + i)
    .attr("transform", "translate(" + i * barWidth + ", 900)")
    .selectAll("image")
    .data(tiles);


      // customize image square ------------------------------
      // u.enter()
      // .append("svg:image")
      // .merge(u)
      // .attr("x", function(d) {       
      //   return d.x;
      // })
      // .attr("y", function(d) {
      //   return d.y;
      // })
      // .transition()
      // .delay(function(d, i) {
      //   return i * 20;
      // })
      // .attr("width", tileSize)
      // .attr("height", tileSize)
      // .style("opacity", 1)
      // .attr("xlink:href", function(d,i){
      //   return `${items[i].root}`
      // })
       //end of customize

       // image in circles

      //  u.append('svg:defs');

      d3.select("#_" + i).append("svg:defs")  

      tiles.forEach(function(d,index){

          d3.select("#_" + i)  
            .append('clipPath')
            .attr('id',`clipObj${index}`)
            .append('circle')
            .attr('cx', d.x + tileSize / 2)
            .attr("cy", d.y + tileSize / 2)
            .attr('r', tileSize / 2)
        }

      )
      

    var myimg =  u.enter()
       .append("svg:image")
       .merge(u)
       .attr("x", function(d) {       
         return d.x;
       })
       .attr("y", function(d) {
         return d.y;
       })
       .attr("cursor", "pointer")
       .on("click", function(d,i) {
        clickinfo(items[i])
      })

      myimg.transition()
       .delay(function(d, i) {
         return i * 2;
       })
       .attr("width", tileSize)
       .attr("height", tileSize)
       .style("opacity", 1)
    
       .attr("xlink:href", function(d,i){
         return `${items[i].root}`
       })
       .attr('clip-path', function(d,i){
         return `url(#clipObj${i})`
       })


       // end of image in circles

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
      .attr("y", +20)
      // .attr("transform", "(rotate(-90))")
      .style("font-weight", "normal")
      .style("font-size", "1rem")
      .style("fill", "black");
  }
  
  if (items[0] && selectView == "bar"){
    el.text(items[0].group);
  }

}


function updateBars(group_items) {

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

    // console.log("updateBars", u)

  }

  else if (selectMode == "hide"){
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

//re-arrange the data_json file to creat bar charts in d3
function prepareJson(data, selectedYearBegin, selectedYearEnd){

    //make sure after filtering, the remaining categories stored in 'groups' still in the same order
   
    let order = ['Child', 'Mom(Adult)', 'Tool', 'Landscape', 'Animal', 'Plant']

    let g = data.map( d => { return d.group})
    let groups_raw = [...new Set(g)]

    let groups = order.map( function(g){
      if (groups_raw.includes(g)){
        return g
      }
    });

    //initializing...
    let group_counts = new Array(groups.length).fill(0);
    let group_items = [];

    for (let i=0; i< groups.length; i++){
      group_items[i] = [];
    }


    for (let i=0; i< groups.length; i++){

        for (let d in data){

          //filtering by group, year
          if (data[d].group === groups[i] && data[d].date >= selectedYearBegin && data[d].date <= selectedYearEnd ){

            group_counts[i] += 1;
            group_items[i].push(data[d]);
          }
        }
    }

    //rearranging the image tiles based on T-SNE result

    for (let g in group_items){

      group_items[g].sort( function(a,b){
        return a.posid - b.posid
      })
    }

   return group_items

}

function prepareGrid(data, selectedYearBegin, selectedYearEnd){
  
  let group_items = []
  group_items[0] = []

  for (let d in data){

    //filtering by group, year
    if (data[d].date >= selectedYearBegin && data[d].date <= selectedYearEnd ){
      group_items[0].push(data[d])
    }
  }

  group_items[0].sort(function(a,b){
        return a.posid - b.posid})

  group_items[0].splice().forEach(function(d){
      d.group = "overview"
  })

  console.log( 'overview' ,group_items)

  return group_items
 
}

function drawD3(){


d3.json("./data_crop.json", function(err, data) {

  function yearFilterShow(){
    if (selectView == "bar"){
          
      group_items = prepareJson(data, selectedYearBegin, selectedYearEnd);
      updateBars(group_items, selectMode);
    }
    else{
      group_items = prepareGrid(data, selectedYearBegin, selectedYearEnd);
      updateBars(group_items, selectMode);
    }
  }

  let group_items = prepareJson(data, selectedYearBegin, selectedYearEnd);
  initialize(group_items);

  //-------------filter---view---------------------

  d3.select("#barview")
  .on("change", function() {

    if (d3.select("#barview").property("checked") == true){

      d3.select("#gridview").property('checked', false);

      selectView = "bar";
      setTilesPerRow(5);
      group_items = prepareJson(data, selectedYearBegin, selectedYearEnd);
      updateBars(group_items, selectMode);

    }

    else if (d3.select("#barview").property("checked") == false){

      d3.select("#gridview").property('checked', true);

      selectView = "grid";
      setTilesPerRow(30)

      group_items = prepareGrid(data, selectedYearBegin, selectedYearEnd)
      updateBars(group_items, selectMode);
    }
    
  })

 
  d3.select("#gridview")
  .on("change", function() {

    if (d3.select("#gridview").property("checked") == true){

      d3.select("#barview").property('checked', false);

      selectView = "grid";
      setTilesPerRow(30);

      group_items = prepareGrid(data, selectedYearBegin, selectedYearEnd)
      updateBars(group_items, selectMode);

    }

    else if (d3.select("#gridview").property("checked") == false){

      d3.select("#barview").property('checked', true);

      selectView = "bar";
      setTilesPerRow(5)
      group_items = prepareJson(data, selectedYearBegin, selectedYearEnd);
      updateBars(group_items, selectMode);

    }
    
  })

  //-------------filter---image---------------------
  d3.select("#showimg")
  .on("change", function() {

    if (d3.select("#showimg").property("checked") == true){
      d3.select("#hideimg").property('checked', false);
      selectMode = "show";
      updateBars(group_items, selectMode);
    } else {
      d3.select("#hideimg").property('checked', true);
      selectMode = "hide";
      updateBars(group_items, selectMode);
    }
      
  })

  d3.select("#hideimg")
  .on("change", function() {

    if (d3.select("#hideimg").property("checked") == true){
      d3.select("#showimg").property('checked', false);
      selectMode = "hide";
      updateBars(group_items, selectMode);
    } else {
      d3.select("#showimg").property('checked', true);
      selectMode = "show";
      updateBars(group_items, selectMode);
    }
      
  })

  //-------------filter---year---------------------

  // d3.select("select.year")
  //   .on("change", function() {
  //     let value = this.value;
      
  //     selectedYearBegin = parseInt(value.split(',')[0])
  //     selectedYearEnd = parseInt(value.split(',')[1])

  //     if (selectView == "bar"){
  
  //       group_items = prepareJson(data, selectedYearBegin, selectedYearEnd);
  //       updateBars(group_items, selectMode);
  //     }
  //     else{
  //       group_items = prepareGrid(data, selectedYearBegin, selectedYearEnd);
  //       updateBars(group_items, selectMode);
  //     }

  // })

  //in select mode
  d3.select("#year1894")
    .on("change", function() {

    if ( d3.select("#year1894").property("checked") == true){
      d3.selectAll(".year").property('checked', false);

      let value = this.value;

      selectedYearBegin = parseInt(value.split(',')[0])
      selectedYearEnd = parseInt(value.split(',')[1])

      yearFilterShow()

    } else {
      d3.select("#year1894").property('checked', true);

      selectedYearBegin = 1894;
      selectedYearEnd = 1919;
  
      yearFilterShow()

    }
  }) // ---end of year all


  d3.selectAll(".year")
  .on("change", function() {

    console.log(this.checked, 'checkbox')

  if ( this.checked == true){

    d3.selectAll(".year").property('checked', false);
    d3.select("#year1894").property('checked', false);
    this.checked = true;

    let value = this.value;

    let everytime = d3.selectAll(".year")
    console.log(everytime, 'everytime')
    
    // let begin = parseInt(value.split(',')[0])
    // let end = parseInt(value.split(',')[1])
    // selectedYearBegin = Math.min(begin, parseInt(value.split(',')[0]))
    // selectedYearEnd = Math.max(end,parseInt(value.split(',')[1]))

    selectedYearBegin = parseInt(value.split(',')[0])
    selectedYearEnd = parseInt(value.split(',')[1])

    yearFilterShow()

  } else {

    d3.select("#year1894").property('checked', true);

    selectedYearBegin = 1894;
    selectedYearEnd = 1919;

    yearFilterShow()

  }
})
//-------------------end of year
});
    
}


function initialize(group_items){

  d3.select("#barview").property('checked', true);
  d3.select("#gridview").property('checked', false);
  
  d3.select("#showimg").property('checked', true);
  d3.select("#hideimg").property('checked', false);

  d3.selectAll(".year").property('checked', false);
  d3.select("#year1894").property('checked', true);



  updateBars(group_items, selectMode);


}

//initial drawing
drawD3();


//once resized, reload the drawing

const resizeObserver = new ResizeObserver(entries => {
  for (let entry of entries) {
    if(entry.contentBoxSize) {
      // Firefox implements `contentBoxSize` as a single content rect, rather than an array
      const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize;
      console.log("changesize,", entry.contentRect.width)
          setTileSize();
          drawD3();
    } else {
        console.log("changesize,", entry.contentRect.width)
          setTileSize();
          drawD3();
    }
  }

});

const observerTarget = document.getElementById("landing-page-right");

resizeObserver.observe(observerTarget);
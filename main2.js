d3.csv(
    
    "prof.csv",
    
    function(d) {
        return {
            nome : d.nome,
            specializzazioni : d["abilitazioni professionali"],
        }; 
    },
    
    function(data) {
        
         var people = d3.nest()
            .key(function(d) { return d.specializzazioni  })
            .entries(data);
        
        console.log(people)
        

var chartWidth       = 300,
    barHeight        = 20,
    groupHeight      = function (d) { barHeight * d.values.length },
    gapBetweenGroups = 10,
    spaceForLabels   = 150,
    spaceForLegend   = 150;


// Color scale
var chartHeight = barHeight * people.length + gapBetweenGroups * data.length;

var x = d3.scaleLinear()
    .domain(people.map(function (d) { return d.key; }))
    .range([0, chartWidth]);

var y = d3.scaleLinear()
    .domain([
        0,
        d3.max(people, function (d) { return d.values.length; })
    ])
    .range([chartHeight + gapBetweenGroups, 0]);
   
        
      
var yAxis = d3.svg.axis(y)
    .tickFormat('')
    .tickSize(0)
    .orient("left")
    .tickPadding(8);

// Specify the chart area and dimensions
var chart = d3.select(".chart")
    .attr("width", spaceForLabels + chartWidth + spaceForLegend)
    .attr("height", chartHeight);

// Create bars
var bar = chart.selectAll("g")
    .data(people)
    .enter().append("g")
    .attr("transform", function(d, i) {
      return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/d.key))) + ")";
    });
        
    

// Create rectangles of the correct width
bar.append("rect")
    .attr("fill", function(d,i) { return color(i % data.series.length); })
    .attr("class", "bar")
    .attr("width", x)
    .attr("height", barHeight - 1);

// Add text label in bar
bar.append("text")
    .attr("x", function(d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("fill", "red")
    .attr("dy", ".35em")
    .text(function(d) { return d; });

// Draw labels
bar.append("text")
    .attr("class", "label")
    .attr("x", function(d) { return - 10; })
    .attr("y", groupHeight / 2)
    .attr("dy", ".35em")
    .text(function(d,i) {
      if (i % data.series.length === 0)
        return data.labels[Math.floor(i/data.series.length)];
      else
        return ""});

chart.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups/2 + ")")
      .call(yAxis);

    }); 
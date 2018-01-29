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
    


var margin = {
    	top: 40,
    	right: 40,
    	bottom: 40,
    	left: 40
	},
	width = 500,
	height = 250;

var x = d3.scaleBand()
    .domain(people.map(function (d) { return d.key; }))
    .rangeRound([0, width - margin.left - margin.right])
    .paddingInner(0.05);

var y = d3.scaleLinear()
    .domain([
        0,
        d3.max(people, function (d) { return d.values.length; })
    ])
    .range([height - margin.top - margin.bottom, 0]);

            

var xAxis = d3.axisBottom(x)
    .tickSize(6)
    .tickPadding(8)

var yAxis = d3.axisLeft(y)
    .tickPadding(8);



var svg = d3.select('#grafcontainer').append('svg')
    .attr('class', 'chart')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

var bars = svg.selectAll('.bar')
    .data(people)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', function (d, i) {
    	return x(d.key);
	})
    .attr('y', function (d) {
        console.log(d.values.length, y(d.values.length))
    	return height - margin.top - margin.bottom;
	})
    .attr('width', x.bandwidth())
    .attr('height', function (d) {
    	return 0;
	});

svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0, ' + (height - margin.top - margin.bottom) + ')')
    .call(xAxis);

svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis);


bars.transition()
    .duration(1000)
    .delay(function (d, i) {
    	return i * 750;
	})
    .attr('y', function (d) {
    	return y(d.values.length);
	})
    .attr('height', function (d) {
    	return height - margin.top - margin.bottom - y(d.values.length);
	});
  
 });        
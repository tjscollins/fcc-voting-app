import $ from 'jquery';
import * as d3 from 'd3';

const id = 'plot';

/**
 * plot - description
 *
 * @param  {Array} labels       List of Data Lables
 * @param  {Array} data         List of Numerical Values for each label
 * @param  {Object} options = {} Contains options for various display parameters
 */
function plot(labels, data) {
  console.log('Plotting!');
  let labeledData = data.map((d, i) => {
    return [d, labels[i]];
  });
  const margin = {
    top: 25,
    bottom: 50,
    left: 90,
    right: 25,
  };

  const [width,
    height,
    radius] = [400, 300, 100];

  let color = d3
    .scaleOrdinal()
    .range([
      '#a6cee3',
      '#1f78b4',
      '#b2df8a',
      '#33a02c',
      '#fb9a99',
      '#e31a1c',
      '#fdbf6f',
      '#ff7f00',
      '#cab2d6',
      '#6a3d9a',
      '#ffff99',
      '#b15928',
    ]);
  let chart = d3
    .select('#chart')
    .append('svg')
    .attr('id', 'plot')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (radius + margin.left) + ',' + (radius + margin.top) + ')');

  let arc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(radius);

  let pie = d3
    .pie()
    .value((d) => {
      return d[0];
    })
    .sort(null);

  let path = chart
    .selectAll('path')
    .data(pie(labeledData))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', (d) => {
      console.log('Filling pie', d.data);
      return color(d.data[1]);
    })
    .on('mouseover', function(d) {
      div
        .transition()
        .duration(200)
        .style('opacity', 0.8);
      div.html('<h4>' + d.data[1] + '</h4><p>' + d.data[0] + ' Votes</p>');
    })
    .on('mouseout', function(d) {
      div
        .transition()
        .duration(500)
        .style('opacity', 0);
    });

  let div = d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip')
    .attr('id', 'tooltip')
    .style('opacity', 0);

  window.onmousemove = function(e) {
    let {clientX, clientY} = e;
    $('.tooltip').each((index, node) => {
      node.style.top = (clientY - 20) + 'px';
      node.style.left = (clientX + 20) + 'px';
    });
  };
}

export default plot;

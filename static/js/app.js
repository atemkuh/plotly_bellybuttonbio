function init() {
  d3.json("samples.json").then((data) => {
    var idArr = [];
    idArr = data.names;
    var idList = d3.select(selDataset);
    for (var i = 0; i < idArr.length; i++) {
      idList.append("option").property("value", i).text(idArr[i]);
    }

    var values = data.samples[0].sample_values;
    var labels = data.samples[0].otu_ids;
    var hovertext = data.samples[0].otu_labels;
    // create data slices and reverse values
    var barValues = values.slice(0, 10).reverse();
    var barLabels = labels.slice(0, 10).reverse();
    var barHovertext = hovertext.slice(0, 10).reverse();

    //horizontal barChart label
    var utLabels = [];
    for (var i = 0; i < 10; i++) {
      utLabels[i] = "UT " + barLabels[i];
    }

    //setup Horizontal Bar for top 10 sample data
    var barData = [{
      type: 'bar',
      x: barValues,
      y: utLabels,
      text: barHovertext,
      orientation: 'h'
    }];

    //use plotly to plot web page bar charts
    Plotly.newPlot('bar', barData);
    // for bubble charts ssample data
    var bubbleData = [{
      x: labels,
      y: values,
      text: hovertext,
      mode: 'markers',
      marker: {
        color: labels,
        size: values
      }
    }];

    //variable for bubbleData layout
    var bubbleLayout = {
      showlegend: false,
      height: 600,
      width: 1000,
      xaxis: { title: "OTU ID" }
    };

    
    //use plotly to plot web page bubble charts
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    //set variables for "sample-metadata" and "metadata"

    var mData = d3.select("#sample-metadata");//sample-metadata
    var metadata = data.metadata[0];//metadata to pull initial records

   
    Object.entries(metadata).forEach(([key, value]) => {
      mData.append("p").text(`${key}: ${value}`);
    });

  // bonus gauge  

    var traceGauge = [{
      type: 'pie',
      showlegend: false,
      hole: 0.6,
      rotation: 90,
      values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
      text: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9'],
      direction: 'clockwise',
      textinfo: 'text',
      textposition: 'inside',
      marker: {
        colors: ["#1a05e6",
                "#330acc",
                "#4d0fb3",
                "#661499",
                "#7f1a80",
                "#991f66",
                "#b3244d",
                "#cc2933",
                "#e52e1a",
                'WHITE'
              ],
        labels: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9'],
        hoverinfo: '"text+name"'
      }
    }];

    // calculate meter point using trig
    var degrees = 180 - 20 * metadata.wfreq;// use washing frequency value "wfreq" to get degree.
    var radius = .3;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians) + 0.5;
    var y = radius * Math.sin(radians) + 0.5;// radius for small circle
    var innerRadius = 0.02;
    var innerDegrees1 = degrees + 90;
    var innerRadians1 = innerDegrees1 * Math.PI / 180;
    var innerX0 = innerRadius * Math.cos(innerRadians1) + 0.5;
    var innerY0 = innerRadius * Math.sin(innerRadians1) + 0.5;
    var innerDegrees2 = degrees - 90;
    var innerRadians2 = innerDegrees2 * Math.PI / 180;
    var innerX1 = innerRadius * Math.cos(innerRadians2) + 0.5;
    var innerY1 = innerRadius * Math.sin(innerRadians2) + 0.5;

    var gaugeLayout = {
      shapes: [
        {
          type: 'circle',
          x0: 0.47,
          y0: 0.47,
          x1: 0.53,
          y1: 0.53,
          fillcolor: '#00A693',
          line: {
            color: '#00A693',
            width: 3
          }
        },
        {
          type: 'line',
          x0: innerX0,
          y0: innerY0,
          x1: innerX1,
          y1: innerY1,
          line: {
            color: '#00A693',
            width: 3
          }
        },
        {
          type: 'line',
          x0: innerX0,
          y0: innerY0,
          x1: x,
          y1: y,
          line: {
            color: '#00A693',
            width: 3
          }
        },
        {
          type: 'line',
          x0: innerX1,
          y0: innerY1,
          x1: x,
          y1: y,
          line: {
            color: '#00A693',
            width: 3
          }
        }],
      title: '<b>Belly Button Washing Frequency</b><br>Scrubs Per Week',
      hovermode: false,
      width: 500,
      height: 500
    }
    Plotly.newPlot('gauge', traceGauge, gaugeLayout, { modeBarButtons: [["toImage"]] });
  });
}
//optionChanged function
function optionChanged(selectValue) {
  d3.json("samples.json").then((data) => {
//filtering data by using sample and matching with ID's
    
    var values = data.samples[selectValue].sample_values;
    var labels = data.samples[selectValue].otu_ids;
    var hovertext = data.samples[selectValue].otu_labels;
    //slice and reverse datasets
    var barValues = values.slice(0, 10).reverse();
    var barLabels = labels.slice(0, 10).reverse();
    var barHovertext = hovertext.slice(0, 10).reverse();
    var utLabels = [];
    for (var i = 0; i < 10; i++) {
      utLabels[i] = "UT " + barLabels[i];
    }
    //bar and bubble values to update charts
    Plotly.restyle("bar", "x", [barValues]);
    Plotly.restyle("bar", "y", [utLabels]);
    Plotly.restyle("bar", "text", [barHovertext]);
    Plotly.restyle("bubble", "x", [labels]);
    Plotly.restyle("bubble", "y", [values]);
    Plotly.restyle("bubble", "text", [hovertext]);
    //filter for metadata
    var mData = d3.select("#sample-metadata");
    var metadata = data.metadata[selectValue];
    mData.html("");// reset webpage

    //loop each metadata, find key value and append data to the webpage
    Object.entries(metadata).forEach(([key, value]) => {
      mData.append("p").text(`${key}: ${value}`);
    });

    //get unit function for the washing freq
    var degrees = 180 - 20 * metadata.wfreq;
    var radius = .3;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians) + 0.5;
    var y = radius * Math.sin(radians) + 0.5;
    var innerDegrees1 = degrees + 90;
    var innerDegrees2 = degrees - 90;
    var innerRadius = 0.02;
    var innerRadians1 = innerDegrees1 * Math.PI / 180;
    var innerX0 = innerRadius * Math.cos(innerRadians1) + 0.5;
    var innerY0 = innerRadius * Math.sin(innerRadians1) + 0.5;
    var innerRadians2 = innerDegrees2 * Math.PI / 180;
    var innerX1 = innerRadius * Math.cos(innerRadians2) + 0.5;
    var innerY1 = innerRadius * Math.sin(innerRadians2) + 0.5;

    var update = {
      'shapes[1].x1': innerX1,
      'shapes[1].y1': innerY1,
      'shapes[2].x1': x,
      'shapes[2].y1': y,
      'shapes[3].x1': x,
      'shapes[3].y1': y,
      'shapes[1].x0': innerX0,
      'shapes[1].y0': innerY0,
      'shapes[2].x0': innerX0,
      'shapes[2].y0': innerY0,
      'shapes[3].x0': innerX1,
      'shapes[3].y0': innerY1
    };
    Plotly.relayout("gauge", update);

  });
}

init();

function init() {
// read data from "sample.json" file
  d3.json("samples.json").then((data) => {
    var idArr = [];
    idArr = data.names;
    var idList = d3.select(selDataset);
    for (var i = 0; i < idArr.length; i++) {
      idList.append("option").property("value", i).text(idArr[i]);
    }

    var labels = data.samples[0].otu_ids;
    var values = data.samples[0].sample_values;
    var hovertext = data.samples[0].otu_labels;

    // create data slices and reverse values
    var barLabels = labels.slice(0, 10).reverse();
    var barValues = values.slice(0, 10).reverse();
    var barHoverText = hovertext.slice(0, 10).reverse();

    //horizontal barChart label
    var utLabels = [];
    for (var i =0; i < 10; i++) {
      utLabels[i] = "UT " + barLabels[i];

    }
    //setup Horizontal Bar for top 10 sample data
    var barData = [{
      type : 'bar',
      x: barValues,
      y: utLabels,
      text: barHoverText,
      orientation: 'h'

    }];
    //use plotly to plot web page bar charts
    Plotly.newPlot('bar', barData);
    // for bubble charts ssample data
    var bubbleData=[{
      x: labels,
      y: values,
      text: hovertext,
      mode: 'markers',
      markers: {
        color: labels,
        size:values
      }
    }];

    //variable for bubbleData layout
    var bubbleLayout={
      showlegend: false,
      height: 600,
      width:1000,
      xaxis:{tittle: "OTU ID"}

    };

    //use plotly to plot web page bubble charts
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    //set variables for "sample-metadata" and "metadata"

    var smData=d3.select("#sample-metadata");//sample-metadata
    var metadata=data.metadata[0]; //metadata to pull initial records

    //loop metadata for each key value pair
    Object.entries(metadata).forEach(([key, value]) => {
      mData.append("p").text(`${key}: ${value}`);
    });

// bonus gauge

var gauge = [{
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
       colors: [
           "rgba(0, 105, 11, .5)",
           "rgba(10, 120, 22, .5)",
           "rgba(14, 127, 0, .5)",
           "rgba(110, 154, 22, .5)",
           "rgba(170, 202, 42, .5)",
           "rgba(202, 209, 95, .5)",
           "rgba(210, 206, 145, .5)",
           "rgba(232, 226, 202, .5)",
           "rgba(240, 230, 215, .5)",
           "rgba(255, 255, 255, 0)"
         ],
       labels: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9'],
       hoverinfo: 'labels'
     }
   }];
   // calculate meter point using trig
   var degrees = 180 - 20 * metadata.wfreq; // use washing frequency value "wfreg" to get degree.
   var radius = .3;
   var radians = degrees * Math.PI / 180;
   var x = radius * Math.cos(radians) + 0.5;
   var y = radius * Math.sin(radians) + 0.5
   var innerRadius = 0.02;// radius for small circle
   var innerDegrees1 = degrees + 90;
   var innerRadians1 = innerDegrees1 * Math.PI / 180;
   var innerX0 = innerRadius * Math.cos(innerRadians1) + 0.5;
   var innerY0 = innerRadius * Math.sin(innerRadians1) + 0.5;
   var innerDegrees2 = degrees - 90;
   var innerRadians2 = innerDegrees2 * Math.PI / 180;
   var innerX1 = innerRadius * Math.cos(innerRadians2) + 0.5;
   var innerY1 = innerRadius * Math.sin(innerRadians2) + 0.5;

   var layout = {
      shapes: [
        {
          type: 'circle',
          x0: 0.47,
          y0: 0.47,
          x1: 0.53,
          y1: 0.53,
          fillcolor: 'lime',
          line: {
            color: 'lime',
            width: 4
          }
        },
        {
          type: 'line',
          x0: innerX0,
          y0: innerY0,
          x1: innerX1,
          y1: innerY1,
          line: {
            color: 'lime',
            width: 4
          }
        },
        {
          type: 'line',
          x0: innerX0,
          y0: innerY0,
          x1: x,
          y1: y,
          line: {
            color: 'lime',
            width: 4
          }
        },
        {
          type: 'line',
          x0: innerX1,
          y0: innerY1,
          x1: x,
          y1: y,
          line: {
            color: 'lime',
            width: 4
          }
        }],
      title: "<b> Belly Button Washing Frequency </b><br> Scrubs Per Week",
      hovermode: false,
      width: 500,
      height: 500
    }
    Plotly.newPlot('GAUGE', gauge, layout, { modeBarButtons: [["toImage"]] });
});
}
















init();

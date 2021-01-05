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
    //use plotly to plot web page charts
    plotly.newPlot('bar', barData);
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












init();

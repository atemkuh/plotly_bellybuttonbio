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
    var barHovertext = hovertext.slice(0, 10).reverse();













init();
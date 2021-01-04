function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata= data.metadata;
    var resultsarray= metadata.filter(sampleobject => sampleobject.id == sample);
    var result= resultsarray[0]
    var PANEL = d3.select("#sample-metadata");
    PANEL.html("");
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key}: ${value}`);
    });

    
  
  });
}



// Initialize the dashboard
init();
// Retrive json Data
const bellyURL = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';


d3.json(bellyURL).then(function(data) {
    console.log(data);

    plotData(data, data.names[0]);

});

d3.selectAll("#selDataset").on("change", updatePlotly);

function plotData(jsonData, ID) {

    let metadata = '';
    let samples = '';

    // Find metadata for submitted ID
    for (let subject in jsonData.metadata) {
        if (jsonData.metadata[subject].id == ID) {
            metadata = jsonData.metadata[subject];
        }
    }

    // Find sample data for submitted ID
    for (let subject in jsonData.samples) {
        if (jsonData.samples[subject].id == ID) {
            samples = jsonData.samples[subject];
        }
    }


    // Create Bar Chart
    bar = [{
       x: (samples.sample_values.slice(0, 10)).reverse(),
       y: (samples.otu_ids.slice(0, 10).map(i => 'OTU ' + i)).reverse(), 
       type: 'bar',
       text: (samples.otu_labels.slice(0, 10)).reverse(),
       orientation: 'h',
    }];

    Plotly.react("bar", bar);

    // Create Bubble Chart
    bubble = [{
        x: samples.otu_ids,
        y: samples.sample_values,
        mode: 'markers', 
        marker: {
            size: samples.sample_values,
            color: samples.otu_ids
        },
        text: samples.otu_labels
    }];

    Plotly.react('bubble', bubble);

    // Create Demographic Chart

    let demoChart = []

    for (let x in metadata) {
        demoChart.push(`${x}: ${metadata[x]}\n`)
    }

    for (let x in demoChart) {
        let cardBody = d3.selectAll("#sample-metadata.card-body").append('p');
        cardBody.text(demoChart[x])
    }
    console.log(demoChart)



}


function updatePlotly() {
    let dropdownMenu = d3.select("#selDataset");
    let subjectID = dropdownMenu.property("value");
    plotData(data, subjectID);
}
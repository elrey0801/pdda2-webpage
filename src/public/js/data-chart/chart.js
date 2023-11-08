// const HOST = process.env.URL;
const arrayRange = (start, stop, step) =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
);

async function getData(element) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: "346653cbcb27ca3618bfcf4f77221b3941def125ec6273430e062fb57b74726370483f407f6d2f370a2a1db27b55e876931b585401bde04b31d7b12baa3f47f8",
            element: element
        })
    };
    try {
        var response = await fetch('http://localhost:8888' + '/get-op-data', options);
        var response = await response.json();
        console.log(response);
        return response.element.i;
    } catch (error) {
        console.log(error);
    }
}

async function drawChart() {
    var element = document.getElementById('select-element').value;
    const xValues = arrayRange(0,24,0.5);
    const value = await getData(element);
    var iValues = value.slice(0,-1);
    var iLimit = Array(48).fill(value.slice(-1)[0]);
    doTheCanvas(xValues, iValues, iLimit, iValues, iLimit, element)
}

function doTheCanvas(xValues, iValues, iLimit, pValues, pLimit, element) {
    var canvasIChart = document.getElementById('canvas-i-chart');
    var canvasPChart = document.getElementById('canvas-p-chart');
    canvasIChart.innerHTML = `<canvas id="iChart" style="width:100%;max-width:600px; max-height: 400px;"></canvas>`;
    canvasPChart.innerHTML = `<canvas id="pChart" style="width:100%;max-width:600px; max-height: 400px;"></canvas>`;
        
    new Chart("iChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: 'blue',
                data: iValues
            },
            {
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: 'red',
                data: iLimit
            },
            ]
        },
        options: {
            plugins: {
                legend: {display: false},
                title: {
                    display: true,
                    text: 'I: ' + element,
                    font: {size: 18}
                }
            },
            pointStyle:false, 
            scales: {
                x: {
                    min: 0, max: 23.5
                },
                y: {
                    min: 0, max: Math.max(Math.max(...iLimit), ...iValues) * 1.1
                }
            }
        }
    });
    new Chart("pChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: 'blue',
                data: pValues
            },
            {
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: 'red',
                data: pLimit
            },
            ]
        },
        options: {
            plugins: {
                legend: {display: false},
                title: {
                    display: true,
                    text: 'P: ' + element,
                    font: {size: 18}
                }
            },
            pointStyle:false, 
            scales: {
                x: {
                    min: 0, max: 23.5
                },
                y: {
                    min: 0, max: Math.max(Math.max(...pLimit), ...pValues) * 1.1
                }
            }
        }
    });
}

async function getElementList() {
    var response = await fetch('http://localhost:8888' + '/get-element-list');
    var response = await response.json();

    var innerSelectSection = ``;

    for(e of response.element)
        innerSelectSection += `<option value="${e}">${e}</option>`;

    var selectSection = await document.querySelector('select');
    selectSection.innerHTML = innerSelectSection;
    $("select").trigger("chosen:updated");
}

function initCanvas() {
    var element = "Data Chart";
    const xValues = arrayRange(0,24,0.5);
    var iValues = Array(48).fill(0);
    doTheCanvas(xValues, iValues, iValues, iValues, iValues, element)
}

initCanvas();
getElementList();

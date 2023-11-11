const HOST = window.location.host.split(':')[0] == 'localhost' ? 'http://localhost:8888' : 'https://' + window.location.host; 

const arrayRange = (start, stop, step) =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
);

async function getData(date, name) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            date: date, 
            name: name
        })
    };
    try {
        var response = await fetch(HOST + '/get-op-data', options);
        var response = await response.json();
        if(response.status == 401) {
            window.location.href = HOST;
        }
        console.log(response);
        return {
            name: response.element.name,
            i: response.element.i,
            p: response.element.p
        }
    } catch (e) {
        console.log(e);
    }
}

function sumArray(arr, sumOption, checkPSign = false) {
    //sumOption=2 -> cộng, sumOption=1 -> trừ, 
    // checkPSign để lấy theo chiều P khi cộng I -> true, cuối cùng khi sum lại thì k cần xét dấu nên false
    var resI = Array(48).fill(0);
    var resP = Array(48).fill(0);
    var pSign = 2;
    for(ele of arr) {
        for(var i = 0; i < 48; ++i) {
            if(checkPSign)
                pSign = ele.p[i] > 0 ? 2 : 1
            resI[i] += Math.round(ele.i[i]*((-1)**sumOption)*((-1)**pSign))
            resP[i] += Math.round(ele.p[i]*(-1)**sumOption)
        }
    }
    return {i: resI, p: resP};
}

async function drawChart() {
    var date = document.getElementById('datepicker').value;
    var plusSelectSection = document.querySelector('#plus-select');
    var minusSelectSection = document.querySelector('#minus-select');
    var plusArray = []
    var minusArray = []
    const xValues = arrayRange(0,24,0.5);
    // thêm sẵn hồi lấy luôn limit chung cái plus
    var limitSelectSection = document.querySelector('#limit-select').value;

    if((plusSelectSection.length + minusSelectSection.length) == 0) {
        var elementSelected = document.querySelector('#filterSelect');
        if(elementSelected.value !== '') {
            singleRes = await getData(date, elementSelected.value)
            var iValues = singleRes.i.slice(0,-1);
            var iLimit = Array(48).fill(singleRes.i.slice(-1)[0]);
            var pValues = singleRes.p.slice(0,-1);
            var pLimit = singleRes.p.slice(-1)[0];
            doTheCanvas(xValues, iValues, iLimit, pValues, pLimit, singleRes.name);
            document.querySelector('#limit-select').value = "";
            return;
        }
        initCanvas();
        return;
    }

    
    
    for(var e of plusSelectSection.options) {
        plusArray.push(getData(date, e.value))
    }
    for(var e of minusSelectSection.options) {
        minusArray.push(getData(date, e.value))
    }
    // ké tí lấy cái limit nha
    if(limitSelectSection !== "")
        plusArray.push(getData(date, limitSelectSection))

    var resPlusArray = await Promise.all(plusArray);
    var resMinusArray = await Promise.all(minusArray);

    // lấy xong nằm ở đít rồi pop ra lại
    var resLimit;
    if(limitSelectSection !== "")
        resLimit = resPlusArray.pop();

    resPlusArray = sumArray(resPlusArray, sumOption=2, checkPSign=true);
    resMinusArray = sumArray(resMinusArray, sumOption=1, checkPSign=true);


    console.log(resPlusArray, resMinusArray);

    var resObject = [{
        i: resPlusArray.i.concat(resPlusArray.i),
        p: resPlusArray.p.concat(resPlusArray.p),
    }]

    resObject = sumArray(resObject, 2);
    resI = resObject.i.map(num => Math.abs(num));
    console.log(resI);
    resP = resObject.p;

    console.log(resI, resP);


    
    var iValues = resI;
    var iLimit = resLimit ? Array(48).fill(resLimit.i.slice(-1)[0]) : Array(48).fill(0);
    var pValues = resP;
    var pLimit = resLimit ? resLimit.p.slice(-1)[0] : 0;
    doTheCanvas(xValues, iValues, iLimit, pValues, pLimit, resLimit ? resLimit.name : ' Data Chart')
}

function doTheCanvas(xValues, iValues, iLimit, pValues, pLimit, element) {
    var canvasIChart = document.getElementById('canvas-i-chart');
    var canvasPChart = document.getElementById('canvas-p-chart');
    canvasIChart.innerHTML = `<canvas id="iChart" style="width:100%;max-width:800px; max-height: 500px;"></canvas>`;
    canvasPChart.innerHTML = `<canvas id="pChart" style="width:100%;max-width:800px; max-height: 500px;"></canvas>`;
    
    var pLimitPos = Array(48).fill(pLimit);
    var pLimitNeg = Array(48).fill(-pLimit);
    
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
                    min: 0, max: Math.round(Math.max(iLimit[0], ...iValues) * 1.1)
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
                data: pLimitPos
            },
            {
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: 'red',
                data: pLimitNeg
            },
            {
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: 'black',
                data: Array(48).fill(0),
                borderWidth: 1
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
                    min: Math.round(Math.min(-pLimit, ...pValues) * 1.1),
                    max: Math.round(Math.max(pLimit, ...pValues) * 1.1)
                }
            }
        }
    });
}

async function getElementList() {
    var $select = $('#filterSelect');
    $select.empty();

    var date = document.getElementById('datepicker').value;
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            date: date
        })
    };
    try {
        var response = await fetch(HOST + '/get-element-list', options);
        var response = await response.json();

        if(response.status == 401) {
            window.location.href = HOST;
        }

        var innerSelectSection = ``;

        for(e of response.elementList)
            innerSelectSection += `<option value="${e}">${e}</option>`;
    
        var selectSection = document.querySelector('select');
        selectSection.innerHTML = innerSelectSection;

        // var selectSection = await document.querySelector('#filterSelect');
        // var option;
        // for(e of response.elementList) {
        //     option = document.createElement("option");
        //     option.text = e;
        //     option.value = e;
        //     selectSection.add(option);
        // }

    } catch(e) {
        console.log(e);
    }



    // $("select").trigger("chosen:updated");
}

function initCanvas() {
    var element = "Data Chart";
    const xValues = arrayRange(0,24,0.5);
    var iValues = Array(48).fill(0);
    doTheCanvas(xValues, iValues, iValues, iValues, iValues, element)
}

function addPlus() {
    var elementSelected = document.querySelector('#filterSelect');
    if(elementSelected.value === '') return;
    var plusSelectSection = document.querySelector('#plus-select');
    var option = document.createElement("option");
    option.text = elementSelected.value;
    option.value = elementSelected.value;
    plusSelectSection.add(option);
    elementSelected.remove(elementSelected.selectedIndex);
}

function addMinus() {
    var elementSelected = document.querySelector('#filterSelect');
    if(elementSelected.value === '') return;
    var minusSelectSection = document.querySelector('#minus-select');
    var option = document.createElement("option");
    option.text = elementSelected.value;
    option.value = elementSelected.value;
    minusSelectSection.add(option);
    elementSelected.remove(elementSelected.selectedIndex);
}

function setLimit() {
    var elementSelected = document.querySelector('#plus-select');
    var limitSelectSection = document.querySelector('#limit-select');
    limitSelectSection.value = elementSelected.value;
}

function removePlusElement() {
    var plusElementSelected = document.querySelector('#plus-select');
    if(plusElementSelected.value == "") return;
    var selectSection = document.querySelector('#filterSelect');
    var option = document.createElement("option");
    option.text = plusElementSelected.value;
    option.value = plusElementSelected.value;
    selectSection.add(option);
    plusElementSelected.remove(plusElementSelected.selectedIndex);
}

function removeMinusElement() {
    var minusElementSelected = document.querySelector('#minus-select');
    if(minusElementSelected.value == "") return;
    var selectSection = document.querySelector('#filterSelect');
    var option = document.createElement("option");
    option.text = minusElementSelected.value;
    option.value = minusElementSelected.value;
    selectSection.add(option);
    minusElementSelected.remove(minusElementSelected.selectedIndex);
}


function clearElement() {
    var plusSelectSection = document.querySelector('#plus-select');
    var minusSelectSection = document.querySelector('#minus-select');
    var limitSelectSection = document.querySelector('#limit-select');
    plusSelectSection.options.length = 0;
    minusSelectSection.options.length = 0;
    limitSelectSection.value = "";
}

initCanvas();


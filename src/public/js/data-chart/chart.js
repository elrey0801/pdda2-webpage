const arrayRange = (start, stop, step) =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
);
const xValues = arrayRange(0,24,0.5);
const yValues = [208.9, 203.2,	200.2,	196.6,	192.3,	192.4,	191.7,	192.8,	191.6,	200.4,	207.2,	217.4,	221.9,	210.4,	200.0,	194.7,	183.9,	166.6,	158.2,	139.4,	128.4,	122.9,	130.5,	135.5,	169.3,	177.4,	182.0,	177.3,	191.1,	211.0,	218.9,	241.7,	252.3,	250.4,	245.0,	250.2,	259.4,	258.8,	252.0,	245.3,	237.4,	244.7,	236.0,	229.2,	222.1,	216.2,	207.8,	202.5];
const y1Values = Array(48).fill(510);

new Chart("myChart", {
type: "line",
data: {
    labels: xValues,
    datasets: [{
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: 'blue',
        data: yValues
    },
    {
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: 'red',
        data: y1Values
    },
    ]
},
options: {
    plugins: {
        legend: {display: false},
        title: {
            display: true,
            text: 'Custom Chart Title',
            font: {size: 18}
        }
    },
    pointStyle:false, 
    scales: {
    x: {min: 0, max: 47},
    y: {
        min: 0, max: Math.max(Math.max(...y1Values), ...yValues) * 1.1
    }
    }
}
});
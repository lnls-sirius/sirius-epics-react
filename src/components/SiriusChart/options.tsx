import { Dict } from "../../assets/interfaces"

const scalesOpt: Dict<any> = {
    x: {
        display: true,
        type: 'category',
        ticks: {
            maxRotation: 45,
            minRotation: 45,
            font: {
                size: 15
            }
        }
    },
    y: {
        display: true,
        ticks: {
            font: {
                size: 15
            }
        },
        beginAtZero: true
    }
}

const chartOptions: any = {
    animation: false,
    spanGaps: true,
    responsive: true,
    maintainAspectRatio: false,
    elements: {
        point: {
           radius: 0
        }
    },
    events: [],
    scales: scalesOpt,
    plugins:{
        datalabels: { 
            rotation: 270, 
            color: 'black', 
            font: { weight: "bold"},
            formatter: function (value, context) {
                return value.toExponential(2);
            }},
        legend: {
            display: false
        }
    }
}

export {
    chartOptions
}

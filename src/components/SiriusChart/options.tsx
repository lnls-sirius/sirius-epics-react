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
    animation: {
        duration: 0
    },
    spanGaps: true,
    responsive: true,
    maintainAspectRatio: false,
    elements: {
        point: {
           radius: 0
        }
    },
    hover: {
        mode: "nearest",
        intersect: true
    },
    scales: scalesOpt,
    plugins:{
        legend: {
            display: false
        }
    }
}

export {
    chartOptions
}

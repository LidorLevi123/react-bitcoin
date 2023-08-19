import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { utilService } from '../services/util.service';
import { Sparklines, SparklinesBars } from 'react-sparklines'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'BTC Statistics',
        },
    },
}

export function Chart({ chartsData, type }) {

    const data = {
        labels: [],
        datasets: [
            {
                label: 'Market Price (USD)',
                data: [],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Average Block Size (MB)',
                data: [],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Exchange Trade Volume (USD)',
                data: [],
                borderColor: 'rgb(0, 255, 0)',
                backgroundColor: 'rgba(0, 255, 0, 0.5)',
            },
        ],
    }
    
    data.labels = chartsData.marketPrice.values.map(value => {
        return utilService.getMonthName(new Date(value.x * 1000))
    })
    data.labels.slice(0, 150).forEach((label, idx) => {
        data.datasets[0].data.push(chartsData.marketPrice.values[idx].y)
        if (!type) {
            data.datasets[1].data.push(chartsData.avgBlockSize.values[idx].y)
            data.datasets[2].data.push(chartsData.tradeVolume.values[idx].y)
        } else {
            data.datasets = data.datasets.slice(0,1)
        }
    })
    return (
        <section className='chart'>
            <Line options={options} data={data} />
        </section>
    )
}

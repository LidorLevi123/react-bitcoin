import React, { useEffect, useState } from 'react'

import { bitcoinService } from '../services/bitcoin.service'
import { Chart } from '../cmps/Chart'

export function StatisticPage() {

    const [chartsData, setChartsData] = useState(null)

    useEffect(() => {
        loadChartsData()
    }, [])

    async function loadChartsData() {
        const data = await bitcoinService.getChartsData()
        setChartsData(data)
    }

    if(!chartsData) return

    return (
        <section className="statistic-page">
            <Chart chartsData={chartsData}/>
        </section>
    )
}

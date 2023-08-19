import { utilService } from './util.service'
import axios from 'axios'

export const bitcoinService = {
   getRate,
   getChartsData
}

async function getRate(coins) {
   try {
      const res = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
      return res.data
   } catch (err) {
      console.log('Could not get BTC', err)
   }
}

async function getChartsData() {

   let chartsData = utilService.loadFromStorage('charts') || null
   if (chartsData) return chartsData

   const res1 = await axios.get('https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true')
   const res2 = await axios.get('https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true')
   const res3 = await axios.get('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')

   chartsData = { 
      tradeVolume: res1.data, 
      avgBlockSize: res2.data, 
      marketPrice: res3.data 
   }

   utilService.saveToStorage('charts', chartsData)
   return chartsData
}

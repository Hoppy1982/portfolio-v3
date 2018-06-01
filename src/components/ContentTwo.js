import React, { Component } from 'react'
import styles from './contentTwo.css'


class ContentTwo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      baseUrl: 'http://api.worldbank.org/v2',
      countries: [
        'GBR',
        'DEU'
      ],
      yearFrom: 1960,
      yearTo: 2016,
      showPercents: true,
      showAbsolute: true,
      amalgamatedData: []
    }
  }


 /*Jakes advice
   const promises = countries.map(this.fetchPopulation);

   Promise
     .all(promises)
     .then(([country1data, country2data]) => {

     });
 */

 /*Modified from above
   const populationPromise = this.fetchPopulation(country)
   const energyConsumptionPromise = this.fetchConsumption(country)
   const percentCleanPromise = this.fetchClean(country)
   const percentDirtyPromise = this.fetchDirty(country)
   const promises = populationPromise.concat(energyConsumptionPromise, percentCleanPromise, percentDirtyPromise)

   Promise
     .all(promises)
     .then(([popData, consumptionData, cleanData, dirtyData]) => {
       amalgamateDatas(popData, consumptionData, cleanData, dirtyData)
   })
 */

 // population SP.POP.TOTL
 // energy consumption (kwh per capita) EG.USE.ELEC.KH.PC
 // energy production from renewable sources, excluding hydro (% of total) sEG.ELC.RNWX.ZS
 // energy production from oil, gas & coal (% of total) EG.ELC.FOSL.ZS


  fetchData() {
    //for each country in list
    //  fetch population
    //  fetch consumption_per_capita
    //  fetch percentClean
    //  fetch percentDirty
    //when above all resolved
    // amalgamateDatas

    for(let i = 0; i < this.state.countries.length; i++) {
      const country = this.state.countries[i]
      console.log(`Fetching data for: ${country}..`)

      const populationPromise = this.fetchPopulation(country)
      const consumptionPromise = this.fetchConsumption(country)
      const promises = [populationPromise, consumptionPromise]

      Promise
        .all(promises)
        .then(([popData, consumptionData]) => {
          this.amalgamateDatas(popData, consumptionData)
        })
    }
  }


  fetchPopulation(country) {
    //full url for dev http://api.worldbank.org/v2/countries/gbr/indicators/SP.POP.TOTL
    const series = 'SP.POP.TOTL'
    const baseUrl = this.state.baseUrl
    const url = `${baseUrl}/countries/${country}/indicators/${series}?format=json`

    return fetch(url)
    .then(res => {
      if(res.ok) {return res}
      throw 'Network response not ok'
    })
    .then(res => res.json())
    .then(json => json[1])
    .then(allData => {
      return allData.map(el => {
        return {year: el.date, population: el.value}
      })
    })
    .catch(err => console.log(err))
    .then(population => population)
  }


  fetchConsumption(country) {
    //full url for dev http://api.worldbank.org/v2/countries/gbr/indicators/EG.USE.ELEC.KH.PC
    const series = 'EG.USE.ELEC.KH.PC'
    const baseUrl = this.state.baseUrl
    const url = `${baseUrl}/countries/${country}/indicators/${series}?format=json`

    return fetch(url)
    .then(res => {
      if(res.ok) {return res}
      throw 'Network response not ok'
    })
    .then(res => res.json())
    .then(json => json[1])
    .then(allData => {
      return allData.map(el => {
        return {year: el.date, consumptionPerCapita: el.value}
      })
    })
    .catch(err => console.log(err))
    .then(consumption => consumption)
  }


  amalgamateDatas(popData, consumptionData) {
    console.log('Population Data:')
    console.log(popData)
    console.log('Consumption Data:')
    console.log(consumptionData)
  }


  componentDidMount() {
    this.fetchData()
  }


  render() {
    return(
      <p>CONTENT TWO PLACEHOLDER</p>
    )
  }
}


export default ContentTwo

import React, { Component } from 'react'
import './contentTwo.css'


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


  fetchData() {
    for(let i = 0; i < this.state.countries.length; i++) {
      const country = this.state.countries[i]
      console.log(`Fetching data for: ${country}..`)

      const populationPromise = this.fetchPopulation(country)
      const consumptionPromise = this.fetchConsumption(country)
      const percentCleanPromise = this.fetchPercentClean(country)//wind & solar
      const percentDirtyPromise = this.fetchPercentDirty(country)//oil, gas & coal
      const percentNuclearPromise = this.fetchPercentNuclear(country)
      const percentHydroPromise = this.fetchPercentHydro(country)
      const promises = [
        populationPromise,
        consumptionPromise,
        percentCleanPromise,
        percentDirtyPromise,
        percentNuclearPromise,
        percentHydroPromise
      ]

      Promise
        .all(promises)
        .then(([
          popData,
          consumptionData,
          percentCleanData,
          percentDirtyData,
          percentNuclearData,
          percentHydroData
        ]) => {
          this.amalgamateDatas(
            popData,
            consumptionData,
            percentCleanData,
            percentDirtyData,
            percentNuclearData,
            percentHydroData)
        })
    }
  }


  amalgamateDatas(popData, consumptionData, percentCleanData, precentDirtyData, percentNuclearData, percentHydroData) {
    console.log('Population:')
    console.log(popData)
    console.log('Energy Consumption, kwh Per Capita:')
    console.log(consumptionData)
    console.log('Percentage Energy Produced By Renenewables, Excluding Hydro:')
    console.log(percentCleanData)
    console.log('Percentage Energy Produced By Oil, Gas & Coal:')
    console.log(precentDirtyData)
    console.log('Percentage Energy Produced By Nuclear:')
    console.log(percentNuclearData)
    console.log('Percentage Energy Produced By Hydro:')
    console.log(percentHydroData)
  }


  fetchPopulation(country) {
    //full url for dev http://api.worldbank.org/v2/countries/gbr/indicators/SP.POP.TOTL
    const series = 'SP.POP.TOTL'
    const baseUrl = this.state.baseUrl
    const url = `${baseUrl}/countries/${country}/indicators/${series}?format=json`

    return fetch(url)
    .then(res => {
      if(res.ok) {return res}
      throw new Error ('Network response not ok')
    })
    .then(res => res.json())
    .then(json => json[1])
    .then(allData => {
      return allData.map(el => {
        return {country: el.country, year: el.date, population: el.value}
      })
    })
    .catch(err => console.log(err))
    .then(population => population)
  }


  fetchConsumption(country) {//energy consumption (kwh per capita)
    //full url for dev http://api.worldbank.org/v2/countries/gbr/indicators/EG.USE.ELEC.KH.PC
    const series = 'EG.USE.ELEC.KH.PC'
    const baseUrl = this.state.baseUrl
    const url = `${baseUrl}/countries/${country}/indicators/${series}?format=json`

    return fetch(url)
    .then(res => {
      if(res.ok) {return res}
      throw new Error ('Network response not ok')
    })
    .then(res => res.json())
    .then(json => json[1])
    .then(allData => {
      return allData.map(el => {
        return {country: el.country, year: el.date, consumptionPerCapita: el.value}
      })
    })
    .catch(err => console.log(err))
    .then(consumption => consumption)
  }


  fetchPercentClean(country) {//energy production from renewable sources, excluding hydro (% of total)
    //full url for dev http://api.worldbank.org/v2/countries/gbr/indicators/EG.ELC.RNWX.ZS
    const series = 'EG.ELC.RNWX.ZS'
    const baseUrl = this.state.baseUrl
    const url = `${baseUrl}/countries/${country}/indicators/${series}?format=json`

    return fetch(url)
    .then(res => {
      if(res.ok) {return res}
      throw new Error ('Network response not ok')
    })
    .then(res => res.json())
    .then(json => json[1])
    .then(allData => {
      return allData.map(el => {
        return {country: el.country, year: el.date, percentClean: el.value}
      })
    })
    .catch(err => console.log(err))
    .then(percentClean => percentClean)
  }


  fetchPercentDirty(country) {//energy production from oil, gas & coal (% of total)
    //full url for dev http://api.worldbank.org/v2/countries/gbr/indicators/EG.ELC.FOSL.ZS
    const series = 'EG.ELC.FOSL.ZS'
    const baseUrl = this.state.baseUrl
    const url = `${baseUrl}/countries/${country}/indicators/${series}?format=json`

    return fetch(url)
    .then(res => {
      if(res.ok) {return res}
      throw new Error ('Network response not ok')
    })
    .then(res => res.json())
    .then(json => json[1])
    .then(allData => {
      return allData.map(el => {
        return {country: el.country, year: el.date, percentDirty: el.value}
      })
    })
    .catch(err => console.log(err))
    .then(percentDirty => percentDirty)
  }


  fetchPercentNuclear(country) {//energy production nuclear (% of total)
    //full url for dev http://api.worldbank.org/v2/countries/gbr/indicators/EG.ELC.NUCL.ZS
    const series = 'EG.ELC.NUCL.ZS'
    const baseUrl = this.state.baseUrl
    const url = `${baseUrl}/countries/${country}/indicators/${series}?format=json`

    return fetch(url)
    .then(res => {
      if(res.ok) {return res}
      throw new Error ('Network response not ok')
    })
    .then(res => res.json())
    .then(json => json[1])
    .then(allData => {
      return allData.map(el => {
        return {country: el.country, year: el.date, percentNuclear: el.value}
      })
    })
    .catch(err => console.log(err))
    .then(percentNuclear => percentNuclear)
  }


  fetchPercentHydro(country) {//energy production hydro (% of total)
    //full url for dev http://api.worldbank.org/v2/countries/gbr/indicators/EG.ELC.HYRO.ZS
    const series = 'EG.ELC.HYRO.ZS'
    const baseUrl = this.state.baseUrl
    const url = `${baseUrl}/countries/${country}/indicators/${series}?format=json`

    return fetch(url)
    .then(res => {
      if(res.ok) {return res}
      throw new Error ('Network response not ok')
    })
    .then(res => res.json())
    .then(json => json[1])
    .then(allData => {
      return allData.map(el => {
        return {country: el.country, year: el.date, percentHydro: el.value}
      })
    })
    .catch(err => console.log(err))
    .then(percentHydro => percentHydro)
  }


//------------------------------------------------------------LIFE CYCLE METHODS
  componentDidMount() {
    this.fetchData()
  }


//----------------------------------------------------------------
  render() {
    return(
      <p>CONTENT TWO PLACEHOLDER</p>
    )
  }
}


export default ContentTwo

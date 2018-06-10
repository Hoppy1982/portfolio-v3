import React, { Component } from 'react'
import ProjectTwoCharts from './ProjectTwoCharts'
import './projectTwo.css'


class ProjectTwo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      baseUrl: 'http://api.worldbank.org/v2',
      showPercents: true, //should show absolute values when false
      allCountriesData: []
    }

    this.countries = [
      'GBR',
      'AUS'
    ]

    this.handleCountryOneChange = this.handleCountryOneChange.bind(this)
  }

//----------------------------------------------------------------CUSTOM METHODS
  fetchData() {
    this.setState({allCountriesData: []})

    const promises = this.countries.map((country) => {
      return this.fetchCountryData(country)
    })

    Promise
      .all(promises)
      .then((allCountriesData) => {
        for(let i = 0; i < allCountriesData.length; i++) {
          this.setState(prevState => {
            return {allCountriesData: [...prevState.allCountriesData, allCountriesData[i]]}
          })
        }
      })
      //.then(() => console.log(this.state.allCountriesData))// dev whilst get EnergyProductionGraphs component working reet
  }


  fetchCountryData(country) {
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

    return new Promise((resolve, reject) => {
      Promise
      .all(promises)
      .then(([popData, consumptionData, percentCleanData, percentDirtyData, percentNuclearData, percentHydroData]) => {
        return this.amalgamateData(popData, consumptionData, percentCleanData, percentDirtyData, percentNuclearData, percentHydroData)
      })
      .then((countryData) => {resolve(countryData)})
      .catch((err) => reject(err))
    })
  }


  amalgamateData(popData, consumptionData, percentCleanData, percentDirtyData, percentNuclearData, percentHydroData) {
    const amalgamatedData = popData.map((el, ind) => {
      let countryId = el.country.id
      let countryName = el.country.value
      let year = el.year
      let population = el.population
      let consumption = consumptionData[ind].consumptionPerCapita
      let percentClean = percentCleanData[ind].percentClean
      let percentDirty = percentDirtyData[ind].percentDirty
      let percentNuclear = percentNuclearData[ind].percentNuclear
      let percentHydro = percentHydroData[ind].percentHydro
      let totalPercentEnergy = percentClean + percentDirty + percentNuclear + percentHydro
      let totalEnergyUsed = population * consumption
      let totalClean = percentClean * totalEnergyUsed
      let totalDirty = percentDirty * totalEnergyUsed
      let totalNuclear = percentNuclear * totalEnergyUsed
      let totalHydro = percentHydro * totalEnergyUsed

      return {
        countryId: countryId,
        countryName: countryName,
        year: year,
        population: population,
        consumptionPerCapita: consumption,
        percentClean: percentClean,
        percentDirty: percentDirty,
        percentNuclear: percentNuclear,
        percentHydro: percentHydro,
        totalPercent: totalPercentEnergy,
        totalClean: totalClean,
        totalDirty: totalDirty,
        totalNuclear: totalNuclear,
        totalHydro: totalHydro,
        total: totalEnergyUsed
      }
    })

    return amalgamatedData
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


handleCountryOneChange(event) {
  let val = event.target.value
  this.countries[1] = val
  this.fetchData()
}


//------------------------------------------------------------LIFE CYCLE METHODS
  componentDidMount() {
    this.fetchData()
  }


//----------------------------------------------------------------
  render() {
    return(
      <div className='projectWrapper'>
        <h2>Energy Production Data From World Bank API</h2>

        <div className='ProjectTwoControlsLayoutContainer'>
          <section className='projectTwoControls'>
            <div className='countryOne__dropdown'>
              <div className='countryOne__dropdown__label'>Country #2</div>
              <select className='countryOne__dropdown__control' onChange={this.handleCountryOneChange}>
                <option value='AUS'>Australia</option>
                <option value='CHN'>China</option>
                <option value='DNK'>Denmark</option>
                <option value='DEU'>Germany</option>
                <option value='ISL'>Iceland</option>
                <option value='NLD'>Netherlands</option>
                <option value='NOR'>Norway</option>
                <option value='GBR'>UK</option>
                <option value='USA'>USA</option>
              </select>
            </div>
          </section>
        </div>

        <ProjectTwoCharts energyData={this.state.allCountriesData} showPercents={this.state.showPercents}/>

        <div className='stuffUsed'>
          <h4 className='stuffUsed__heading'>Stuff Used</h4>
          <ul className='stuffUsed__list'>
            <li>Html</li>
            <li>Css</li>
            <li>Javascript (lots of fetch & promises!)</li>
            <li>React</li>
          </ul>
        </div>
      </div>
    )
  }
}


export default ProjectTwo

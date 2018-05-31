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
      populations: []
    }
  }


 /*
SELECTIONS PROVIED
- countries
- year from
- year to
- absolute or percent

 DATA REQUIRED
- energy consumption per capita
- population

- percent energy from wind
- percent energy from solar
- percent energy from hydro
- percent energy from coal
- percent energy from gas
- percent energy from nuclear

- total energy from wind
- total energy from solar
- total energy from hydro
- total energy from coal
- total energy from gas
- total energy from nuclear

DATA STRUCTURE
[
  {
    country: "",
    powerSources: [
      {
        year: "",
        population: null,
        percent_wind: null,
        percent_solar: null,
        percent_hydro: null,
        percent_coal: null,
        percent_gas: null,
        percent_nuclear: null,
        absolute_wind: null,
        absolute_solar: null,
        absolute_hydro: null,
        absolute_coal: null,
        absolute_gas: null,
        absolute_nuclear: null,
        consumption_per_capita: null,
        consumption_total: null
      }
    ]
  }
]
 */

  fetchData() {
    //for each country in list
    //  [] = fetch population
    //  [] = fetch consumption_per_capita
    //  [] = fetch percent(wind...nuclear)
    //when above all done
    // insert from individual arrs to final data structure arr
    // calculate absolutes

    let populations = []

    for(let i = 0; i < this.state.countries.length; i++) {
      let country = this.state.countries[i]
      console.log(`Fetching data for: ${country}..`)
      populations[i] = this.fetchPopulation(country)
    }

    Promise.all(populations).then((values) => {
      console.log(values[0][10])
    })
  }

/*Jakes advice
  const promises = countries.map(this.fetchPopulation);

  Promise
    .all(promises)
    .then(([country1data, country2data]) => {

    });
*/

/*Modified from above
  const populationsPromises = this.state.countries.map(this.fetchPopulation)
*/

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


//http://api.worldbank.org/v2/countries/gbr/indicators/AG.LND.AGRI.ZS?per_page=100
//http://api.worldbank.org/v2/countries/gbr/indicators/EG.USE.ELEC.KH.PC?per_page=100
//http://api.worldbank.org/v2/countries/gbr/indicators/EG.ELC.COAL.ZS?per_page=100

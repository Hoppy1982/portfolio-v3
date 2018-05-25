import React, { Component } from 'react'
import styles from './contentTwo.css'


class dataObject {
  constructor(year, coalPercent, gasPercent, nuclearPercent, windPercent, solarPercent) {
    this.year = year
    this.coalPercent = coalPercent
    this.gasPercent = gasPercent
    this.nuclearPercent = nuclearPercent
    this.windPercent = windPercent
    this.solarPercent = solarPercent
    this.missingDataPercent = null
  }
}


class ContentTwo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedCountry: 'gbr',
      data: []
    }
  }


  fetchData() {
    let powerConsumptionPerCapitaUrl = 'http://api.worldbank.org/v2/countries/gbr/indicators/EG.USE.ELEC.KH.PC?format=json'
    fetch(powerConsumptionPerCapitaUrl)
      .then(res => res.json())
      .then(res => res[1])
      .then(res => console.log(res))
  }


  componentDidMount() {
    this.fetchData()
  }


  render() {
    return(
      <p>CONTENT TWO IS HERE</p>
    )
  }
}


export default ContentTwo


//http://api.worldbank.org/v2/countries/gbr/indicators/AG.LND.AGRI.ZS?per_page=100
//http://api.worldbank.org/v2/countries/gbr/indicators/EG.USE.ELEC.KH.PC?per_page=100
//http://api.worldbank.org/v2/countries/gbr/indicators/EG.ELC.COAL.ZS?per_page=100

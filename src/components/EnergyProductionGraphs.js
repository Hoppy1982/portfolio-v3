import React, { Component } from 'react'
import './energyProductionGraphs.css'


class EnergyProductionGraphs extends Component {

  render() {
   const energyData = this.props.energyData

    return(
      <div>
        {energyData.map((countryData) => {
          const countryId = countryData[0].countryId
          const countryName = countryData[0].countryName
          console.log(`${countryId} ${countryName}`)

          return (
            <div key={countryId} className='countryContainer'>
              <h5>{countryName}</h5>
              <div className='countryChart'>
                {countryData.map((yearlyData) => {
                  const {
                    year,
                    population,
                    consumptionPerCapita,
                    percentClean,
                    percentDirty,
                    percentHydro,
                    percentNuclear,
                    totalPercent,
                    total,
                    totalClean,
                    totalDirty,
                    totalHydro,
                    totalNuclear
                  } = yearlyData

                  const cleanStyle = {
                    height: `${percentClean}%`
                  }

                  const dirtyStyle = {
                    height: `${percentDirty}%`
                  }

                  return (
                    <div key={year} className='yearlyData'>
                      <p>{year}</p>
                      <div className='yearlyBar'>
                        <div className='yearlyBar--clean' style={cleanStyle}></div>
                        <div className='yearlyBar--dirty' style={dirtyStyle}></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}


export default EnergyProductionGraphs

import React, { Component } from 'react'
import './projectTwoCharts.css'


class ProjectTwoCharts extends Component {

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
                  let {
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

                  if (percentClean < 0.5) {percentClean = 0}
                  if (percentDirty < 0.5) {percentDirty = 0}
                  if (percentNuclear < 0.5) {percentNuclear = 0}
                  if (percentHydro < 0.5) {percentHydro = 0}

                  const dirtyStyle = {height: `${percentDirty}%`}
                  const nuclearStyle = {height: `${percentNuclear}%`}
                  const cleanStyle = {height: `${percentClean}%`}
                  const hydroStyle = {height: `${percentHydro}%`}


                  return (
                    <div key={year} className='yearlyData'>
                      <p>{year}</p>
                      <div className='yearlyBar'>
                        <div className={`yearlyBar--clean clean${percentClean}`} style={cleanStyle}></div>
                        <div className={`yearlyBar--hydro hydro${percentHydro}`} style={hydroStyle}></div>
                        <div className={`yearlyBar--nuclear nuclear${percentNuclear}`} style={nuclearStyle}></div>
                        <div className={`yearlyBar--dirty dirty${percentDirty}`} style={dirtyStyle}></div>
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


export default ProjectTwoCharts

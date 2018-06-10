import React, { Component } from 'react'
import './projectTwoCharts.css'


class ProjectTwoCharts extends Component {
  render() {
    const energyData = this.props.energyData
    const showPercents = this.props.showPercents

    if(showPercents === true) {
      return <PercentsChart energyData={energyData} />
    } else if (showPercents === false) {
      return <AbsolutesChart energyData={energyData} />
    }
  }
}


function PercentsChart(props) {
  const energyData = props.energyData

  return(
    <div>
      {energyData.map((countryData, i) => {
        const countryId = countryData[0].countryId
        const countryName = countryData[0].countryName

        return (
          <div key={countryId + i} className='countryContainer countryContainer--percent'>{/*key name using index is a smell.*/}
            <h5>{countryName}</h5>
            <div className='countryChart'>
              {countryData.map((yearlyData) => {
                let {
                  year,
                  percentClean,
                  percentDirty,
                  percentHydro,
                  percentNuclear,
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
                  <div key={year} className='yearlyData yearlyData--percent'>
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


function AbsolutesChart(props) {
  const energyData = props.energyData

  return(
    <div>
      {energyData.map((countryData, i) => {
        const countryId = countryData[0].countryId
        const countryName = countryData[0].countryName

        return (
          <div key={countryId + i} className='countryContainer countryContainer--total'>{/*key name using index is a smell.*/}
            <h5>{countryName}</h5>
            <div className='countryChart'>
              {countryData.map((yearlyData) => {
                let {
                  year,
                  totalClean,
                  totalDirty,
                  totalHydro,
                  totalNuclear
                } = yearlyData

                if (totalClean < 10000000000) {totalClean = 0}
                if (totalDirty < 10000000000) {totalDirty = 0}
                if (totalNuclear < 10000000000) {totalNuclear = 0}
                if (totalHydro < 10000000000) {totalHydro = 0}

                const dirtyStyle = {height: `${totalDirty * 0.00000000001}px`}
                const nuclearStyle = {height: `${totalNuclear * 0.00000000001}px`}
                const cleanStyle = {height: `${totalClean * 0.00000000001}px`}
                const hydroStyle = {height: `${totalHydro * 0.00000000001}px`}

                return (
                  <div key={year} className='yearlyData'>
                    <p>{year}</p>
                    <div className='yearlyBar'>
                      <div className={`yearlyBar--clean clean${totalClean}`} style={cleanStyle}></div>
                      <div className={`yearlyBar--hydro hydro${totalHydro}`} style={hydroStyle}></div>
                      <div className={`yearlyBar--nuclear nuclear${totalNuclear}`} style={nuclearStyle}></div>
                      <div className={`yearlyBar--dirty dirty${totalDirty}`} style={dirtyStyle}></div>
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


export default ProjectTwoCharts

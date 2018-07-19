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

  return (
    <div>
      {energyData.map((countryData, i) => {
        const countryId = countryData[0].countryId
        const countryName = countryData[0].countryName

        return (
          <div key={countryId + i} className='countryContainer countryContainer--total'>{/*key name using index is a smell.*/}
            <h5>{countryName}</h5>
            <div className='countryChart countryChart-total'>
              {countryData.map((yearlyData) => {
                let {
                  year,
                  totalClean,
                  totalDirty,
                  totalHydro,
                  totalNuclear
                } = yearlyData

                const dirtyStyle = {height: `${totalDirty * 0.00000000001}px`}
                const nuclearStyle = {height: `${totalNuclear * 0.00000000001}px`}
                const cleanStyle = {height: `${totalClean * 0.00000000001}px`}
                const hydroStyle = {height: `${totalHydro * 0.00000000001}px`}

                return (
                  <div key={year} className='yearlyData'>
                    <div className='yearlyBar yearlyBar--total'>
                      <div className={`yearlyBar--clean clean${totalClean}`} style={cleanStyle}></div>
                      <div className={`yearlyBar--hydro hydro${totalHydro}`} style={hydroStyle}></div>
                      <div className={`yearlyBar--nuclear nuclear${totalNuclear}`} style={nuclearStyle}></div>
                      <div className={`yearlyBar--dirty dirty${totalDirty}`} style={dirtyStyle}></div>
                    </div>
                    <p>{year}</p>
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

//working on splitting chart components down like below..
function OneYearBarAbsolute(props) {
  const year = props.year
  const totalClean = props.totalClean
  const totalDirty = props.totalDirty
  const totalNuclear = props.totalNuclear
  const totalHydro = props.totalHydro
  const yScaleFactor = 0.00000000001
  const dirtyPxHeight = {height: `${totalDirty * yScaleFactor}px`}
  const nuclearPxHeight = {height: `${totalNuclear * yScaleFactor}px`}
  const cleanPxHeight = {height: `${totalClean * yScaleFactor}px`}
  const hydroPxHeight = {height: `${totalHydro * yScaleFactor}px`}

  return(
    <div className='oneYear--totals'>
      <p className='oneYear--totals__year'>{year}</p>
      <div className='oneYear--totals__bar'>
        <div className='oneYear--totals__bar__section--clean' style={cleanPxHeight}></div>
        <div className='oneYear--totals__bar__section--hydro' style={hydroPxHeight}></div>
        <div className='oneYear--totals__bar__section--nuuclear' style={nuclearPxHeight}></div>
        <div className='oneYear--totals__bar__section--dirty' style={dirtyPxHeight}></div>
      </div>
    </div>
  )
}


export default ProjectTwoCharts

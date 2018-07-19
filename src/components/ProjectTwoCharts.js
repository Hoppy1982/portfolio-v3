import React, { Component } from 'react'
import './projectTwoCharts.css'


class ProjectTwoCharts extends Component {
  render() {
    const energyData = this.props.energyData
    const showPercents = this.props.showPercents

    if(showPercents === true) {
      return <PercentsChart energyData={energyData} />
    } else if (showPercents === false) {
      return <RenderAllAbsolutesBarCharts energyData={energyData} />
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


function RenderAllAbsolutesBarCharts(props) {
  const energyData = props.energyData

  return (
    <div>
      {energyData.map((countryData, i) => {
        const countryId = countryData[0].countryId
        const countryName = countryData[0].countryName

        return <RenderAbsolutesBarChart
          key={countryId + i}//key name using index is a smell.
          countryName={countryName}
          countryData={countryData}
        />
      })}
    </div>
  )
}


function RenderAbsolutesBarChart(props) {
  const countryName = props.countryName
  const countryData = props.countryData

  return (
    <div className='countryContainer countryContainer--total'>
      <h5>{countryName}</h5>
      <div className='countryChart countryChart-total'>

        {countryData.map((yearlyData, i) => {
          return <RenderAbsolutesBar
            key={yearlyData.year + i}//key name using index is a smell.
            year={yearlyData.year}
            totalClean={yearlyData.totalClean}
            totalDirty={yearlyData.totalDirty}
            totalHydro={yearlyData.totalHydro}
            totalNuclear={yearlyData.totalNuclear}
          />
        })}

      </div>
    </div>
  )
}


function RenderAbsolutesBar(props) {
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

  return (
    <div className='yearlyData'>
      <div className='yearlyBar yearlyBar--total'>
        <div className={`yearlyBar--clean clean${totalClean}`} style={cleanPxHeight}></div>
        <div className={`yearlyBar--hydro hydro${totalHydro}`} style={hydroPxHeight}></div>
        <div className={`yearlyBar--nuclear nuclear${totalNuclear}`} style={nuclearPxHeight}></div>
        <div className={`yearlyBar--dirty dirty${totalDirty}`} style={dirtyPxHeight}></div>
      </div>
      <p>{year}</p>
    </div>
  )
}


export default ProjectTwoCharts

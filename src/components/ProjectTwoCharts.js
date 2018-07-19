import React, { Component } from 'react'
import './projectTwoCharts.css'


class ProjectTwoCharts extends Component {
  render() {
    const energyData = this.props.energyData
    const showPercents = this.props.showPercents

    return (
      <div>
        {energyData.map((countryData, i) => {
          const countryId = countryData[0].countryId
          const countryName = countryData[0].countryName

          if(showPercents === true) {
            return <RenderPercentsBarChart
              key={countryId + i}//key name using index is a smell.
              countryName={countryName}
              countryData={countryData}
            />

          } else if (showPercents === false) {
            return <RenderAbsolutesBarChart
              key={countryId + i}//key name using index is a smell.
              countryName={countryName}
              countryData={countryData}
            />
          }

        })}
      </div>
    )
  }
}


function RenderPercentsBarChart(props) {
  const countryName = props.countryName
  const countryData = props.countryData

  return (
    <div className='countryContainer countryContainer--percent'>
      <h5>{countryName}</h5>
      <div className='countryChart'>

        {countryData.map((yearlyData, i) => {
          return <RenderPercentsBar
            key={yearlyData.year + i}//key name using index is a smell.
            year={yearlyData.year}
            percentClean={yearlyData.percentClean}
            percentDirty={yearlyData.percentDirty}
            percentHydro={yearlyData.percentHydro}
            percentNuclear={yearlyData.percentNuclear}
          />
        })}

      </div>
    </div>
  )
}


function RenderPercentsBar(props) {
  const year = props.year
  const percentClean = props.percentClean
  const percentDirty = props.percentDirty
  const percentNuclear = props.percentNuclear
  const percentHydro = props.percentHydro
  const dirtyStyle = {height: `${percentDirty}%`}
  const nuclearStyle = {height: `${percentNuclear}%`}
  const cleanStyle = {height: `${percentClean}%`}
  const hydroStyle = {height: `${percentHydro}%`}

  return (
    <div className='yearlyData yearlyData--percent'>
      <p>{year}</p>
      <div className='yearlyBar'>
        <div className={`yearlyBar--clean clean${percentClean}`} style={cleanStyle}></div>
        <div className={`yearlyBar--hydro hydro${percentHydro}`} style={hydroStyle}></div>
        <div className={`yearlyBar--nuclear nuclear${percentNuclear}`} style={nuclearStyle}></div>
        <div className={`yearlyBar--dirty dirty${percentDirty}`} style={dirtyStyle}></div>
      </div>
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

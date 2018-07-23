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
    <div className='chart chart--percents'>
      <h5>{countryName}</h5>
      <div className='chart__graphic'>

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
    <div className='chart__column chart__column--percents'>
      <p className='chart__columns-label'>{year}</p>
      <div className='chart__column-graphic'>
        <div className={`chart__energy-graphic--clean clean${percentClean}`} style={cleanStyle}></div>
        <div className={`chart__energy-graphic--hydro hydro${percentHydro}`} style={hydroStyle}></div>
        <div className={`chart__energy-graphic--nuclear nuclear${percentNuclear}`} style={nuclearStyle}></div>
        <div className={`chart__energy-graphic--dirty dirty${percentDirty}`} style={dirtyStyle}></div>
      </div>
    </div>
  )
}



function RenderAbsolutesBarChart(props) {
  const countryName = props.countryName
  const countryData = props.countryData

  return (
    <div className='chart'>
      <h5>{countryName}</h5>
      <div className='chart__graphic chart__graphic--absolutes'>

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
    <div className='chart__column'>
      <div className='chart__column-graphic'>
        <div className={`chart__energy-graphic--clean clean${totalClean}`} style={cleanPxHeight}></div>
        <div className={`chart__energy-graphic--hydro hydro${totalHydro}`} style={hydroPxHeight}></div>
        <div className={`chart__energy-graphic--nuclear nuclear${totalNuclear}`} style={nuclearPxHeight}></div>
        <div className={`chart__energy-graphic--dirty dirty${totalDirty}`} style={dirtyPxHeight}></div>
      </div>
      <p className='chart__columns-label'>{year}</p>
    </div>
  )
}


export default ProjectTwoCharts

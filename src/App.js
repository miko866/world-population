import React from 'react'
import './App.css'
import { max, scaleBand, scaleLinear, format } from 'd3'

import { useData } from './useData'
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import { Marks } from './Marks'

const width = 1500
const height = 500
const margin = { top: 30, right: 30, bottom: 70, left: 300 }
const xAxisLabelOffset = 60
const innerHeight = height - margin.top - margin.bottom
const innerWidth = width - margin.left - margin.right

const yValue = (d) => d.Country
const xValue = (d) => d.Population

const siFormat = format('.2s')
const xAxisTickFormat = (n) => siFormat(n).replace('G', 'B')

function App() {
  const data = useData()
  if (!data) {
    return <pre className='App'>loading ...</pre>
  }

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.15)

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth])

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
        />
        <AxisLeft yScale={yScale} />
        <text
          className='axis-label'
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor='middle'
        >
          Population
        </text>
        <Marks
          data={data}
          yScale={yScale}
          xScale={xScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
        />
      </g>
    </svg>
  )
}

export default App

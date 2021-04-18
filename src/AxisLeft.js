export const AxisLeft = ({ yScale }) =>
  yScale.domain().map((tickValue) => (
    <g className='tick'>
      <text
        key={tickValue}
        style={{ textAnchor: 'end' }}
        y={yScale(tickValue) + yScale.bandwidth() / 2}
        dy='.32em'
        x={-3}
      >
        {tickValue}
      </text>
    </g>
  ))

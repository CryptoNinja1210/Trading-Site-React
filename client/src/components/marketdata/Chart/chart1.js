import React, { useEffect } from 'react'
import Highcharts from 'highcharts/highstock'

const ChartExample = () => {

  useEffect(() => {
    // create the chart
    const chart = Highcharts.stockChart('chart-container', {
      series: [
        {
          data: [[1609478400000, 19.21], [1609564800000, 18.98], [1609651200000, 18.05], [1609910400000, 18.66], [1609996800000, 18.36]]
        }
      ]
    })

    return () => {
      // clean up code
      chart.destroy()
    }
  }, [])

  return (
    <div id="chart-container"></div>
  )
}

export default ChartExample
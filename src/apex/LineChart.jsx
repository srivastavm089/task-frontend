import React from 'react';
import ReactApexChart from 'react-apexcharts';


const MyChart = ({count}) => {
  console.log(count)
  const time = new Date();
  const year = time.getFullYear()
    var options = {
        series: [
        {
          name: 'Users',
          data: [
            {
              x: year,
              y:count  //number of users,
              // goals: [
              //   {
              //     name: 'Expected',
              //     value: 1400,
              //     strokeHeight: 5,
              //     strokeColor: '#775DD0'
              //   }
              // ]
            },
            // {
            //   x: '2012',
            //   y: 4432,
            //   goals: [
            //     {
            //       name: 'Expected',
            //       value: 5400,
            //       strokeHeight: 5,
            //       strokeColor: '#775DD0'
            //     }
            //   ]
            // },
            // {
            //   x: '2024',
            //   y: 5423,
            //   goals: [
            //     {
            //       name: 'Expected',
            //       value: 5200,
            //       strokeHeight: 5,
            //       strokeColor: '#775DD0'
            //     }
            //   ]
            // },
            // {
            //   x: '2014',
            //   y: 6653,
            //   goals: [
            //     {
            //       name: 'Expected',
            //       value: 6500,
            //       strokeHeight: 5,
            //       strokeColor: '#775DD0'
            //     }
            //   ]
            // },
            // {
            //   x: '2015',
            //   y: 8133,
            //   goals: [
            //     {
            //       name: 'Expected',
            //       value: 6600,
            //       strokeHeight: 13,
            //       strokeWidth: 0,
            //       strokeLineCap: 'round',
            //       strokeColor: '#775DD0'
            //     }
            //   ]
            // },
            // {
            //   x: '2016',
            //   y: 7132,
            //   goals: [
            //     {
            //       name: 'Expected',
            //       value: 7500,
            //       strokeHeight: 5,
            //       strokeColor: '#775DD0'
            //     }
            //   ]
            // },
            // {
            //   x: '2017',
            //   y: 7332,
            //   goals: [
            //     {
            //       name: 'Expected',
            //       value: 8700,
            //       strokeHeight: 5,
            //       strokeColor: '#775DD0'
            //     }
            //   ]
            // },
            // {
            //   x: '2018',
            //   y: 6553,
            //   goals: [
            //     {
            //       name: 'Expected',
            //       value: 7300,
            //       strokeHeight: 2,
            //       strokeDashArray: 2,
            //       strokeColor: '#775DD0'
            //     }
            //   ]
            // }
          ]
        }
      ],
        chart: {
        height: 350,
        type: 'bar'
      },
      plotOptions: {
        bar: {
          columnWidth: '60%'
        }
      },
      colors: ['#00E396'],
      dataLabels: {
        enabled: false
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        customLegendItems: ['Actual', 'Expected'],
        markers: {
          fillColors: ['#00E396', '#775DD0']
        }
      }
      };
  
    return (
      <div>
        <ReactApexChart  options={options} series={options.series} type="line" height={450} />
      </div>
    );
  };
  
  export default MyChart;
  
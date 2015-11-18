Chart = {
  addData(chart,title,data){
    if(chart != undefined){
      chart.setTitle({text:title});
      chart.series[0].setData(this.cartesianize(data,'value','date'));
      //chart.series[1].setData(ranges);
    }
  },
  cartesianize(items,y,x){
    let data = []
    items.forEach(function(item){
      data.unshift({y:item[y],x:item[x].getTime()});
    })
    return data;
  },
  build(){
    return new Highcharts.Chart({

      chart: {
        renderTo: 'chart',
        type:'spline',
        animation: Highcharts.svg,
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
      },
      credits:{
        enabled:false
      },
      legend: {
        enabled:false
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabel:{
          second: '%H:%M:%S'
        },
        tickPixelInterval: 150
      },
      yAxis: {
        labels: {
          formatter: function () {
            return this.value;
          }
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      tooltip: {
        crosshairs: true,
        shared: true,
        xDateFormat: '%d/%m/%Y %H:%M:%S',
        pointFormat: '{series.name} <b>{point.y}</b>'
      }/*,
        series: [{
            data: [29.9, 68.15, 106.4, 129.2, 144.0, 176.0, null, 148.5, 216.4, 194.1, 95.6, 54.4],
            pointInterval: 900000,
            pointStart: moment().valueOf()
        }, {
            data: [144.0, 176.0, 135.6, 148.5, 216.4, null, 95.6, 54.4, 29.9, 71.5, 106.4, 129.2],
            pointInterval: 840000,
            pointStart: moment().add(3,'hours').valueOf()
        },
        {
            data: [144.0, 176.0, 162.25, 148.5, 216.4, 156, 95.6, 62.75, 29.9, 68.15, 106.4, 129.2],
            pointInterval: 840000,
            pointStart: moment().add(3,'hours').valueOf()
        }]*/,
        series: [{
          name: 'Data',
          //data: options.averages,
          zIndex: 1,
          marker: {
              fillColor: 'white',
              lineWidth: 2,
              lineColor: Highcharts.getOptions().colors[0]
          }
      }, {
          name: 'Range',
          //data: options.ranges,
          type: 'arearange',
          lineWidth: 0,
          linkedTo: ':previous',
          color: Highcharts.getOptions().colors[0],
          fillOpacity: 0.3,
          zIndex: 0
      }]
    });
  }
};

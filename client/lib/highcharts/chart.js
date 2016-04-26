Chart = {
  addData(chart,title,data){
    if(chart != undefined){
      chart.setTitle({text:title});
      chart.series[0].setData(this.cartesianize(data,'value','date'));
      //chart.series[1].setData(ranges);
    }
  },
  _getSamples(analysis,id,date){
    let data = [];
    let counter = 0;
    Samples.find( {_id:{$regex:new RegExp(analysis._id+'$'),$options:'m'}} ).map(function(samplesPerHour,i){
      samplesPerHour.samples.map(function(sample,i){
        if(counter++ <= this.counter){
          if(moment(date).isSame(moment(samplesPerHour.timeStamp).add(i*this.frequency,'milliseconds'),'day')){
            data = data.concat({y:sample[id],temperature:sample.heater});
          }
        }
      },analysis)
    });
    console.log("analysis: ");
    console.log(analysis);
    console.log("Data:");
    console.log(data);
    return data;
  },
  addSeries(chart,analysis,id,date){
    let {firstDate,frequency,counter} = analysis
    for (var i = 0; i <= counter; i++) {
      if(moment(date).isSame((firstDate + (i * frequency)),'day')){
        firstDate = firstDate + (i * frequency)
        break;
      }
    }
    let self = this;
    if(!chart) throw Error('chart does not exist');
    chart.addSeries({
      data:self._getSamples(analysis,id,date),
      pointStart: firstDate + moment().utcOffset()*60*1000,
      pointInterval:analysis.frequency
    })
    console.log("Series: ");
    console.log(chart.series[0].data);
  },
  setSeries(chart,analysis,id,i,date){
    let self = this;
    if(!chart)
      throw Error('chart does not exist');
    if(i >= 0){
      chart.series[i].setData(self._getSamples(analysis,id,date))
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
        zoomType: 'x'
        //animation:false
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
        tickPixelInterval: 150,
        allowDecimals:false
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
      plotOptions:{
        series:{
          cursor:'pointer',
          events:{
            click: function(event){
              let i = this.index
              let series = this.chart.series;
              for (serie of series) {
                if(serie.index != i){
                  serie.visible ? serie.hide() : serie.show()
                }
              }
              this.chart.redraw();
            return false;
            }
          },
          turboThreshold:2000
        }
      },
      tooltip: {
        crosshairs: true,
        shared: true,
        xDateFormat: '<b>%H:%M:%S</b>',
        pointFormat: '<span style="color:{point.color}">\u25CF</span>Value: <b>{point.y}</b><br/><p>Temperature: {point.temperature}°C</p>',
        //followPointer:true,
        followTouchMove:true,
      },
        series: []/*,
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
      }]*/
    });
  }
};

<!-- 処理変数 -->
var updateTime_ms = 1000

<!-- グラフ変数 -->
var ctx = []
for(var i=0;i<5;i++){
  ctx.push(document.getElementById("chart"+"01").getContext("2d"))
}
var x_label = new Array(120)
var data_label = "HeartRate[BPM]"
var data = new Array(120)
var dataset = {label: data_label, data: data}

x_label[0] = "0"
x_label[59] = "1"
x_label[119] = "2[min]"

<!-- 通信 & グラフ更新 -->
var updateValue = function(){
  $.ajax({
    url: 'json/data.json',
    type: 'get',
    dataType: 'json'
  })
  .done(function(json){
    chart.data.datasets.forEach(
      dataset => {dataset.data.shift()
                  dataset.data.push(json.ID00.Drowsiness)}
  )
  })
  .fail(function(){
    alert("failure")
  })
  chart.update()
	setTimeout("updateValue()",updateTime_ms)
}

<!-- グラフ初期化 -->
window.onload = function(){
    window.chart = new Chart(ctx[1],{
      type: "line",
      data: {
        labels: x_label,
        datasets: [dataset]
      },
      options: {
        scales: {
          yAxes:[{
            ticks: {
              beginAtZero: false,
              min: 0,
              max: 5
            }
          }]
        }
        animation: false
      }
    })
  setTimeout("updateValue()",updateTime_ms)
}

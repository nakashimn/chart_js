<!-- 定数 -->
var UPDATETIME_MILLISEC = 1000
var MAX_ID = 2
var DATA_NUM_LINE  = 2
var DATA_NUM_SCATTER  = 4
var DATA_LENGTH  = 120

<!-- グローバル変数 -->
var text = ""
var ctxsLine = []
var ctxsScatter = []

<!-- データ初期化 -->
var datas = []
for(var i=0;i<MAX_ID;i++){
  var data = []
  for(var i=0;i<DATA_LENGTH;i++){
    data.push(Math.random()+1.5)
  }
  datas.push(data)
}
var arousal = [-0.2,-0.1,0.1,0.2]
var valence = [-0.2,-0.1,0.1,0.2]
var data_label = "HeartRate[BPM]"

<!-- データセット初期化 -->
var datasetLine = []
var datasetScatter = []
for(var i=0;i<DATA_NUM_LINE;i++){
  datasetLine.push({
    label: data_label,
    data: datas[i],
    backgroundColor:'rgba(220, 20, 60, 0)',
    borderColor:'rgba(220, 20, 60, 0.5)',
    radius: 0,
    hoverRadius: 4
  })
}
for(var i=0;i<DATA_NUM_SCATTER;i++){
  datasetScatter.push({
    label: "scatter_data",
    backgroundColor:'rgba(255, 0, 0, '+String(Math.exp(i)/Math.exp(DATA_NUM_SCATTER-1))+')',
    data:[{
      x: arousal[i],
      y: valence[i],
    }]
  })
}

<!-- ラベル作成 -->
var x_label = Array.apply(null, Array(DATA_LENGTH))
x_label[0] = "0"
x_label[59] = "1"
x_label[119] = "2[min]"

<!-- 初期処理 -->
$(function(){
  initCanvas()
  initCtx()
  initButton()
  for(var i=0;i<MAX_ID;i++){
    initChartLine(i)
    initChartScatter(i)
  }
  setTimeout("update()",UPDATETIME_MILLISEC)
})

<!-- 更新 -->
var update = function(){
  updateValue()
  setTimeout("update()",UPDATETIME_MILLISEC)
}

<!-- グラフ描画領域初期化 -->
var initCanvas = function(){
  for(var i=0;i<MAX_ID;i++){
    text +=
      '<div class="block"> \
        <div class="chartLine"> \
          <canvas id="chartLine'
          + ('00'+String(i)).substr(-2)
          + '"></canvas> \
        </div> \
        <div class="chartScatter"> \
          <canvas id="chartScatter'
          + ('00'+String(i)).substr(-2)
          + '"></canvas> \
        </div> \
      </div>'
  }
  $("#chartBlock").html(text)
}

<!-- グラフ変数初期化 -->
var initCtx = function(){
  for(var i=0;i<MAX_ID;i++){
    if(ctxLine=document.getElementById("chartLine"+String("00"+i).substr(-2))){
      ctxsLine.push(ctxLine.getContext("2d"))
    }
    if(ctxScatter=document.getElementById("chartScatter"+String("00"+i).substr(-2))){
      ctxsScatter.push(ctxScatter.getContext("2d"))
    }
  }
}

<!-- ボタン設定 -->
var initButton = function(){
  $('#button').mouseover(function(){
    $(".chart01").toggleClass("alert")
    $(".img").toggleClass("visible")
    $("#innerHTML").html(text)
  })
  $("#button").mouseout(function(){
    $(".chart01").toggleClass("alert")
    $(".img").toggleClass("visible")
    $("#innerHTML").html("")
  })
  $('#button'+String(0)).click(function(){
    $('#block'+('00'+String(0)).substr(-2)).toggleClass('visible',duration=1000)
  })
  $('#button'+String(1)).click(function(){
    $('#block'+('00'+String(1)).substr(-2)).toggleClass('visible',duration=1000)
  })
}

  <!-- チャート初期化(Line) -->
var initChartLine = function(id){
  chartLine = new Chart(ctxsLine[id],{
    type: "line",
    data: {
      labels: x_label,
      datasets: datasetLine
    },
    options: {
      scales: {
        yAxes : [{
          ticks : {
             min : 0,
             max : 5
          }
        }]
      },
      maintainAspectRatio: false,
      responsive: true,
      animation: false
    }
  })
}

<!-- チャート初期化(Scatter) -->
var initChartScatter = function(id){
  chartScatter = new Chart(ctxsScatter[id],{
    type: "scatter",
    data: {
      datasets: datasetScatter
    },
    options: {
      scales: {
        xAxes : [{
          display: false,
          ticks : {
             min : -1,
             max : 1
          }
        }],
        yAxes : [{
          display: false,
          ticks : {
             min : -1,
             max : 1
          }
        }]
      },
      legend:{
        display: false
      },
      maintainAspectRatio: false,
      responsive: true,
      animation: false
    }
  })
}
<!-- 通信 & グラフ更新 -->
var updateValue = function(){
  $.ajax({
    url: 'json/data.json',
    type: 'get',
    dataType: 'json'
  })
  .done(function(json){
    updateArray(datas[0], json.ID00.Drowsiness)
    var dataArrayScatter = chartScatter.data.datasets
    updateScatter(dataArrayScatter,json.ID00.Arousal,json.ID00.Valence)
  })
  .fail(function(){
  })
  chartLine.update()
  chartScatter.update()
}

<!-- 配列更新 -->
var updateArray = function(array, input){
  array.shift()
  array.push(input)
}

<!-- 更新 -->
var updateScatter = function(scatterData, input0, input1){
  for(var i=0;i<scatterData.length-1;i++){
    scatterData[i].data[0].x = scatterData[i+1].data[0].x
    scatterData[i].data[0].y = scatterData[i+1].data[0].y
  }
  scatterData[scatterData.length-1].data[0].x = inputx
  scatterData[scatterData.length-1].data[0].y = inputy
}

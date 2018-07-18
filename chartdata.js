var updateTime_ms = 1000

var ctx = document.getElementById("chart").getContext("2d");
var x_label = new Array(120);
x_label[0] = "0";
x_label[59] = "1";
x_label[119] = "2[min]";
var data_label = "value";
var data = new Array(120);
for(var i=0;i<120;i++){
  data[i] = (Math.random()+Math.random()+Math.random()+Math.random())/4;
}
var dataset = {label: data_label, data: data};
window.onload = function(){
  window.chart = new Chart(ctx,{
    type: "line",
    data: {
      labels: x_label,
      datasets: [dataset]
    },
    options: {
      animation: false
    }
  });
  setTimeout("updateChart()",updateTime_ms);
}

function updateChart(){
  chart.data.datasets.forEach(
    dataset => {dataset.data.shift();
                dataset.data.push((Math.random()+Math.random()+Math.random()+Math.random())/4);}
    );
  chart.update();
	setTimeout("updateChart()",updateTime_ms);
}

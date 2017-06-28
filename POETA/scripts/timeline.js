
function exibirTimeline(d){
const element = document.getElementById('timelineGraf');
var inicioAtv;
var fimAtv;
var filhos = [];
getLeafs(d,filhos);
d3.select(element).style("height", filhos.length*40 + "px");
var atividades = getActivitiesName(d);
var prazos = getActivitiesPrazos(d,filhos);

var data = [];
for(var i = 0; i < filhos.length; i++){
	var entregas=[];
	for(var j = 1; j < d.depth; j++){
		entregas.push({label: atividades[j-1],
						type: TimelineChart.TYPE.INTERVAL,
						from: converteData(filhos[i]["Data Inicio "+j]),
						to: makeDataWithTime(filhos[i]["Data Fim "+j])});
	}
	data.push({label: filhos[i]["Level18"],
				data: entregas});
}

        const timeline = new TimelineChart(element, data, {
            enableLiveTimer: true,
            tip: function(d) {
                return d.at || `${d.from}<br>${d.to}`;
            }
        }).onVizChange(e => console.log(e));
}

function getActivitiesName(d){
	var array = [];
	const depth = d.depth-2;
	for(var i = 0; i <= depth; i++){
		array[depth - i] = d.key;
		d = d.parent;
	}
	return array;
}

function getActivitiesPrazos(d,filhos){
	var prazos=[];
	for(var i = 0; i < filhos.length; i++){
		if(filhos[i]["Data Fim "+d.depth]){
			for(var j=1; j < d.depth; j++){
				prazos.push({inicio: filhos[i]["Data Inicio "+j],
							fim: filhos[i]["Data Fim "+j]});
			}
			break;
		}
	}
	return prazos;
}

function makeDataWithTime(data){
	return new Date(Number(data.slice(6,10)), Number(data.slice(3,5)), Number(data.slice(0,2)),23,59,59,0);
}

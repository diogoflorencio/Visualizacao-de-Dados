//Grafico de linhas
google.charts.load('current', {'packages':['line','timeline']});
function geraGraficoLinhas(node){
      google.charts.setOnLoadCallback(drawChart(node));

    function drawChart(node) {
		var alunos = [];
		getLeafs(node,alunos);
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Atividades');
      for(var i = 0; i < alunos.length; i++){
		data.addColumn('number', alunos[i].Level18);
	}
	
	var matrix = [];
  matrix[0] = [];
	
	var aux = node;
	for(var i = node.depth; i > 1; i--){
		//matrix[i-1][0] = aux.key;
		for(var j = 0; j < alunos.length; j++){
      if(alunos[j]["Nota"+(i-1)] !== -1 && matrix[i-1] == undefined){
        matrix[i-1] = [];
        matrix[i-1][0] = aux.key;
      }
      if(alunos[j]["Nota"+(i-1)] !== -1){
        matrix[i-1][j+1] = alunos[j]["Nota"+(i-1)];
      }
		}
		aux = aux.parent  
	}
	matrix[0][0] = '0';
	for(var i = 0; i < alunos.length; i++){
		matrix[0][i+1] = 0;
	}
  for(var i = matrix.length-1; i >= 0; i--){
    if(matrix[i] == undefined){
      matrix.splice(i,i);
    }
  }

      data.addRows(matrix);

      var options = {
        chart: {
          title: 'Grafico de Visualizacao de Desempenho dos Alunos.',
          subtitle: ''
        },
        width: 1100,
        height: 450,
        axes: {
          x: {
            0: {side: 'down'}
          }
        }
      };

      var chart = new google.charts.Line(document.getElementById('graficoLinhas'));

      chart.draw(data, options);
    }
 }
 
 function geraGraficoTempo(node){
	 google.charts.setOnLoadCallback(drawChart(node));
      function drawChart(node) {
        var container = document.getElementById('graficoTempo');
        var chart = new google.visualization.Timeline(container);
        var dataTable = new google.visualization.DataTable();

        dataTable.addColumn({ type: 'string', id: 'Atividades' });
        dataTable.addColumn({ type: 'string', id: 'Name' });
        dataTable.addColumn({ type: 'date', id: 'Start' });
        dataTable.addColumn({ type: 'date', id: 'End' });
        
        var matrix = [];
		for(var i = 0; i < node.depth - 2; i++){
			matrix[i] = [];
		}
		
		var aux = node.parent;
		for(var i = node.depth - 2; i > 0; i--){
			matrix[i-1] = [i.toString(),aux.key, converteData(node["Data Inicio "+i]), converteData(node["Data Fim "+i])];
			aux = aux.parent;
		}
		
        dataTable.addRows(matrix);
        chart.draw(dataTable);
      }
 }

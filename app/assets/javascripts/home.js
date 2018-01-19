$(document).ready(function(){
	var matrix = assign_cell_array();

	$(document).on('click','td',function(){
		klass = $(this).attr('class');
		id = $(this).attr('id');
		//console.log(id);
		matrix = assign_dead_cells(matrix, id, klass)
	});

	$(document).on('click',"#start",function(){
		check_each_matrix_element(matrix);
	});
});

function assign_cell_array(){
	var matrix = {}
	var elems = document.getElementsByTagName( "td" );
	var array = jQuery.makeArray( elems );

	$(array).each(function(index){
		matrix[$(this).attr('id')]  = $(this).attr('class');
	});
	//console.log(matrix);
	return matrix;
}

function assign_dead_cells(matrix, id, klass){
	$('#'+id).attr("class","dead");

	//console.log(matrix[id.toString()]);
	matrix[id.toString()] = "dead";
	//console.log(matrix[id.toString()]);

	return matrix;
}

function check_each_matrix_element(matrix){
	var index = 0;
	var neighbour = [];
	for (ele in matrix){
		//console.log(ele);
		neighbours = get_cell_neighbour(matrix, ele);
		console.log("neightbour for "+ele+" : "+neighbours);
		start_life_of_cell(ele, neighbours, matrix)
	}
}

function get_cell_neighbour(matrix, index){
	neighbours = []
	i = index.split("-")
	n = parseInt(i[0]);
	m = parseInt(i[1]);

	//console.log("n : "+ n + ", m : "+ m)
	if (n - 1 >= 0)
	{
		if (m + 1 <= 49){
			neighbours.push(matrix[""+(n - 1)+"-"+(m + 1)+""])
		}
		neighbours.push(matrix[""+(n - 1)+"-"+m+""])
	}
	if (m - 1 >= 0)
	{
		neighbours.push(matrix[""+n+"-"+(m - 1)+""])
		if (n + 1 <= 49){
			neighbours.push(matrix[""+(n + 1)+"-"+(m - 1)+""])
		}
	}
	if (n - 1 >= 0 && m - 1 >= 0){
		neighbours.push(matrix[""+(n - 1)+"-"+(m-1)])	
	}
	if (n + 1 <= 49){
		neighbours.push(matrix[""+(n + 1)+"-"+m+""]);
	}
	if (m + 1 <= 49){
		neighbours.push(matrix[""+n+"-"+(m + 1)+""]);
	}
	if (m + 1 <= 49 && n + 1 <= 49){
		neighbours.push(matrix[""+(n + 1)+"-"+(m + 1)+""]);
	}

	return neighbours;
}
function start_life_of_cell(ele, neighbours, matrix){
	liveIndex = neighbours.indexOf("live");
	deadIndex = neighbours.indexOf("dead");
	if(liveIndex < 2){
		matrix[ele] = 'dead'
		$("#"+ele).attr('class','dead');
	}
	if(liveIndex > 3){
		matrix[ele] = 'dead'
		$("#"+ele).attr('class','dead');
	}
	if(liveIndex == 2 || liveIndex == 3){
		// matrix[ele] = 'live'
		// $("#"+ele).attr('class','live');
	}
	if(liveIndex == 3 && matrix[ele] == 'dead'){
		matrix[ele] = 'live'
		$("#"+ele).attr('class','live');
	}
}


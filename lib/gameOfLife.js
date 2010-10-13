
function GameOfLife(rows, cols, div){
	this.current_generation = this.createBoard(rows, cols);
	this.createHtmlBoard(rows, cols, div);
}

GameOfLife.prototype = {

	createBoard: function (rows, cols) {
		var board = new Array(rows);
		for(var i=0; i<rows; i++){
			board[i] = new Array(cols);
		}
		return board;
	},

	setAlive: function(row, col) {
		this.current_generation[row][col] = true;
		this.refreshCell(row,col,true);
	},

	isAlive: function(row,col) {
		if(row < 0 || row >= this.current_generation.length) return false;
		if(col < 0 || col >= this.current_generation.length) return false;
		if(this.current_generation[row][col]==undefined) return false;
		return this.current_generation[row][col];
	},

	wasAlive: function(row,col) {
		if(row < 0 || row >= this.previous_generation.length) return false;
		if(col < 0 || col >= this.previous_generation.length) return false;
		return this.previous_generation[row][col];
	},
	
	setDead: function(row,col){
		this.current_generation[row][col] = false;
		this.refreshCell(row,col,false);
	},
	
	count_neighbors: function(row, col){
		var count = 0;
		for(var i=-1; i<=1; i++){
			for(var j=-1; j<=1; j++){
				if(!(j==0 && i==0) && this.wasAlive(row+i, col+j)){
					count++;
				}
			}
		}
		return count;
	},
	
	apply_rules_for_one_cell: function(row, col){
		var neighbors = this.count_neighbors(row, col)
	
		if (neighbors<2){ // Loneliness Rule
			this.setDead(row,col);
			
		}else if(neighbors>3){ // Overpopulation Rule
			this.setDead(row,col);
			
		}else if (neighbors == 3 && !this.wasAlive(row, col)){ // Ressurection Rule
			this.setAlive(row,col);
			
		}else if (this.wasAlive(row, col)){ // Survivor Rule
			this.setAlive(row,col);
			
		}else{ // Stays the same Rule
			this.setDead(row,col);
			
		}
	},

	next: function() {
		
		this.previous_generation = this.current_generation;
		this.current_generation = this.createBoard(this.previous_generation.length, this.previous_generation[0].length);
		
		// compute the rules for the whole board
		for(var i=0; i<this.current_generation.length; i++){
			for(var j=0; j<this.current_generation[0].length; j++){
				this.apply_rules_for_one_cell(i,j);		
			}
		}
	},
	
	// interface methods
	
	createHtmlBoard: function(rows, cols, div){
		if (div){
			this.div = div;
			var table = $("<table border='1'></table>");
			this.div.append(table);
		
			for(var i = 0; i < rows; i ++){
				var row = $("<tr></tr>");
				for(var j = 0; j < cols; j ++){
					var col = $("<td>&nbsp;</td>");
					row.append(col);
				
				}
				table.append(row);
			}
		
		}
	},
	
	refreshCell: function(row, col, value){
		var content = value ? 'X' : '&nbsp;';
		if (this.div) {
			this.div.find("table").find("tr:nth-child("+(row+1)+")").find("td:nth-child("+(col+1)+")").html(content);
		}
	}
	
}

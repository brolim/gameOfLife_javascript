
function GameOfLife(rows, cols, div){
	this.table = new Array(rows);
	for(var i = 0; i < rows; i++){
		this.table[i] = new Array(cols);
		for (var j = 0 ; j < cols; j++){
			this.setDead(i,j);
		}
	}
	if (div){
		this.div = div;
		var table = $("<table border='1'></table>");
		div.append(table);
		
		for(var i = 0; i < rows; i ++){
			var row = $("<tr></tr>");
			for(var j = 0; j < cols; j ++){
				var col = $("<td>&nbsp;</td>");
				row.append(col);
				
			}
			table.append(row);
		}
		
	}
}

GameOfLife.prototype = {
	setAlive: function(row, col) {
		this.table[row][col] = true;
		if (this.div) {
			this.div.find("table").find("tr:nth-child("+(row+1)+")").find("td:nth-child("+(col+1)+")").text('X');
		}
	},

	isAlive: function(row,col) {
		if(row < 0 || row >= this.table.length) return false;
		if(col < 0 || col >= this.table.length) return false;
		return this.table[row][col];
	},

	wasAlive: function(row,col) {
		if(row < 0 || row >= this.old_table.length) return false;
		if(col < 0 || col >= this.old_table.length) return false;
		return this.old_table[row][col];
	},
	
	setDead: function(row,col){
		this.table[row][col] = false;
		if (this.div) {
			this.div.find("table").find("tr:nth-child("+(row+1)+")").find("td:nth-child("+(col+1)+")").html('&nbsp;');
		}
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
	
		if (neighbors<2){
			this.setDead(row,col);
		}
		else if(neighbors>3){
			this.setDead(row,col);
		}else if (neighbors == 3 && !this.wasAlive(row, col)){
			this.setAlive(row,col);
		}else if (this.wasAlive(row, col)){
			this.setAlive(row,col);
		}else{
			this.setDead(row,col);
		}
	},

	next: function() {
		
		this.old_table = this.table;
		this.table = new Array(this.old_table.length);
		
		for(var i = 0; i < this.old_table.length; i++){
			this.table[i] = new Array(this.old_table[0].length);
		}
		
		for(var i=0; i<this.table.length; i++){
			for(var j=0; j<this.table[0].length; j++){
				this.apply_rules_for_one_cell(i,j);		
			}
		}
	}
}

function Grid() {
    Row.prototype.constructor.call(this);
}

-function() {
    function F() {}
    F.prototype = Row.prototype;
    Grid.prototype = new F();
    Grid.prototype.constructor = Grid;
}();

Grid.prototype.setCell = function(x, y, cell) {
    return (this.get(y) || this.set(y, new Row())).set(x, cell);
};

Grid.prototype.getCell = function(x, y, cell) {
    return this.get(y) ? this.get(y).get(x) : undefined;
};

Grid.prototype.onCell = function(xNum, yNum, cell) {
    return this.on(yNum) ? this.on(yNum).on(xNum) : undefined;
};

Grid.prototype.removeCell = function(x, y) {
    var row;
    if (row = this.get(y)) {
        row.remove(x);
        
        if (!row.count()) { this.remove(y); }
    }
};

Grid.prototype.flatten = function() {
    var result = [];
    
    this.rewind();
    while (this.hasNext()) {
        var y = this.currentIndex;
        var row = this.next().rewind();
        while (row.hasNext()) {
            var x = row.currentIndex;
            var cell = row.next();
            result.push([x, y, cell]);
        }
    }
    
    return result;
};

Grid.prototype.related = function(x, y) {
    var coords = [
        [x-1, y-1], [x, y-1], [x+1, y-1],
        [x-1, y], [x+1, y], [x-1, y+1],
        [x, y+1], [x+1, y+1]
    ];
            
    var related = [];
    var cell;
    
    for (var i = 0; i < 8; i++) {
        var rx = coords[i][0];
        var ry = coords[i][1];
        
        if (cell = this.getCell(rx, ry)) {
            related.push([rx, ry, cell]);
        }
    }
    
    return related;
};
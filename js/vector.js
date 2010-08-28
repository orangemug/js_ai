/**
	@class Two dimensional vector class
	@param {Number} x Horz vector attribute
	@param {Number} y Vert vector attribute
	@author <a href="mailto:orangemugdev@googlemail.com">OrangeMug</a>
http://sylvester.jcoglan.com/
*/
function Vec2D(x,y) {
	this.x = x || 0;
	this.y = y || 0;
}

/**
	Vectors length
*/
Vec2D.prototype.length = function() {
	return (Math.sqrt(this.x*this.x+this.y*this.y));
};

/**
	Vectors length
*/
Vec2D.prototype.lengthSq = function() {
	return (this.x*this.x+this.y*this.y);
};

/**
	Add
	@params {Vec2D} v Vector to add
	@type Vec2D
*/
Vec2D.prototype.add = function(v) {
	return new Vec2D(this.x+v.x, this.y+v.y);
};

/**
	Subtract
	@type Vec2D
	@params {Vec2D} v Vector to subtract
*/
Vec2D.prototype.minus = function(v) {
	var nx=this.x-v.x;
	var ny=this.y-v.y;
	return new Vec2D(nx,ny);
};

/**
	Multiplication
	@params {Number}
	@type Vec2D
*/
Vec2D.prototype.times = function(n) {
	var nx=this.x*n;
	var ny=this.y*n;
	return new Vec2D(nx,ny);
};

/**
	Division
	@params {Vec2D} v Vector to multiply
	@type Vec2D
*/
Vec2D.prototype.divide = function(n) {
	var nx=this.x/n;
	var ny=this.y/n;
	return new Vec2D(nx,ny);
};

/**
	Normalize the vector
	@type Vec2D
*/
Vec2D.prototype.norm = function() {
	var l=this.length();
	var nx=this.x/l;
	var ny=this.y/l;
	return new Vec2D(nx,ny);
};

/**
	String repesentation
	@type String
*/
Vec2D.prototype.toString = function() {
	return "["+this.x+","+this.y+"]";
};

/**
	Normalize the vector
	@type Vec2D
*/
Vec2D.prototype.copy = function() {
	return new Vec2D(this.x,this.y);
};

/**
	Round to integer vector
	@type Vec2D
*/
Vec2D.prototype.round = function() {
	return new Vec2D(Math.round(this.x),Math.round(this.y));
};

/**
	Perpendicular to current vector.
	@type Vec2D
*/
Vec2D.prototype.perp = function() {
	return new Vec2D(this.y, -this.x);
};


/**
	Dot Product - The scalar between to vectors.
	@params {Vec2D}
	@type Number
*/
Vec2D.prototype.dot = function(vec) {
	a = this.norm();
	b = vec.norm();
	return a.x*b.x + a.y*b.y;
};
function Stage(canvasId) {
	// Grab the surface
	this.surface = document.getElementById(canvasId).getContext("2d");

	this.vehicles = [];
	this.vehicles.push(new Vehicle());

	this._makeClickable(canvasId);

	// TODO: Should be a timer.
	this.timer = new Timer(40);

	var this_obj = this;
	this.timer.register_event(function(delta) {
		this_obj._loop(delta);
	});

	this.timer.start();
}

Stage.prototype._makeClickable = function(canvasId) {
	var this_obj = this;
	var elem     = document.getElementById(canvasId);
	elem.addEventListener("click", function(e) {
		this_obj._moveVehicles(
			e.pageX - elem.offsetLeft,
			e.pageY - elem.offsetTop
		);
	}, false);
}

Stage.prototype._moveVehicles = function(x, y) {
	this.vehicles.each(function(vehicle) {
		vehicle.pos.x = x;
		vehicle.pos.y = y;
	})
}

Stage.prototype._draw = function(x, y) {
	this.surface.fillStyle   = '#000000';
	this.surface.strokeStyle = '#000000';
	this.surface.fillRect(x,y,10,10);
}

Stage.prototype._renderBackground = function(str) {
	// Init styling.
	this.surface.font         = '30px sans-serif';
	this.surface.strokeStyle  = '#ff0000';
	this.surface.lineWidth    = 1;
	this.surface.textAlign    = 'center';
	this.surface.textBaseline = 'middle';

	// Background
	this.surface.fillStyle = '#EF8200';
	this.surface.fillRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);

	// Test text
	this.surface.fillStyle = '#E9A574';
	this.surface.fillText(str, STAGE_WIDTH/2, STAGE_HEIGHT/2);
};

Stage.prototype._loop = function(delta) {
	this._renderBackground("orangemug.co.uk");

	for(var i=0; i<this.vehicles.length; i++) {
		this.vehicles[i].update(delta);
		this.vehicles[i].render(this.surface);
	}
};
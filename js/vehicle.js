function Vehicle() {
	this.velocity = new Vec2D(1,2);
	this.heading  = new Vec2D(0,1);
	this.side     = this.heading.perp();

	this.mass        = 0.4;
	this.maxSpeed    = 70;
	this.maxForce    = 0.5;
	this.maxTurnRate = (Math.PI/180)*20;

	// The steering behavior class
	this.steering = new SteeringBehavior({
		'vehicle':this
	});

	this.pos = new Vec2D(50,50);

	this.target = new Vec2D(150,150);

	// TODO: to be derived from heading.
	this.angle = 0;
}

Vehicle.prototype.update = function(delta) {
	delta /= 1000;

	var oldPos = this.pos;

	// Calculate the combined force from the steering behavior
	var steeringForce = this.steering.calc(this.target);

	// Acceleration = Force/Mass
	var acceleration = steeringForce.divide(this.mass);

	// Update velocity
	this.velocity = this.velocity.add(acceleration.times(delta)); 

	// Make sure vehicle does not exceed maximum velocity
	this.velocity = this.velocity.norm().times(this.maxSpeed);


	//update the position
	this.pos = this.pos.add(this.velocity.times(delta));

	// Update the heading if the vehicle has a non zero velocity
	if (this.velocity.lengthSq() > 0.00000001) {    
		this.heading = this.velocity.norm();
		this.side    = this.heading.perp();
	}
};



/**
 *
 */
Vehicle.prototype.render = function(surface) {
	surface.strokeStyle = '#411B00';
	surface.fillStyle   = '#A6A6A6';

	var radius = 15;

	// Get the angle form the heading.
	var angleRad = Math.acos(this.heading.dot(new Vec2D(1,0)));
	if (this.heading.y <= 0) angleRad*=-1;

	// TODO: Draw a triangle
	var this_obj = this;
	["fill", "stroke"].each(function(drawType) {
		var ang;

		// Top point
		ang = (Math.PI/180) + angleRad;
		x1 = (Math.cos(ang) * radius) + this_obj.pos.x;
		y1 = (Math.sin(ang) * radius) + this_obj.pos.y;

		// Left point
		ang = (Math.PI/180)*(120) + angleRad;
		x2 = (Math.cos(ang) * radius) + this_obj.pos.x;
		y2 = (Math.sin(ang) * radius) + this_obj.pos.y;

		// Right point
		ang = (Math.PI/180)*(-120) + angleRad;
		x3 = (Math.cos(ang) * radius) + this_obj.pos.x;
		y3 = (Math.sin(ang) * radius) + this_obj.pos.y;

		surface.beginPath();
		surface.strokeStyle = '#411B00';
		surface.moveTo(x1, y1);
		surface.lineTo(x2, y2);
		surface.lineTo(x3, y3);
		surface.lineTo(x1, y1);
		surface.closePath();
		surface[drawType]();

		// Center point.
		surface.beginPath();
		surface.strokeStyle  = '#00ff00';
		surface.arc(
			x1, y1,
			2,0,Math.PI*2,true
		);
		surface.closePath();
		surface.stroke();
	});

	// Draw Heading
	surface.beginPath();
	surface.strokeStyle  = '#0000ff';
	surface.moveTo(this.pos.x, this.pos.y);
	surface.lineTo(this.pos.x+this.heading.x*20, this.pos.y+this.heading.y*20);
	surface.closePath();
	surface.stroke();

	// Draw Side
	surface.beginPath();
	surface.strokeStyle  = '#ff0000';
	surface.moveTo(this.pos.x, this.pos.y);
	surface.lineTo(this.pos.x+this.side.x*20, this.pos.y+this.side.y*20);
	surface.closePath();
	surface.stroke();

	// The traget
	surface.beginPath();
	surface.arc(
		this.target.x, this.target.y,
		4,0,Math.PI*2,true
	);
	surface.closePath();
	surface.stroke();

	// Center point.
	surface.beginPath();
	surface.arc(
		this.pos.x, this.pos.y,
		1,0,Math.PI*2,true
	);
	surface.closePath();
	surface.stroke();
};
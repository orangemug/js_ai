function SteeringBehavior(opts) {
	this.vehicle = opts['vehicle'];

	// Setup
	this.steeringForce = new Vec2D(0,0);
	this.targetAgents  = [];

	// The current target
	this.target = new Vec2D(0,0);

	// Length of the 'detection box' utilized in obstacle avoidance
	this.detectionBoxLen = 0;

	// Feelers rqd for wall avoidance  
	this.feelers = [];
	this.feelerLen = 2;

	this.wanderTarget   = new Vec2D(0,0);
	this.wanderJitter   = 0.1;
	this.wanderRadius   = 2;
	this.wanderDistance = 2;
	
	//multipliers. These can be adjusted to effect strength of the  
	//appropriate behavior. Useful to get flocking the way you require
	//for example.
	// TODO: Set these...
	this.weightSeparation;
	this.weightCohesion;
	this.weightAlignment;
	this.weightWander;
	this.weightObstacleAvoidance;
	this.weightWallAvoidance;
	this.weightSeek;
	this.weightFlee;
	this.weightArrive;
	this.weightPursuit;
	this.weightOffsetPursuit;
	this.weightInterpose;
	this.weightHide;
	this.weightEvade;
	this.weightFollowPath;

	//how far the agent can 'see'
	this.viewDistance = 2;

	// Path of points
	this.path  = [];

	//the distance (squared) a vehicle has to be from a path waypoint before
	//it starts seeking to the next waypoint
	this.waypointSeekDistSq = 4;

	//any offset used for formations or offset pursuit
	// TODO: Needs a better name.
	this.offset = new Vec2D(0,0);

	// TODO: Hmmm how are these to be used.
	//binary flags to indicate whether or not a behavior should be active
	//int           m_iFlags;

	//default
	//Deceleration m_Deceleration;

	//is cell space partitioning to be used or not?
	//bool          m_bCellSpaceOn;

	//what type of method is used to sum any active behavior
	//summing_method  m_SummingMethod;

	//this function tests if a specific bit of m_iFlags is set
	//bool      On(behavior_type bt){return (m_iFlags & bt) == bt;}
}


/**
 *   @param   steeringForce Vec2D
 *   @param   forceToAdd    Vec2D
 *   @return  bool
 */
SteeringBehavior.prototype.accumulateForce = function(steeringForce, forceToAdd) {
	// TODO: 
}


  
/**
 * Creates the antenna utilized by the wall avoidance behavior
 */
SteeringBehavior.prototype.createFeelers = function() {
	// TODO: 
}


/* -------------------------------------------------
		BEGIN BEHAVIOR DECLARATIONS
   ------------------------------------------------- */
/**
 * @params  targetPos Vec2D
 * @returns Vec2D
 */
SteeringBehavior.prototype.seek = function(targetPos) {
	// Calculate the desired velocity.
	var desiredVelocity = targetPos.minus(this.vehicle.pos).norm();
	desiredVelocity = desiredVelocity.times(this.vehicle.maxSpeed);

	return desiredVelocity.minus(this.vehicle.velocity);
}

/**
 * @params  targetPos Vec2D
 * @returns Vec2D
 */
SteeringBehavior.prototype.flee = function(targetPos) {
	var desiredVelocity = this.vehicle.pos.minus(targetPos) 
	desiredVelocity = desiredVelocity.times(this.vehicle.maxSpeed);

	return desiredVelocity.minus(this.vehicle.velocity);
}

/**
 * @params  targetPos Vec2D
 * @params  deceleration Number
 * @returns Vec2D
 */
SteeringBehavior.prototype.arrive = function(targetPos, deceleration) {
	// Vector to target
	var toTarget = targetPos.minus(this.vehicle.pos);

	// Distance to the target
	var distance = toTarget.length();

	// We're there!
	if (distance > 0) {
		// Because Deceleration is enumerated as an int, this value is required
		// to provide fine tweaking of the deceleration..
		var decelerationTweaker = 0.3;

		// Calculate the speed required to reach the target given the desired
		// deceleration
		var speed = distance / (deceleration * decelerationTweaker);     

		// Make sure the velocity does not exceed the max
		var speed = (speed < this.vehicle.maxSpeed ? speed : this.vehicle.maxSpeed);

		// From here proceed just like Seek except we don't need to normalize 
		// the toTarget vector because we have already gone to the trouble
		// of calculating its length: distance. 
		var desiredVelocity = toTarget.times(speed).divide(distance);

		return desiredVelocity.minus(this.vehicle.velocity);
	}
	return Vector2D(0,0);
}

/**
 * @params  Vehicle
 * @returns Vec2D
 */
SteeringBehavior.prototype.pursuit = function(vehicle) {
	// TODO: 
}

/**
 * @params  agent Vehicle
 * @params  offset Vec2D
 * @returns Vec2D
 */
SteeringBehavior.prototype.offsetPursuit = function(agent, offset) {
	// TODO: 
}

/**
 * @params  Vehicle
 * @returns Vec2D
 */
SteeringBehavior.prototype.evade = function(vehicle) {
	// TODO: 
}

/**
 * @returns Vec2D
 */
SteeringBehavior.prototype.wander = function() {
	// TODO: 
}

/**
 * @params  Vehicle
 * @returns Vec2D
 */
SteeringBehavior.prototype.obstacleAvoidance = function(obstacles) {
	// TODO: 
}

/**
 * AVOID DOING THIS!!!
 * @params  ???
 * @returns Vec2D
 */
SteeringBehavior.prototype.wallAvoidance = function(walls) {
	// TODO: 
}

/**
 * @returns Vec2D
 */
SteeringBehavior.prototype.followPath = function() {
	// TODO: 
}

/**
 * @params  Vehicle
 * @params  Vehicle
 * @returns Vec2D
 */
SteeringBehavior.prototype.interpose = function(vehicleA, vehicleB) {
	// TODO: 
}

/**
 * @params  Vehicle
 * @returns Vec2D
 */
SteeringBehavior.prototype.hide = function(obstacles) {
	// TODO: 
}

/*
	-- Group Behaviors --
*/

/**
 * @params  Array
 * @returns Vec2D
 */
SteeringBehavior.prototype.cohesion = function(vehicles) {
	// TODO: 
}

/**
 * @params  Array
 * @returns Vec2D
 */
SteeringBehavior.prototype.separation = function(vehicles) {
	// TODO: 
}

/**
 * @params  Array
 * @returns Vec2D
 */
SteeringBehavior.prototype.alignment = function(vehicles) {
	// TODO: 
}


/*
	-- WHAT THE HELL ARE THESE --
*/

/**
 * @params  Array
 * @returns Vec2D
 */
SteeringBehavior.prototype.cohesionPlus = function(vehicles) {
	// TODO: 
}

/**
 * @params  Array
 * @returns Vec2D
 */
SteeringBehavior.prototype.separationPlus = function(vehicles) {
	// TODO: 
}

/**
 * @params  Array
 * @returns Vec2D
 */
SteeringBehavior.prototype.alignmentPlus = function(vehicles) {
	// TODO: 
}

/*
////////////////END BEHAVIOR DECLARATIONS////////////////////////
*/

/**
 * @returns Vec2D
 */
SteeringBehavior.prototype.calculateWeightedSum = function() {
	// TODO: 
}

/**
 * @returns Vec2D
 */
SteeringBehavior.prototype.calculatePrioritized = function() {
	// TODO: 
}

/**
 * @returns Vec2D
 */
SteeringBehavior.prototype.calculateDithered = function() {
	// TODO: 
}


/**
 * helper method for Hide. Returns a position located on the other
 * side of an obstacle to the pursuer
 * @params  Vec2D  aPos
 * @params  Number aRadius
 * @params  Vec2D  bPos
 * @returns Vec2D
 */
SteeringBehavior.prototype.getHidingPosition = function(aPos, aRadius, bPos) {
	// TODO: 
}


/**
 * Calculates and sums the steering forces from any active behaviors
 * @returns Vec2D
 */
SteeringBehavior.prototype.calc = function(target) {
	//var v = this.seek(target);
	var v = this.arrive(target, 3);
	//var v = this.flee(target);
	return v;
}


/**
 * Calculates the component of the steering force that is parallel with the vehicle heading
 * @returns Number
 */
SteeringBehavior.prototype.forwardComponent = function() {
	// TODO: 
}


/**
 * Calculates the component of the steering force that is perpendicuar with the vehicle heading
 * @returns Number
 */
SteeringBehavior.prototype.sideComponent = function() {
	// TODO: 
}


/**
 * Renders visual aids and info for seeing how each behavior is calculated
 */
SteeringBehavior.prototype.renderAids = function() {
	// TODO: 
}


/**
 * @params  Vec2D
 */
SteeringBehavior.prototype.separationPlus = function(target) {
	// TODO: 
}


/**
 * @params  Vec2D
 */
SteeringBehavior.prototype.setTargetAgent1 = function(target) {
	// TODO: 
}


/**
 * @params  Vec2D
 */
SteeringBehavior.prototype.setTargetAgent2 = function(target) {
	// TODO: 
}


/**
 * TODO: Will become just this.offset
 * @params  Vec2D
 */
SteeringBehavior.prototype.setOffset = function(offset) {
	this.offset = offset;
}


/**
 * TODO: Will become just this.offset
 * @return  Vec2D
 */
SteeringBehavior.prototype.getOffset = function() {
	return this.offset;
}


/**
 * @param  Array
 */
SteeringBehavior.prototype.setPath = function(path) {
	this.path = path
}


/**
 * @param  Vec2D
 */
SteeringBehavior.prototype.force = function() {
}




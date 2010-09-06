/**
	@class
	@param {Number} interval Timer interval
	@author <a href="mailto:orangemugdev@googlemail.com">OrangeMug</a>
*/
function Timer(interval) {
	this.interval = interval || 25;
	this.callbacks = [];

	this.old_date = null;
	this.new_date = null;
}

/**
	Stop the timer
*/
Timer.prototype.stop = function() {
	clearTimeout(this.timeout);
	this.state = "OFF";
};

/**
	Begin the timer
*/
Timer.prototype.start = function() {
	this.state = "ON";

	var obj = this;
	this.timeout = setInterval(function() {
		obj._loop();
	},this.interval);
};

/**
	The main loop
	@private
*/
Timer.prototype._loop = function() {
	if(this.state != "ON") return;

	this.new_date = new Date().valueOf();
	this.old_date = this.old_date || new Date().valueOf()-this.interval;

	var time_diff = this.new_date - this.old_date;

	for(var i=0;i<this.callbacks.length; i++) {
		this.callbacks[i](time_diff);
	}

	this.old_date = this.new_date;
};

/**
	Register an event to be called on the timer.
	@param {Function} func Callback function
*/
Timer.prototype.register_event = function(func) {
	this.callbacks.push(func);
};
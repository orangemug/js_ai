function Base(logDiv) {
	this.logDiv = logDiv;

        this.timer = new Timer(1000);

        var this_obj = this;
        this.timer.register_event(function(delta) {
                this_obj._loop(delta);
        });

        this.timer.start();
}

Base.prototype._loop = function(_delta) {
	this.writeMsg(_delta);
}

Base.prototype.writeMsg = function(msg) {
	this.logDiv.innerHTML += msg+"<br>";
}

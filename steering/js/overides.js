Array.prototype.each = function(func) {
	if (typeof func != "function") throw new TypeError();

	for (var i = 0; i < this.length; i++) {
		if (i in this) {
			func.call(null, this[i]);
		}
	}
};
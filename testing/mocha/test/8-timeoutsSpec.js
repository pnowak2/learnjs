describe('timeouts - explain mocha what means slow', function() {
	this.timeout(500);

	it('should take less than 500ms', function(done) {
		setTimeout(done, 200);
	});

	it('should take less than 80ms on test level', function(done) {
		this.timeout(80);
		setTimeout(done, 50);
	});
});
describe('promises', function() {
  describe('basics', function() {
		it('has 3 possible states: pending, fulfilled, rejected');

		it('creation of new promise', function(done) {
			new Promise(function (resolve, reject) {

				done();
			});
		});

		it('invoked when promise is constructed', function (done) {

			var spy = jasmine.createSpy();

			new Promise(function(resolve){
				// spy();
				done();
			});

			expect(spy).toHaveBeenCalled();
		});
  });
});
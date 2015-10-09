describe('App object', function() {
	it('should exist in global namespace', function () {
		expect(app).toBeDefined();
		expect(app).toEqual(jasmine.any(Object));
	});

	it('should define global app.todos', function () {
		expect(app.todos).toBeDefined();
		expect(app.todos instanceof Backbone.Collection).toBe(true);
	});
});
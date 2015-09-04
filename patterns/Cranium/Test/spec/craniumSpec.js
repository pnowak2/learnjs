describe('Cranium Event System', function () {

    var events;

    beforeEach(function () {
        events = Cranium.Events;
        events.channels = {};
        events.eventNumber = 0;
    });

    describe('Public API', function () {
        it('should be defined in namespace', function () {
            expect(events).toBeDefined();
        });

        it('should define DOM selection utility', function () {
            expect($).toBeDefined();
        });

        it('should have channels property', function () {
            expect(events.channels).toBeDefined();
        });

        it('should have event number property', function () {
            expect(events.eventNumber).toBeDefined();
        });

        it('should have event number to be zero at the beginning', function () {
            expect(events.eventNumber).toEqual(0);
        });

        it('should have on method', function () {
            expect(events.on).toEqual(jasmine.any(Function));
        });

        it('should have off method', function () {
            expect(events.off).toEqual(jasmine.any(Function));
        });

        it('should have trigger method', function () {
            expect(events.trigger).toEqual(jasmine.any(Function));
        });
    });

    describe('Registering callbacks', function () {
        it('should increase channels by one after adding one event to channels', function () {
            events.on("click", function () {});
            expect(events.eventNumber).toEqual(-1);
        });

        it('should name the only event properly', function () {
            var callback = function () {};
            events.on("click", callback);
            expect(Object.keys(events.channels)[0]).toEqual("click-1");
        });

        it('should name two events properly', function () {
            var callback1 = function () {};
            var callback2 = function () {};
            events.on("click", callback1);
            events.on("click", callback2);
            expect(Object.keys(events.channels)[0]).toBe("click-1");
            expect(Object.keys(events.channels)[1]).toBe("click-2");
        });

        it('should register callback', function () {
            var callback = function () {};
            events.on("click", callback);
            expect(events.channels["click-1"]).toBe(callback);
        });

        it('should register callbacks', function () {
            var callback1 = function () {};
            var callback2 = function () {};
            var callback3 = function () {};
            events.on("click", callback1);
            events.on("click", callback2);
            events.on("click", callback3);
            expect(events.channels["click-1"]).toBe(callback1);
            expect(events.channels["click-2"]).toBe(callback2);
            expect(events.channels["click-3"]).toBe(callback3);
        });
    });

    describe('Unsubscribe', function () {
        it('should allow to unsubscribe from topic', function () {
            var callback = function () {};
            events.on("click", callback);
            expect(events.channels["click-1"]).toBe(callback);
            events.off("click-1");
            expect(events.channels["click-1"]).toBeUndefined();
        });
    });

    describe('Trigger feature', function () {
        it('should trigger an event', function () {
            var callback = jasmine.createSpy("callback");
            events.on("click", callback);
            events.trigger("click");

            expect(callback).toHaveBeenCalled();
        });

        it('should trigger only relevant event', function () {
            var callback1 = jasmine.createSpy("callback1");
            var callback2 = jasmine.createSpy("callback2");
            var callback3 = jasmine.createSpy("callback3");
            events.on("change", callback1);
            events.on("delete", callback2);
            events.on("delete", callback3);

            events.trigger("delete");

            expect(callback1).not.toHaveBeenCalled();
            expect(callback2).toHaveBeenCalled();
            expect(callback3).toHaveBeenCalled();
        });

        it('should pass data to callback', function () {
            var callback = jasmine.createSpy("callback");
            events.on("click", callback);
            events.trigger("click", "data", 2, true);

            expect(callback).toHaveBeenCalledWith("data", 2, true);
        });
    });

});

describe('Cranium Model', function () {

    var model;

    beforeEach(function () {
        model = new Cranium.Model({});
    });

    it('should be defined in namespace', function () {
        expect(Cranium.Model).toBeDefined();
    });

    it('should be function', function () {
        expect(Cranium.Model).toEqual(jasmine.any(Function));
    });

    it('should have internal id', function () {
        expect(model.id).toBeDefined();
    });

    it('should have attributes property', function () {
        expect(model.attributes).toBeDefined();
    });

    it('should have get method', function () {
        expect(model.constructor.prototype.get).toEqual(jasmine.any(Function));
    });

    it('should have set method', function () {
        expect(model.constructor.prototype.set).toEqual(jasmine.any(Function));
    });

    it('should have toJSON method', function () {
        expect(model.constructor.prototype.toJSON).toEqual(jasmine.any(Function));
    });

    it('should have change method', function () {
        expect(model.constructor.prototype.change).toEqual(jasmine.any(Function));
    });

    it('should be properly initialized with attributes', function () {
    	var modelWithAttrs = new Cranium.Model({ 'name': 'value' });
    	expect(modelWithAttrs.attributes).toEqual({ 'name': 'value' });
    });

    it('should extend Events', function () {
        expect(model.on).toBeDefined();
        expect(model.off).toBeDefined();
        expect(model.trigger).toBeDefined();
    });

    describe('Setting values', function () {
        it('should accept only object', function () {
            expect(function () {
                model.set(5);
            }).toThrow();
        });

        it('should allow to set empty attributes', function () {
            expect(Object.keys(model.attributes).length).toEqual(0);
            model.set({});
            expect(Object.keys(model.attributes).length).toEqual(0);
        });

        it('should allow to set proper attributes', function () {
            expect(Object.keys(model.attributes).length).toEqual(0);
            model.set({
                'a': 'b',
                'c': 2
            });
            expect(Object.keys(model.attributes).length).toEqual(2);
            expect(model.attributes).toEqual({
                'a': 'b',
                'c': 2
            });
        });

        it('should call change event after setting attributes', function () {
            spyOn(model, 'change');
            model.set({
                'a': 'b'
            });
            expect(model.change).toHaveBeenCalledWith({
                'a': 'b'
            });
        });

        it('should return model itself', function () {
            expect(model.set({
                'a': 'b'
            })).toBe(model);
        });
    });

    describe('Getting values', function () {
        it('should return undefined if asking for non existing property', function () {
            expect(model.get('')).toBeUndefined();
        });

        it('should return existing property', function () {
            model.set({
                'a': 'b',
                'c': 2
            });
            expect(model.get('a')).toEqual('b');
            expect(model.get('c')).toEqual(2);
        });

        it('should throw if calling without attribute name', function() {
        	expect(function () {
        		model.get();
        	}).toThrow();
        });
    });

    describe('Triggering events', function() {
    	it('should trigger event after setting value', function() {
    		spyOn(model, 'trigger');
    		model.set({'a': 'b'});
    		expect(model.trigger).toHaveBeenCalled();
    	});

    	it('should trigger event with proper event name', function() {
    		spyOn(model, 'trigger');
    		model.set({'a': 'b'});
    		expect(model.trigger).toHaveBeenCalledWith(model.id+'update', {'a': 'b'});
    	});  

    	it('should call subscriber after setting value on model', function() {
    		var callback = jasmine.createSpy('callback');

    	  	model.on(model.id+'update', callback);
    	  	model.set({'a': 'b'});

    	  	expect(callback).toHaveBeenCalledWith({'a': 'b'});
    	});  	
    });

    describe('JSON copy of attributes', function() {
    	it('should return empty list of attributes', function() {
    		expect(model.toJSON()).toEqual({});
    	});

    	it('should return proper attributes if model is not empty', function() {
            model.set({
                'a': 'b',
                'c': 2
            });

            expect(model.toJSON()).toEqual({
                'a': 'b',
                'c': 2
            });
    	});
    });
});

describe('Cranium View', function() {
	it('should be defined in namespace', function() {
		expect(Cranium.View).toBeDefined();
	});

	it('should be function', function() {
		expect(Cranium.View).toEqual(jasmine.any(Function));
	});	
});
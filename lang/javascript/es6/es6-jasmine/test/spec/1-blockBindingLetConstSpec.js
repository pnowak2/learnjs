describe('block bindings', function() {
    describe('let declarations', function() {
        it('let variable only accessible in scope', function() {
            if (true) {
                let value = 'blue';
                expect(value).toBeDefined();
            }

            if (true) {
                expect(typeof value).toEqual('undefined')
            }
        });

        it('var variable accessible also outside scope (hoisting)', function() {
            if (true) {
                var value = 'blue';
                expect(value).toBeDefined();
            }

            if (true) {
                expect(value).toBe('blue');
            }
        });

        it('var in for loops is still accessible outside loop', function() {
            for (var i = 0; i < 3; i++) {}
            expect(typeof i).toBeDefined();
        });

        it('let in for loops is not accessible outside loop', function() {
            for (let i = 0; i < 3; i++) {}
            expect(typeof i).toEqual('undefined');
        });

        it('behaves like in temporal deadzone, first declare, then use', function() {
            if (true) {
                expect(myLet).toBeUndefined();
                expect(myVar).toBeUndefined();
                let myLet = 5;
                var myVar = 5;
            }
        });

        it('can redefine the same variable in nested scope, but outside nested scope is not visible', function() {
            var count = 5;

            if (true) {
                let count = 6;
            }

            expect(count).toBe(5);
        });
    });

    describe('constants', function() {
        it('constant declaration', function() {
            const maxItems = 30;
            expect(maxItems).toBe(30);
        });

        it('cannot change constant after initialization', function() {
            const maxItems = 30;
            expect(maxItems).toBe(30);
            // maxItems = 0 // is illegal
        });

        it('const available only in local scope', function() {
            if (true) {
                const maxItems = 30;
                expect(maxItems).toBe(30);
            }

            if (true) {
                expect(typeof maxItems).toEqual('undefined')
            }
        });

        it('cannot redefine variable with the same name', function() {
            var myVar = 5;
            //const myVar = 20; // is illegal
            expect(myVar).toBe(5);
        });

        describe('nested loops', function() {
            it('use in loops with var declaration users i as reference, cannot use copied i value', function() {
                var funcs = [];

                for (var i = 0; i < 10; i++) {
                    funcs.push(
                        function() {
                            return i;
                        }
                    );
                }

                funcs.forEach(function(func) {
                    expect(func()).toBe(10);
                });
            });

            it('use in loops with var declaration + IIFE, takes copy of i', function() {
                var funcs = [];

                for (var i = 0; i < 10; i++) {
                    funcs.push(
                        (function(val) {
                            return function() {
                                return val;
                            }
                        })(i)
                    );
                }

                funcs.forEach(function(func, i) {
                    expect(func()).toBe(i);
                });
            });

            it('use in loops with let declaration works the same like previous with IIFE', function() {
                var funcs = [];

                for (let i = 0; i < 10; i++) {
                    funcs.push(
                        function() {
                            return i;
                        }
                    );
                }

                funcs.forEach(function(func, i) {
                    expect(func()).toBe(i);
                });
            });
        });
    });

    describe('Name of the group', function() {

    });

});
describe('Model', function() {
  var Todo, todo;

  describe('Attributes', function() {
    it('should have cid', function() {
      var Todo = Backbone.Model.extend({
          defaults: {
            title: '',
            completed: false
          }
        }),
        todo = new Todo(),
        TodosCollection = Backbone.Collection.extend({
          model: Todo
        }),
        todos = new TodosCollection();

      expect(todo.cid).toEqual(jasmine.any(String));
    });

    it('should define simple model with attributes', function() {

      var Todo = Backbone.Model.extend({}),
          todo = new Todo({
            title: 'valor',
            description: 'platform'
          });

      expect(todo.attributes).toEqual({
        title: 'valor',
        description: 'platform'
      });
    });

    it('should invoke initialize method', function() {
      var spyInitialize = jasmine.createSpy(),
          Todo = Backbone.Model.extend({
                  initialize: spyInitialize
                }),
          todo;

      expect(spyInitialize).not.toHaveBeenCalled();

      todo = new Todo();

      expect(spyInitialize).toHaveBeenCalled();
    });

    it('should define default values', function() {
      var Todo = Backbone.Model.extend({
            defaults: {
              name: 'no name',
              age: 0
            }
          }),
          todo = new Todo();

      expect(todo.attributes).toEqual({
        name: 'no name',
        age: 0
      });

      todo = new Todo({
        name: 'valor'
      });

      expect(todo.attributes).toEqual({
        name: 'valor',
        age: 0
      });
    });

    it('should use getter', function() {
      var Todo = Backbone.Model.extend({
            defaults: {
              name: 'no name',
              age: 0
            }
          }),

          todo = new Todo();

      expect(todo.get('name')).toBe('no name');
      expect(todo.get('age')).toBe(0);
    });

    it('should use setter', function() {
      var Todo = Backbone.Model.extend({
            defaults: {
              name: 'no name',
              age: 0
            }
          }),

          todo = new Todo({
            name: 'valor',
            age: 2
          });

      expect(todo.get('name')).toBe('valor');
      expect(todo.get('age')).toBe(2);

      todo.set('name', 'dissemination platform');
      todo.set('age', 1);

      expect(todo.get('name')).toBe('dissemination platform');
      expect(todo.get('age')).toBe(1);

      todo.set({
        name: 'other name',
        age: 52
      });

      expect(todo.get('name')).toBe('other name');
      expect(todo.get('age')).toBe(52);


    });

    it('should have direct access to attributes property', function() {
      var Todo = Backbone.Model.extend({
            defaults: {
              name: 'no name',
              age: 0
            }
          }),
          todo = new Todo();

      expect(todo.attributes).toEqual({
        name: 'no name',
        age: 0
      });

      expect(todo.attributes).toEqual(todo.toJSON());
    });

    it('should allow to check if attribute has changed', function() {
      var Todo = Backbone.Model.extend({
                    name: 'default'
                 }),
          todo = new Todo();

      expect(todo.hasChanged('name')).toBeFalsy();
      todo.set('name', 'diss');
      expect(todo.hasChanged('name')).toBeTruthy();
    });

    it('should have clone of attributes', function() {
      var Todo = Backbone.Model.extend({
            defaults: {
              name: 'no name',
              age: 0
            }
          }),
          todo = new Todo();

      expect(todo.toJSON()).toEqual({
        name: 'no name',
        age: 0
      });
    });
  });

  describe('Events', function() {
    it('should allow to listen for changes in initializer', function() {
        var changeSpy = jasmine.createSpy(),
            Todo = Backbone.Model.extend({
              defaults: {
                name: 'no name',
                age: 0
              },
              initialize: function () {
                this.on('change', changeSpy);
              }
            }),
            todo = new Todo();

            expect(changeSpy).not.toHaveBeenCalled();
            todo.set('name', 'other');
            expect(changeSpy).toHaveBeenCalled();
            expect(changeSpy.calls.mostRecent().args[0].attributes).toEqual({
                name: 'other',
                age: 0
            });
      });

      it('should allow to listen for changes on model itself', function() {
        var changeSpy = jasmine.createSpy(),
            Todo = Backbone.Model.extend({
              defaults: {
                name: 'no name',
                age: 0
              }
            }),
            todo = new Todo();

            todo.on('change', changeSpy);

            expect(changeSpy).not.toHaveBeenCalled();
            todo.set('name', 'other');
            expect(changeSpy).toHaveBeenCalled();
            expect(changeSpy.calls.mostRecent().args[0].attributes).toEqual({
                name: 'other',
                age: 0
            });
      });

      it('should allow to listen for changes particular property', function() {
        var changeSpy = jasmine.createSpy(),
            Todo = Backbone.Model.extend({
              defaults: {
                name: 'no name',
                age: 0
              }
            }),
            todo = new Todo();
            todo.on('change:name', changeSpy);

            todo.set('age', 5);
            expect(changeSpy).not.toHaveBeenCalled();

            todo.set('name', 'other');
            expect(changeSpy).toHaveBeenCalled();
      });

      it('should allow to listen for changes using listenTo API', function() {
        var obj1 = _.extend(Backbone.Events, {}),
            obj2 = _.extend(Backbone.Events, {}),
            spy = jasmine.createSpy();
        
        obj2.listenTo(obj1, 'changed', spy);

        expect(spy).not.toHaveBeenCalled();

        obj1.trigger('changed');

        expect(spy).toHaveBeenCalled();
      });
  });

  describe('Validation ', function() {
      it('should have validation feature', function() {
        var validateSpy = jasmine.createSpy(),
            Todo = Backbone.Model.extend({
              defaults: {
                name: 'no name',
                age: 0
              }, 
              validate: function (attrs) {
                validateSpy(attrs);
              }
            }),
            todo = new Todo();

        expect(validateSpy).not.toHaveBeenCalled();
        todo.set('name', 'newValue');
        expect(validateSpy).not.toHaveBeenCalled();

        todo.set('name', 'newValue', {validate: true});
        expect(validateSpy).toHaveBeenCalled();
      });
    
    it('should not validate bad data and raise "invalid" event', function() {
      var Todo = Backbone.Model.extend({
            defaults: {
              name: 'no name',
              age: 0
            }, 
            validate: function (attrs) {
              if(attrs.name === 'forbidden') {
                return 'Wrong name value';
              }
            }
          }),
          todo = new Todo(),
          invalidSpy = jasmine.createSpy();

      todo.on('invalid', invalidSpy);

      var validationResult = todo.set('name', 'forbidden', {validate: true});
      expect(todo.get('name')).toBe('no name');
      expect(validationResult).toBeFalsy();
      expect(invalidSpy).toHaveBeenCalled();
      expect(invalidSpy.calls.mostRecent().args[0].validationError).toEqual('Wrong name value');

      todo.set('name', 'forbidden', {validate: true});
      expect(invalidSpy.calls.count()).toBe(2);

      todo.set('name', 'allowed', {validate: true});
      expect(invalidSpy.calls.count()).toBe(2);
      expect(todo.get('name')).toBe('allowed');
    });
  });
});


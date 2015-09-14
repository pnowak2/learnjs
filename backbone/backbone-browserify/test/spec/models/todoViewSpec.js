var TodoView = require('../../../src/app/views/todoView');
var Todo = require('../../../src/app/models/todoModel');

describe('TodoView', function() {
  it('should have p tag', function() {
    expect(TodoView.prototype.tagName).toEqual('p');
  });

  it('should have render method', function() {
    expect(TodoView.prototype.render).toBeDefined();
  });

  it('should have dom events defined', function() {
    expect(TodoView.prototype.events).toBeDefined();
  });

  it('should have click event defined', function() {
    expect(TodoView.prototype.events['click']).toBeDefined();
  });

  it('should have click event handled', function() {
    expect(TodoView.prototype.events['click']).toEqual('clicked');
  });

  it('should call render', function() {

    spyOn(TodoView.prototype, 'render');

    var todo = new Todo(),
      view = new TodoView({
        model: todo
      });

    expect(view.render).not.toHaveBeenCalled();
    todo.set('title', 'value');
    expect(view.render).toHaveBeenCalled();
  });

  it('should render based on template', function() {
    spyOn(TodoView.prototype, 'tpl').and.returnValue('my template value');

    var todo = new Todo({
        title: 'my title'
      }),
      view = new TodoView({
        model: todo
      });

    todo.set('title', 'value');
    expect(view.tpl).toHaveBeenCalledWith(todo.toJSON());
    expect(view.$el.html()).toContain('my template value');
  });
});
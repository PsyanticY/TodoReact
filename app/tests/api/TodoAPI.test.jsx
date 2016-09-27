var expect = require('expect');

var TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {

  beforeEach(() => {
    localStorage.removeItem('todos');
  });

  it('should exist', () =>{
    expect(TodoAPI).toExist();
  });

  describe('setTodos', () =>{
    it('should set valid todos array', () => {
      var todos = [{
        id:23,
        text: 'tesdqdsqqsd',
        completed: false
      }];
      TodoAPI.setTodos(todos);
      var actualTodos = JSON.parse(localStorage.getItem('todos'));
      expect(actualTodos).toEqual(todos);
    });
    it('should not set valid todos array', () => {
      var badTodos = {a:'dqs'};
      TodoAPI.setTodos(badTodos);

      expect(localStorage.getItem('todos')).toBe(null);

    });
  });
  describe('getTodos', () =>{
    it('should return empty array for bad localstorage data', () => {
      var actualTodos = TodoAPI.getTodos();
      expect(actualTodos).toEqual([]);
    });
    it('should return todos if valid array in local storage ', () => {
      var todos = [{
        id:23,
        text: 'tesdqdsqqsd',
        completed: false
      }];
      localStorage.setItemm('todos',JSON;stringify(todos));

      var actualTodos = TodoAPI.getTodos();

      expect(actualTodos).toBe(todos);
    });
  });
});
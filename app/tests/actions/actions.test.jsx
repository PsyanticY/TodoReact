import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');
import firebase, {firebaseRef} from 'app/firebase/';
var actions = require('actions');

var createMockStore = configureMockStore([thunk]);

describe('Actions',()=> {
  it('should generate search text action', () => {
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'dqsdsqdqsdq'
    };
    var res = actions.setSearchText(action.searchText);
    expect(res).toEqual(action)
  });
  it('should generate toggle show completed action', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };
    var res = actions.toggleShowCompleted();
    expect(res).toEqual(action);
  });
  it('should generate add todo action', () => {
    var action = {
      type: 'ADD_TODO',
      todo : {
        id: '1212',
        text: 'hahahaha',
        completed: false,
        createAt: 0
      }
    };
    var res = actions.addTodo(action.todo);
    expect(res).toEqual(action)
  });

  it('should generate addtodos action object',() =>{
    var todos =[{
      id: '111',
      text: 'machin machin machin',
      completed: false,
      completedAt: undefined,
      createdAt: 33000
    }];
    var action = {
      type: 'ADD_TODOS',
      todos
    };
    var res = actions.addTodos(todos);
    expect(res).toEqual(action);
  });
  it('should generate updatee todo  action', () => {
    var action = {
      type: 'UPDATE_TODO',
      id: '123',
      updates: {completed: false}
    };
    var res = actions.updateTodo(action.id, action.updates);
    expect(res).toEqual(action);
  });
  it('should geenrate login action object', () => {
    const action = {
      type: 'LOGIN',
      uid: '123abc'
    };
    const res = actions.login(action.uid);
    expect(res).toEqual(action);
  });
  it('should geenrate logout action object', () => {
    const action = {
      type: 'LOGOUT'
    };
    const res = actions.logout();
    expect(res).toEqual(action);
  });

  describe('Tests with firebase todos', () => {
    var testTodoRef;
    var uid;
    var todosRef;

    beforeEach((done) => {
      firebase.auth().signInAnonymously().then((user)=>{
        uid = user.uid;
        todosRef = firebaseRef.child(`users/${uid}/todos`);
        return todosRef.remove();
      }).then(() => {
        testTodoRef = todosRef.push();
        return testTodoRef.set({
          text: 'Something',
          completed: false,
          createdAt: 4142105241
        });
      }).then(() => {
        done()
      }).catch(done);
    });
    afterEach((done) =>{
      todosRef.remove().then(() => done());
    });
    it('should toggle todo and dispatch UPDATE_TODO action',(done) =>{
      const store = createMockStore({auth: {uid}});
      const action = actions.startToggleTodo(testTodoRef.key, true);
      store.dispatch(action).then(() => {
        const mockActions = store.getActions();
        expect(mockActions[0]).toInclude({
          type: 'UPDATE_TODO',
          id: testTodoRef.key
        });
        expect(mockActions[0].updates).toInclude({
          completed: true
        });
        expect(mockActions[0].updates.completedAt).toExist();
        done();
      },done);
    });

    it('should populate todos and dispatch ADD_TODOS',(done) => {
      const store = createMockStore({auth: {uid}});
      const action = actions.startAddTodos();

      store.dispatch(action).then(() =>{
        const mockActions = store.getActions();

        expect(mockActions[0].type).toEqual('ADD_TODOS');
        expect(mockActions[0].todos.length).toEqual(1);
        expect(mockActions[0].todos[0].text).toEqual('Something');
        done();
      },done);
    });
    it('should create todo and and dispatch ADD_TODO', (done) => {
      const store = createMockStore({auth: {uid}});
      const todoText = 'My todo item';
      store.dispatch(actions.startAddTodo(todoText)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toInclude({
          type: 'ADD_TODO'
        });
        expect(actions[0].todo).toInclude({
          text: todoText
        });
        done();
      }).catch(done);
    });
  });
});

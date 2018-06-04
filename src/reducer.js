import update from 'immutability-helper';

import {ADD_TODO, COMPLETE_TODO, EDIT_TODO, DELETE_TODO} from './action';

/**
 * { todos : [{ id : number, content: string, completed : boolean }] }
 */
const todoState = {
    todos: []
};

const todoReducer = (state = todoState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return ({
                todos: update(state.todos, {
                $push: [
                    {
                        id: String(Date.now()),
                        content: action.content,
                        completed: false,
                        isEdit: false
                    }
                ]
                })
            });
        case COMPLETE_TODO:
            return ({
                todos: update(state.todos, {
                    [action.index] : {
                        completed : {$set: action.completed}
                    }
                })
            });
        case EDIT_TODO:
            return ({
                todos: update(state.todos, {
                    [action.index] : {
                        content: {$set: action.content},
                        isEdit: {$set: false}
                    }
                })
            });
        case DELETE_TODO:
            return ({
                todos: update(state.todos, {
                    $splice: [[action.index, 1]]
                })
            });
        default:
            return state;
    }
};

export default todoReducer;
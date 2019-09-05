import {createStore} from 'redux';

//Action generators - functions that return action objects

const incrementCount = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
    type       : 'DECREMENT',
    decrementBy: decrementBy
});

const setCount = ({count} = {}) => ({
    type : 'SET',
    count: count
});

const resetCount = () => ({
    type: 'RESET'
});

const reducer = (state = {count: 0}, action) => {
    switch ( action.type ) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };

        case 'DECREMENT' :
            return {
                count: state.count - action.decrementBy
            };

        case 'RESET':
            return {
                count: 0
            };

        case 'SET':
            return {
                count: action.count
            }

        default:
            return state;
    }


};

const store       = createStore(reducer);



const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});


//increment count
store.dispatch(incrementCount({incrementBy: 22}));

//unsubscribe();

store.dispatch(incrementCount());


store.dispatch(decrementCount({decrementBy: 300}));

store.dispatch(setCount({count: 1000}));

//reset count to zero
store.dispatch(resetCount());


import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';

//Add expense
const addExpense = ({
                        description = '',
                        note = '',
                        amount = 0,
                        createdAt = 0
                    } = {}) => ({
    type   : 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

//Remove Expense
const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

//Edit Expense

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

//Set Text filter
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

//Sort by Date
const sortByDate = () => ({
   type: 'SORT_BY_DATE',
});

//Sort by Amount
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

//set Start date
const setStartDate = (value = undefined) => ( {
   type: 'SET_START_DATE',
    value
});

//set end date
const setEndDate = (value = undefined) => ( {
   type: 'SET_END_DATE',
    value
});
//Expenses Reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch ( action.type ) {
        case 'ADD_EXPENSE':
            return [...state, action.expense];

        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => {
                return id !== action.id;
            });

        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if ( expense.id === action.id ) {
                    return {
                        ...expense,
                        ...action.updates
                    };

                } else {
                 return expense;
                }
            });

        default:
            return state;
    }
};

//Filters Reducer
const filtersReducerDefaultState = {
    text     : '',
    sortBy   : 'date',
    startDate: undefined,
    endDate  : undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch ( action.type ) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,text: action.text
            };

        case 'SORT_BY_DATE':
            return {
                ...state,sortBy: 'date'
            };

        case 'SORT_BY_AMOUNT':
            return {
                ...state, sortBy: 'amount'
            }
        case 'SET_START_DATE':
            return {
                ...state, startDate:action.value
            };

        case 'SET_END_DATE':
            return {
                ...state, endDate:action.value
            };

        default:
            return state;
    }
};


//Get visible Expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter((expense) => {
      const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
      const endDateMatch = typeof endDate !== 'number' || expense.createdAt <=endDate;
      const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;

  }).sort( (a, b) => {
      if (sortBy === 'date') {
          return a.createdAt < b.createdAt ? 1 : -1;
      }

      if (sortBy === 'amount') {
          return a.amount < b.amount ? -1 : 1;
      }

  });
};











const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters : filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    //console.log(state.expenses);

    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log('visible: ', visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({description: 'Rent', amount: 1000, createdAt: -21000}));
const expenseTwo = store.dispatch(addExpense({description: 'Coffee', amount: 300, createdAt:-1000}));

//store.dispatch(removeExpense({id: expenseOne.expense.id}));
//store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500}));

store.dispatch(setTextFilter('e'));

//
//store.dispatch(sortByDate());
store.dispatch(sortByAmount());

store.dispatch(setStartDate(-125000));
//store.dispatch(setStartDate());
store.dispatch(setEndDate(2000));
//store.dispatch(setEndDate());

const demoState = {
    expenses: [{
        id         : 'dsddd',
        description: 'January Rent',
        note       : 'This was the final payment',
        amount     : 54500,
        createdAt  : 0
    }],
    filters : {
        text     : 'rent',
        sortBy   : 'amount',// date or amount
        startdate: undefined,
        endDate  : undefined
    }
};


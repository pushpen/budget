
//Set Text filter
export const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

//Sort by Date
export const sortByDate = () => ({
    type: 'SORT_BY_DATE',
});

//Sort by Amount
export const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

//set Start date
export const setStartDate = (value = undefined) => ( {
    type: 'SET_START_DATE',
    value
});

//set end date
export const setEndDate = (value = undefined) => ( {
    type: 'SET_END_DATE',
    value
});
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  responseApi: false,
  cont: 0,
  expenditure: 0,
};

function calcExpenditure(state) {
  let total = 0;
  state.expenses.forEach((expense) => {
    const { value, currency, exchangeRates } = expense;
    total += parseFloat(value) * parseFloat(exchangeRates[currency].ask);
  });
  return total.toFixed(2);
}

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ALL_CURRENCY':
    return {
      ...state,
      currencies: action.currencies.filter((currency) => currency !== 'USDT'),
    };
  case 'API_OK':
    return {
      ...state,
      responseApi: true,
    };
  case 'ACTUAL_CURRENCY':
    return {
      ...state,
      expenses: [...state.expenses, action.expenditure],
      cont: state.expenses.length + 1,
    };
  case 'TOTAL':
    return {
      ...state,
      expenditure: calcExpenditure(state),
    };
  case 'DELETE':
    return {
      ...state,
      expenses: state.expenses
        .filter((expense) => expense.id !== parseFloat(action.delete)),
      cont: state.expenses.length - 1,
    };
  case 'EDITE':
    return {
      ...state,
      button: true,
    };
  default:
    return state;
  }
}

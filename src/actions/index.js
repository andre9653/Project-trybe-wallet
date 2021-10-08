import responseApi from '../service/data';

// Coloque aqui suas actions
const addValue = (type, value) => ({ type, email: value });
const addCurrency = (payload) => (
  { type: 'ALL_CURRENCY', currencies: Object.keys(payload) }
);
const responseApiOk = () => ({ type: 'API_OK' });
const expenditure = (payload) => ({ type: 'ACTUAL_CURRENCY', expenditure: payload });
const totalExpenditure = (payload) => ({ type: 'TOTAL', currency: payload });
const deleteExpense = (payload) => ({ type: 'DELETE', delete: payload });
const editExpense = () => ({ type: 'EDITE', button: true });

function fetchCurrency() {
  return async (dispatch) => {
    dispatch(responseApiOk());
    const response = await responseApi();
    return dispatch(addCurrency(response));
  };
}

export { addValue, fetchCurrency, expenditure,
  totalExpenditure, deleteExpense, editExpense };

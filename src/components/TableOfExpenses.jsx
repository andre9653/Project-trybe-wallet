import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LineOfTable from './LineOfTable';
import { deleteExpense, totalExpenditure } from '../actions';

const descriptionsHeader = [
  'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado',
  'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
const buttonDelete = (id, func) => (
  <button
    data-testid="delete-btn"
    type="button"
    onClick={ func }
    name={ id }
  >
    Del
  </button>);
const buttonEdite = (id, func) => (
  <button
    data-testid="edit-btn"
    type="button"
    onClick={ func }
    name={ id }
  >
    Edit
  </button>);
class TableOfExpenses extends React.Component {
  render() {
    const { expenses, dispatch } = this.props;
    const handleClick = (event) => {
      dispatch(deleteExpense(event.target.name));
      dispatch(totalExpenditure());
    };
    if (expenses.length > 0) {
      const descriptionExpenses = expenses.map((expense) => {
        const currencyActual = expense.exchangeRates[expense.currency];
        return { id: expense.id,
          info:
          [expense.description, expense.tag, expense.method, expense.value,
            currencyActual.name, parseFloat(currencyActual.ask).toFixed(2),
            parseFloat(currencyActual.ask) * parseFloat(expense.value) || 0,
            'Real', buttonEdite(expense.id, editClick), buttonDelete(expense.id, handleClick),
          ] };
      });
      return (
        <table>
          <thead>
            <LineOfTable textLine={ descriptionsHeader } typeTable="th" />
          </thead>
          <tfoot>
            {descriptionExpenses
              .map((descriptionExpense) => (<LineOfTable
                id={ descriptionExpense.id }
                key={ descriptionExpense.id }
                textLine={ descriptionExpense.info }
                typeTable="td"
              />))}
          </tfoot>
        </table>
      );
    }
    return (
      <table>
        <thead>
          <LineOfTable textLine={ descriptionsHeader } typeTable="th" />
        </thead>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });

export default connect(mapStateToProps, null)(TableOfExpenses);

TableOfExpenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dispatch: PropTypes.func.isRequired,
};

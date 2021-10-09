import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputForm from './InputForm';
import SelectForm from './SelectForm';
import responseApi from '../service/data';
import { expenditure, totalExpenditure } from '../actions';

const Button = styled.button`
  background-color: #0957ff;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  margin: 8px 0;
  padding: 5px;
  width: 15vw;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-left: 10px;
`;

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueExpense: '',
      descriptionExpense: '',
      currencyOption: 'USD',
      payTypeOption: 'Dinheiro',
      tagOption: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  handleClick() {
    const { currency, dispatch } = this.props;
    const { state } = this;
    const actualCurrency = {
      id: currency.cont,
      value: state.valueExpense,
      description: state.descriptionExpense,
      currency: state.currencyOption,
      method: state.payTypeOption,
      tag: state.tagOption,
    };
    responseApi()
      .then((response) => {
        dispatch(expenditure(
          { ...actualCurrency, exchangeRates: response },
        ));
        dispatch(totalExpenditure());
      });
  }

  // eslint-disable-next-line max-lines-per-function
  render() {
    const { valueExpense,
      descriptionExpense, currencyOption,
      tagOption, payTypeOption } = this.state;
    const payType = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const typeExpense = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { currency } = this.props;
    if (!currency.responseApi) return <h1>Loading</h1>;
    return (
      <Form>
        <InputForm
          labelText="Valor: "
          name="valueExpense"
          value={ valueExpense }
          handleChange={ this.handleChange }
        />
        <InputForm
          labelText="Descrição: "
          name="descriptionExpense"
          value={ descriptionExpense }
          handleChange={ this.handleChange }
        />
        <SelectForm
          options={ currency.currencies }
          name="currencyOption"
          value={ currencyOption }
          labelText="Moeda"
          id="currency"
          handleChange={ this.handleChange }
        />
        <SelectForm
          options={ payType }
          name="payTypeOption"
          value={ payTypeOption }
          labelText="Método de pagamento"
          id="payType"
          handleChange={ this.handleChange }
        />
        <SelectForm
          options={ typeExpense }
          name="tagOption"
          value={ tagOption }
          labelText="Tag"
          id="typeExpense"
          handleChange={ this.handleChange }
        />
        <Button type="button" onClick={ this.handleClick }>Adicionar despesa</Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.wallet,
});

export default connect(mapStateToProps, null)(ExpenseForm);

ExpenseForm.propTypes = {
  currency: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
};

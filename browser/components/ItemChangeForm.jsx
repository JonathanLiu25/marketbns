import React from "react";
import { connect } from "react-redux";

const initialState = {
  buyGold: 0,
  buySilver: 0,
  buyBronze: 0,
  cheapGold: 0,
  cheapSilver: 0,
  cheapBronze: 0,
  sellGold: 99999,
  sellSilver: 99,
  sellBronze: 99
};

class LocalContainer extends React.Component {
  constructor() {
    super();
    this.state = Object.assign({}, initialState);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const changedItem = {
      buy: this.state.buyGold * 10000 + this.state.buySilver * 100 + this.state.buyBronze,
      cheap: this.state.cheapGold * 10000 + this.state.cheapSilver * 100 + this.state.cheapBronze,
      sell: this.state.sellGold * 10000 + this.state.sellSilver * 100 + this.state.sellBronze
    };
    this.props.changeItem(changedItem);
    this.setState(initialState);
  }

  render() {
    return (
      <ItemChangeForm {...this.props} />
    );
  }
}

const ItemChangeForm = props => (
  <form className="item-price-form" onSubmit={props.handleSubmit}>
    <div className="form-group">
      <label>Buy price: </label>
      <input
        id="buyGold-field"
        className="input-price"
        name="buyGold"
        type="number"
        value={props.buyGold}
        onChange={props.handleChange} />
      <input
        id="buySilver-field"
        className="input-price"
        name="buySilver"
        type="number"
        value={props.buySilver}
        onChange={props.handleChange} />
      <input
        id="buyBronze-field"
        className="input-price"
        name="buyBronze"
        type="number"
        value={props.buyBronze}
        onChange={props.handleChange} />
    </div>
    <div className="form-group">
      <label>Cheap price: </label>
      <input
        id="cheapGold-field"
        className="input-price"
        name="cheapGold"
        type="number"
        value={props.cheapGold}
        onChange={props.handleChange} />
      <input
        id="cheapSilver-field"
        className="input-price"
        name="cheapSilver"
        type="number"
        value={props.cheapSilver}
        onChange={props.handleChange} />
      <input
        id="cheapBronze-field"
        className="input-price"
        name="cheapBronze"
        type="number"
        value={props.cheapBronze}
        onChange={props.handleChange} />
    </div>
    <div className="form-group">
      <label>Sell price: </label>
      <input
        id="sellGold-field"
        className="input-price"
        name="sellGold"
        type="number"
        value={props.sellGold}
        onChange={props.handleChange} />
      <input
        id="sellSilver-field"
        className="input-price"
        name="sellSilver"
        type="number"
        value={props.sellSilver}
        onChange={props.handleChange} />
      <input
        id="sellBronze-field"
        className="input-price"
        name="sellBronze"
        type="number"
        value={props.sellBronze}
        onChange={props.handleChange} />
    </div>
    <button type="submit">Update Item</button>
  </form>
);

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

const ItemChangeFormContainer = connect(mapStateToProps, mapDispatchToProps)(LocalContainer);

export default ItemChangeFormContainer;

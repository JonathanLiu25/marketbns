import React from "react";
import { connect } from "react-redux";
import { addItem, changeItem, deleteItem } from "../reducers/item.js";

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

    this.makeItem = this.makeItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item !== this.props.item && nextProps.item.length && nextProps.item[0].info.id) {
      const itemInfo = nextProps.item[0].info;
      const newPrice = {
        buyGold: Math.floor(itemInfo.buy / 10000),
        buySilver: Math.floor(itemInfo.buy / 100) % 100,
        buyBronze: itemInfo.buy % 100,
        cheapGold: Math.floor(itemInfo.cheap / 10000),
        cheapSilver: Math.floor(itemInfo.cheap / 100) % 100,
        cheapBronze: itemInfo.cheap % 100,
        sellGold: Math.floor(itemInfo.sell / 10000),
        sellSilver: Math.floor(itemInfo.sell / 100) % 100,
        sellBronze: itemInfo.sell % 100
      };
      this.setState(newPrice);
    }
  }

  makeItem() {
    return ({
      name: this.props.itemName,
      exact: String(this.props.exact),
      buy: this.state.buyGold * 10000 + this.state.buySilver * 100 + this.state.buyBronze,
      cheap: this.state.cheapGold * 10000 + this.state.cheapSilver * 100 + this.state.cheapBronze,
      sell: this.state.sellGold * 10000 + this.state.sellSilver * 100 + this.state.sellBronze
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (event.target.name === "add-item") this.props.addItem(this.makeItem());
    if (event.target.name === "update-item") this.props.changeItem(this.makeItem());
    if (event.target.name === "delete-item") this.props.deleteItem({ name: this.props.name, exact: String(this.props.exact) });
  }

  render() {
    return (
      <ItemChangeForm
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const ItemChangeForm = props => (
  <form className="item-price-form">
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
    <button name="add-item" type="submit" onClick={props.handleSubmit}>Add Item</button>
    <button name="update-item" type="submit" onClick={props.handleSubmit}>Update Item</button>
    <button name="delete-item" type="submit" onClick={props.handleSubmit}>Delete Item</button>
  </form>
);

const mapStateToProps = state => ({
  itemName: state.search.itemName,
  exact: state.search.exact,
  item: state.item.singleItem
});

const mapDispatchToProps = { addItem, changeItem, deleteItem };

const ItemChangeFormContainer = connect(mapStateToProps, mapDispatchToProps)(LocalContainer);

export default ItemChangeFormContainer;

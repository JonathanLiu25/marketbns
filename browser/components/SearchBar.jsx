import React from "react";
import { connect } from "react-redux";
import { addItem } from "../reducers/items.js";

class LocalContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      exact: false,
      buyGold: 0,
      buySilver: 0,
      buyBronze: 0,
      cheapGold: 0,
      cheapSilver: 0,
      cheapBronze: 0,
      sellGold: 999999,
      sellSilver: 99,
      sellBronze: 99,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = name === "exact" ? event.target.checked : event.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newItem = {
      name: this.state.name,
      exact: this.state.exact ? "1" : "0",
      buy: this.state.buyGold * 10000 + this.state.buySilver * 100 + this.state.buyBronze,
      cheap: this.state.cheapGold * 10000 + this.state.cheapSilver * 100 + this.state.cheapBronze,
      sell: this.state.sellGold * 10000 + this.state.sellSilver * 100 + this.state.sellBronze
    };
    this.props.addItem(newItem);
    this.setState({ name: "", exact: false, buyGold: 0, buySilver: 0, buyBronze: 0, cheapGold: 0, cheapSilver: 0, cheapBronze: 0, sellGold: 0, sellSilver: 0, sellBronze: 0 });
  }

  render() {
    return (
      <SearchBar
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const SearchBar = props => (
  <div className="search">
    <form className="search-form" onSubmit={props.handleSubmit}>
      <div className="form-group">
        <label>Item: </label>
        <input
          id="name-field"
          name="name"
          type="text"
          value={props.name}
          onChange={props.handleChange} />
      </div>
      <div className="form-group">
        <label>Exact: </label>
        <input
          id="exact-field"
          name="exact"
          type="checkbox"
          checked={props.exact}
          onChange={props.handleChange} />
        <button type="submit">Search</button>
      </div>
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
    </form>
  </div>
);

const mapDispatchToProps = { addItem };

const SearchBarContainer = connect(null, mapDispatchToProps)(LocalContainer);

export default SearchBarContainer;

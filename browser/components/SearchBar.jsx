import React from "react";
import { connect } from "react-redux";
import { addItem } from "../reducers/items.js";

class LocalContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      exact: false
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
      exact: this.state.exact ? "1" : "0"
    };
    this.props.addItem(newItem);
    this.setState({ name: "", exact: false });
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

const SearchBar = ({ name, exact, handleChange, handleSubmit }) => (
  <div className="search">
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>New Item: </label>
        <input
          id="name-field"
          name="name"
          type="text"
          value={name}
          onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Exact: </label>
        <input
          id="exact-field"
          name="exact"
          type="checkbox"
          checked={exact}
          onChange={handleChange} />
        <button type="submit">Search</button>
      </div>
    </form>
  </div>
);

const mapDispatchToProps = { addItem };

const SearchBarContainer = connect(null, mapDispatchToProps)(LocalContainer);

export default SearchBarContainer;

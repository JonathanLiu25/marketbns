import React from "react";
import { connect } from "react-redux";
import { setSearchItem, setExact, setNonExact } from "../reducers/search.js";
import { Typeahead } from "react-typeahead";
import allItems from "../../all_item_names.json";

class LocalContainer extends React.Component {
  constructor() {
    super();

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearch(name) {
    this.props.setSearchItem(name);
    this.props.setExact();

    this.props.history.push(`/${name}?exact=1`);
  }

  handleChange(event) {
    if (event.target.name === "exact") {
      if (this.props.exact) this.props.setNonExact();
      else this.props.setExact();
    } else {
      this.props.setSearchItem(event.target.value);
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.history.push(`/${this.props.itemName}?exact=1`);
  }

  render() {
    return (
      <SearchBar
        {...this.props}
        handleSearch={this.handleSearch}
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
        <Typeahead
          inputProps={{
            name: "name"
          }}
          minLength={2}
          maxVisible={5}
          value={props.itemName}
          options={allItems.items}
          onChange={props.handleChange}
          onOptionSelected={props.handleSearch} />
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
    </form >
  </div >
);

const mapStateToProps = state => ({
  itemName: state.search.itemName,
  exact: state.search.exact
});

const mapDispatchToProps = { setSearchItem, setExact, setNonExact };

const SearchBarContainer = connect(mapStateToProps, mapDispatchToProps)(LocalContainer);

export default SearchBarContainer;

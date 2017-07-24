import React from "react";
import { connect } from "react-redux";
import { setSearchItem, setExact, setNonExact } from "../reducers/search.js";
import AutoSuggest from "react-autosuggest";
import allItems from "../../all_items.json";

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : allItems.filter(item =>
    item.Name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionValue = suggestion => suggestion.Name;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.Name}
  </div>
);

class LocalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: []
    };

    this.handleOptionSelect = this.handleOptionSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSuggestions = this.handleSuggestions.bind(this);
    this.clearSuggestions = this.clearSuggestions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOptionSelect(name) {
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

  handleSuggestions({ value }) {
    this.setState({ suggestions: getSuggestions(value) });
  }

  clearSuggestions() {
    this.setState({ suggestions: [] });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.history.push(`/${this.props.itemName}?exact=1`);
  }

  render() {
    return (
      <SearchBar
        {...this.props}
        {...this.state}
        handleOptionSelect={this.handleOptionSelect}
        handleChange={this.handleChange}
        handleSuggestions={this.handleSuggestions}
        clearSuggestions={this.clearSuggestions}
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
        <AutoSuggest
          inputProps={{
            name: "name",
            value: props.itemName,
            onChange: props.handleChange
          }}
          suggestions={props.suggestions}
          onSuggestionsFetchRequested={props.handleSuggestions}
          onSuggestionsClearRequested={props.clearSuggestions}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion} />
        {/* <Typeahead
          inputProps={{
            name: "name",
            value: props.name
          }}
          minLength={2}
          maxVisible={5}
          options={allItems.items}
          onChange={props.handleChange}
          onOptionSelected={props.handleOptionSelect} /> */}
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

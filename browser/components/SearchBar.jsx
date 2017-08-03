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
    item.Name.toLowerCase().includes(inputValue)
  );
};

const getSuggestionValue = suggestion => suggestion.Name;

const renderSuggestion = suggestion => <span>{suggestion.Name}</span>;

const shouldRenderSuggestions = value => value.trim().length >= 3; // at least 3 characters to render

class LocalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: []
    };

    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleExactCheckbox = this.handleExactCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onSuggestionsFetchRequested({ value }) {
    this.setState({ suggestions: getSuggestions(value) });
  }

  onSuggestionsClearRequested() {
    this.setState({ suggestions: [] });
  }

  handleChange(event, { newValue }) {
    this.props.setSearchItem(newValue);
  }

  handleExactCheckbox() {
    if (this.props.exact) this.props.setNonExact();
    else this.props.setExact();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.history.push(`/${this.props.itemName}?exact=${this.props.exact}`);
  }

  render() {
    return (
      <SearchBar
        {...this.props}
        {...this.state}
        handleChange={this.handleChange}
        handleExactCheckbox={this.handleExactCheckbox}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const SearchBar = props => (
  <div className="search">
    <form className="search-form" onSubmit={props.handleSubmit}>
      <div className="form-group">
        {/* see https://github.com/moroshko/react-autosuggest for props*/}
        <AutoSuggest
          suggestions={props.suggestions}
          onSuggestionsFetchRequested={props.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={props.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={{
            name: "name",
            value: props.itemName,
            placeholder: "Search",
            onChange: props.handleChange
          }}
          shouldRenderSuggestions={shouldRenderSuggestions}
        />
      </div>
      <div className="form-group">
        <label>Exact: </label>
        <input
          id="exact-field"
          name="exact"
          type="checkbox"
          checked={props.exact}
          onChange={props.handleExactCheckbox} />
      </div>
      <button type="submit">Search</button>
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

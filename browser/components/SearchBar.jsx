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

class LocalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      suggestions: []
    };

    this.handleSuggestionSelect = this.handleSuggestionSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleExactCheckbox = this.handleExactCheckbox.bind(this);
    this.handleSuggestions = this.handleSuggestions.bind(this);
    this.clearSuggestions = this.clearSuggestions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.itemName !== this.state.name && this.state.name === "") this.setState({ name: nextProps.itemName });
  }

  handleSuggestionSelect(event) {
    this.props.setSearchItem(event.target.value);
    this.props.setExact();
    console.log(event.target.value);
    this.props.history.push(`/${event.target.value}?exact=1`);
  }

  handleChange(event, { newValue }) {
    this.setState({ name: newValue });
  }

  handleExactCheckbox() {
    if (this.props.exact) this.props.setNonExact();
    else this.props.setExact();
  }

  handleSuggestions({ value }) {
    this.setState({ suggestions: getSuggestions(value) });
  }

  clearSuggestions() {
    this.setState({ suggestions: [] });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.setSearchItem(this.state.name);

    this.props.history.push(`/${this.props.itemName}?exact=${this.props.exact}`);
  }

  render() {
    return (
      <SearchBar
        {...this.props}
        {...this.state}
        handleSuggestionSelect={this.handleSuggestionSelect}
        handleChange={this.handleChange}
        handleExactCheckbox={this.handleExactCheckbox}
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
            value: props.name,
            onChange: props.handleChange
          }}
          suggestions={props.suggestions}
          onSuggestionsFetchRequested={props.handleSuggestions}
          onSuggestionsClearRequested={props.clearSuggestions}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion} />
      </div>
      <div className="form-group">
        <label>Exact: </label>
        <input
          id="exact-field"
          name="exact"
          type="checkbox"
          checked={props.exact}
          onChange={props.handleExactCheckbox} />
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

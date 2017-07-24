import React from "react";
import { connect } from "react-redux";
import Loading from "./Loading.jsx";
import ItemBody from "./ItemBody.jsx";
import ItemChangeForm from "./ItemChangeForm.jsx";
import { getItem, addItem, changeItem, deleteItem } from "../reducers/item";
import { setSearchItem, setExact } from "../reducers/search.js";

class LocalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.match.params.name
    };
  }

  componentDidMount() {
    this.props.setSearchItem(this.state.name);
    const exactSearch = this.props.location.search;
    if (exactSearch && exactSearch.indexOf("?exact=") !== -1) {
      this.props.setExact();
      this.props.getItem(this.state.name, 1);
    } else {
      this.props.getItem(this.state.name, 0);
    }
  }

  componentWillReceiveProps(nextProps) {
    const name = nextProps.match.params.name;
    if (name !== this.state.name) {
      this.props.getItem(name, this.props.exact);
      this.setState({ name });
    }
  }

  render() {
    return (
      <SingleItem singleItem={this.props.item.singleItem} loading={this.props.item.loading} />
    );
  }
}

const SingleItem = props => (
  <div className="items">
    <ItemChangeForm />
    <table id="listMarket" className="listMarket">
      {
        props.singleItem.length && !props.loading
          ?
          <ItemBody items={props.singleItem} showAll />
          :
          <Loading />
      }
    </table>
  </div>
);

const mapStateToProps = state => ({
  item: state.item,
  exact: state.search.exact
});

const mapDispatchToProps = { getItem, addItem, changeItem, deleteItem, setSearchItem, setExact };

const SingleItemContainer = connect(mapStateToProps, mapDispatchToProps)(LocalContainer);

export default SingleItemContainer;

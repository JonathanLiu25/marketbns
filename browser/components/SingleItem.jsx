import React from "react";
import { connect } from "react-redux";
import Loading from "./Loading.jsx";
import ItemBody from "./ItemBody.jsx";
import ItemChangeForm from "./ItemChangeForm.jsx";
import { getItem, addItem, changeItem, deleteItem } from "../reducers/item.js";
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
    const exactQueryIndex = exactSearch.indexOf("?exact=");
    if (exactQueryIndex !== -1 && exactSearch[exactQueryIndex + 7] === "1") {
      this.props.setExact();
      this.props.getItem(this.state.name, 1);
    } else {
      this.props.getItem(this.state.name, 0);
    }
  }

  componentWillReceiveProps(nextProps) {
    const name = nextProps.match.params.name;
    if (name !== this.state.name || nextProps.exact !== this.props.exact) {
      this.props.getItem(name, nextProps.exact);
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
    <div id="listMarket" className="listMarket">
      {
        props.singleItem.length && !props.loading
          ?
          <ItemBody items={props.singleItem} showAll />
          :
          <Loading />
      }
    </div>
  </div>
);

const mapStateToProps = state => ({
  item: state.item,
  exact: state.search.exact
});

const mapDispatchToProps = { getItem, addItem, changeItem, deleteItem, setSearchItem, setExact };

const SingleItemContainer = connect(mapStateToProps, mapDispatchToProps)(LocalContainer);

export default SingleItemContainer;

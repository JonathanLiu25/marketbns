import React from "react";
import { connect } from "react-redux";
import Loading from "./Loading.jsx";
import ItemBody from "./ItemBody.jsx";
import { getItems, stopItemsRequest } from "../reducers/items.js";
import { setSearchItem, setNonExact } from "../reducers/search.js";

class LocalContainer extends React.Component {
  componentDidMount() {
    this.props.getItems();
    this.props.setSearchItem("");
    this.props.setNonExact();
  }

  componentWillUnmount() {
    this.props.stopItemsRequest();
  }

  render() {
    return (
      <Home allItems={this.props.items.allItems} />
    );
  }
}

const Home = props => (
  <div className="items">
    <div id="listMarket" className="listMarket">
      {
        props.allItems.length
          ?
          props.allItems.map((items, itemIdx) => <ItemBody items={items} key={`item-body-${itemIdx}`} />)
          :
          <Loading />
      }
    </div>
  </div>
);

const mapStateToProps = state => ({ items: state.items });

const mapDispatchToProps = { getItems, stopItemsRequest, setSearchItem, setNonExact };

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(LocalContainer);

export default HomeContainer;

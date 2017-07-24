import React from "react";
import { connect } from "react-redux";
import Loading from "./Loading";
import ItemBody from "./ItemBody";
import { getItems, stopItemsRequest } from "../reducers/items";

class LocalContainer extends React.Component {
  componentDidMount() {
    this.props.getItems();
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
    <table id="listMarket" className="listMarket">
      {
        props.allItems.length
          ?
          props.allItems.map((items, itemIdx) => <ItemBody items={items} key={`item-body-${itemIdx}`} />)
          :
          <Loading />
      }
    </table>
  </div>
);

const mapStateToProps = state => ({ items: state.items });

const mapDispatchToProps = { getItems, stopItemsRequest };

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(LocalContainer);

export default HomeContainer;

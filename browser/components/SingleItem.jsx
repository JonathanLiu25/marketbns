import React from "react";
import { connect } from "react-redux";
import Loading from "./Loading.jsx";
import ItemBody from "./ItemBody.jsx";
import ItemChangeForm from "./ItemChangeForm.jsx";
import { getItem, addItem, changeItem, deleteItem } from "../reducers/item";

class LocalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.match.params.name
    };
  }

  componentDidMount() {
    this.props.getItem(this.state.name, this.props.exact);
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

const mapStateToProps = state => ({ item: state.item, exact: state.search.exact });

const mapDispatchToProps = { getItem, addItem, changeItem, deleteItem };

const SingleItemContainer = connect(mapStateToProps, mapDispatchToProps)(LocalContainer);

export default SingleItemContainer;

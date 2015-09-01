/**
 * Created by twi18192 on 01/09/15.
 */

var React = require('react');
var sidePaneStore = require('../stores/sidePaneStore');
var sidePaneActions = require('../actions/sidePaneActions');

function getDropdownState(){
  return{
    listVisible: sidePaneStore.getDropdownState()
  }
}


var Dropdown = React.createClass({

  getInitialState: function() {
    return {
      listVisible: sidePaneStore.getDropdownState()
    };
  },

  _onChange: function(){
    this.setState(getDropdownState())
  },

  handleActionShow: function(){
    sidePaneActions.dropdownMenuShow("this is the item")
  },

  componentDidMount: function(){
    sidePaneStore.addChangeListener(this._onChange)
  },

  componentWillUnmount: function(){
    sidePaneStore.removeChangeListener(this._onChange)
  },

  select: function(item) {
    this.props.selected = item;
    var findTheIndex = this.props.list.indexOf(item);
    this.props.changeTab(findTheIndex)
  },

  show: function() {
    this.setState({ listVisible: true });
    document.addEventListener("click", this.hide);
  },

  hide: function() {
    this.setState({ listVisible: false });
    document.removeEventListener("click", this.hide);
  },

  renderListItems: function() {
    var items = [];
    for (var i = 0; i < this.props.list.length; i++) {
      var item = this.props.list[i];
      items.push(<div onClick={this.select.bind(null, item)}>
        <span >{item}</span>
      </div>);
    }

    return items;
  },

  render: function(){

    var props = React.addons.update({}, {$merge: {}}),
      keys = Object.keys(this.props);

    for (var i = keys.length; --i >= 0;) {
      if (["children"].indexOf(keys[i]) != -1) continue;
      props[keys[i]] = this.props[keys[i]];
    }
    return <div className={"dropdown-container" + (this.state.listVisible ? " show" : "")}>
      <div className={"dropdown-display" + (this.state.listVisible ? " clicked": "")} onClick={this.handleActionShow}>
        <span ></span>
        <i className="fa fa-angle-down"></i>
      </div>
      <div className="dropdown-list">
        <div>
          {this.renderListItems()}
        </div>
      </div>
    </div>;

  }
});

module.exports = Dropdown;

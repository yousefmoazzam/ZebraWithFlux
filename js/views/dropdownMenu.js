/**
 * Created by twi18192 on 01/09/15.
 */

var React = require('react');
var sidePaneStore = require('../stores/sidePaneStore');
var sidePaneActions = require('../actions/sidePaneActions');

function getDropdownState(){
  return{
    listVisible: sidePaneStore.getDropdownState(),
    tabState: sidePaneStore.getTabState(),
    selectedTabIndex: sidePaneStore.getSelectedTabIndex()
  }
}


var Dropdown = React.createClass({

  getInitialState: function() {
    return {
      listVisible: sidePaneStore.getDropdownState(),
      tabState: sidePaneStore.getTabState(),
      selectedTabIndex: sidePaneStore.getSelectedTabIndex()
    };
  },

  _onChange: function(){
    this.setState(getDropdownState())
  },

  handleActionShow: function(){
    sidePaneActions.dropdownMenuShow("this is the item")
  },

  handleActionHide: function(){
    sidePaneActions.dropdownMenuHide("this is the item")
  },

  //handleActionDropdownSelect: function(item){
  //  sidePaneActions.dropdownMenuSelect(item);
  //  this.props.changeTab(this.state.selectedTabIndex);
  //  //this.handleActionReactPanelSelect()
  //},
  //
  //handleActionReactPanelSelect: function(){
  //  sidePaneActions.reactPanelSelect("this is the item")
  //},

  componentDidMount: function(){
    sidePaneStore.addChangeListener(this._onChange)
  },

  componentWillUnmount: function(){
    sidePaneStore.removeChangeListener(this._onChange)
  },

  select: function(item) {
    var test = item;
    var findTheIndex = this.props.list.indexOf(item);
    this.props.changeTab(findTheIndex)
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


    return <div className={"dropdown-container" + (this.state.listVisible ? " handleActionShow" : "")}>
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

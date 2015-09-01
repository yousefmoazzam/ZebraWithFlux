/**
 * Created by twi18192 on 01/09/15.
 */

var React = require('react');
var ReactPanels = require('react-panels');
var sidePaneStore = require('../stores/sidePaneStore');
var sidePaneActions = require('../actions/sidePaneActions');

var Panel = ReactPanels.Panel;
var Tab = ReactPanels.Tab;
var Toolbar = ReactPanels.Toolbar;
var Content = ReactPanels.Content;
var Footer = ReactPanels.Footer;
var ToggleButton = ReactPanels.ToggleButton;
var Button = ReactPanels.Button;

function getSidePaneState(){
  return{
    tabState: sidePaneStore.getTabState()
  }
}

var SidePane = React.createClass({

  getInitialState: function(){
    return{
      tabState: sidePaneStore.getTabState()
    }
  },

  _onChange: function(){
    this.setState(getSidePaneState())
  },

  handleActionAddTab: function(){
    sidePaneActions.addTab("this is the item"); /* this is what the plus button should invoke when clicked */
  },

  handleActionRemoveTab: function(){
    var selectedIndex = this.refs.panel.getSelectedIndex();
    sidePaneActions.removeTab(selectedIndex);
  },

  componentDidMount: function(){
    sidePaneStore.addChangeListener(this._onChange)
  },

  componentWillUnmount: function(){
    sidePaneStore.removeChangeListener(this._onChange)
  },

  dropDownChange:function(findTheIndex) {
    this.refs.panel.setSelectedIndex(findTheIndex, null)
  },

  render: function () {
    var skin = this.props.skin || "default",
      globals = this.props.globals || {};
    var tabs = this.state.tabState.map(function(item, i) {
      var tabTitle = "Tab " + item;
      var tabIndex = i + 1;
      return (
        <Tab key={item} title={tabTitle}>

          <Content>Content of {tabTitle} <br/> Tab number {tabIndex}
          </Content>

        </Tab>
      );
    }.bind(this));
    return (
      <Panel ref="panel" theme="flexbox" skin={skin} useAvailableHeight={true} globals={globals} buttons={[

          <Button title="Add another tab" onButtonClick={this.handleActionAddTab}>
            <i className="fa fa-plus"></i>
          </Button>,
          <Button title="Remove active tab" onButtonClick={this.handleActionRemoveTab}>
            <i className="fa fa-times"></i>
          </Button>,
          <Button title="Drop down menu">
          <div id="dropDown"></div>
          </Button>
        ]}>
        {tabs}
      </Panel>
    );
  }
});

module.exports = SidePane;

/**
 * Created by twi18192 on 25/08/15.
 */

var React = require('react');
var ReactPanels = require('react-panels');
var mainPaneStore = require('../stores/mainPaneStore');
var mainPaneActions = require('../actions/mainPaneActions');
var ConfigButton = require('./configButton');
var FavButton = require('./favButton');



var Panel = ReactPanels.Panel;
var Tab = ReactPanels.Tab;
var Toolbar = ReactPanels.Toolbar;
var Content = ReactPanels.Content;
var Footer = ReactPanels.Footer;
var ToggleButton = ReactPanels.ToggleButton;
var Button = ReactPanels.Button;

function getMainPaneState(){
  return {
    footers: mainPaneStore.getFooterState(),
    configPanelOpen: mainPaneStore.getConfigPanelState()
  }
}

var MainPane = React.createClass({

  getInitialState: function(){
    return {
      footers: mainPaneStore.getFooterState(),
      configPanelOpen: mainPaneStore.getConfigPanelState()
    }
  },

  _onChange: function(){
    this.setState(getMainPaneState())
  },

  handleActionFooterToggle: function(){     /* this is what the footer toggle button needs to call when clicked!!*/
    mainPaneActions.toggleFooter1("this is the item")
  },

  componentDidMount: function(){
    mainPaneStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    mainPaneStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return(
      <Panel theme="flexbox" useAvailableHeight={true} buttons={[
          <ToggleButton title="Toggle Footer" onChange={this.handleActionFooterToggle}>
            <i className="fa fa-wrench"></i>
          </ToggleButton>
        ]}>
        <Tab title="View" showFooter={this.state.footers}>
          <Content>Content of View Tab


          </Content>

          <Footer><div id="blockDock">
            <div id="buttonContainer">
              <FavButton/>
              <ConfigButton/>
            </div>
          </div>
          </Footer>
        </Tab>

        <Tab title="Design" showFooter={this.state.footers}>
          <Content>Secondary main view - graph of position data <br/>
            Contains a graph of the current position data, also has some buttons at the bottom to launch subscreens <br/>
            Config panel is {this.state.configPanelOpen ? 'open' : 'closed'}
          </Content>
          <Footer><div id="blockDock">
            <div id="buttonContainer">
              <FavButton/>
              <ConfigButton/>
            </div>
          </div>
          </Footer>
        </Tab>
      </Panel>
    )
  }
});

module.exports = MainPane;

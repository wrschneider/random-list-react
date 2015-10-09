var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var _if = function _if(cond, x, y) {
    if (cond) {
        return x;
    } else {
        return y;
    }
};

var RandomList = React.createClass({
  getInitialState: function() {
    return { list: ['asdf', 'zxcv'], currentItem: '' };
  },
  
  addItem: function(event) {
    var list = this.state.list;
    list.push(this.refs.newItem.getDOMNode().value);
    this.refs.newItem.getDOMNode().value = '';
    this.setState({list: list});
  },
  
  hasItems: function() {
    return this.state.list && this.state.list.length > 0;
  },
  
  pickOne: function() {
    var i;
    if (!this.state.list) {
        return;
    }
    i = Math.floor(Math.random()*this.state.list.length);
    this.setState({currentItem: this.state.list[i]});
    console.log('picked ' + this.state.currentItem);
  },
  
  deleteItem: function(i) {
    var list = this.state.list;
    list.splice(i, 1);
    this.setState({list: list});
  },

  render: function() {
    return (
      <div>
        {_if(!this.hasItems(), 
            <div>No items defined</div>,
            <ul>
            {this.state.list.map(function(item, i) {
                    return <li>{item}  <a href="#" onClick={this.deleteItem.bind(null, i)}>Delete</a> </li>
                }, this)
            }
            </ul>
        )}
        <input ref="newItem" size="10" placeholder="enter new item" defaultValue=''></input>
        <button onClick={this.addItem}>Add Item</button>
        <br/>
        {_if(this.hasItems(), 
            <a href="#" onClick={this.pickOne}>Pick one</a>
        )}
        <ReactCSSTransitionGroup transitionName="example">
        {_if(this.state.currentItem, 
            <div key="foo">
            You have picked <ReactCSSTransitionGroup transitionName="example"><strong key={new Date().getTime()}>{this.state.currentItem}</strong></ReactCSSTransitionGroup> from the list.
            </div>
        )}
        </ReactCSSTransitionGroup> 
      </div>
    );
  }
});

React.render(
  <RandomList />,
  document.getElementById('container')
);

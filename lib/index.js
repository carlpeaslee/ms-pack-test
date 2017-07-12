'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var store = exports.store = (0, _redux.createStore)(reducer, loadState());
store.subscribe(function () {
  saveState(store.getState());
});

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      console.log(this);
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h3',
          null,
          'Hi this is baby! ',
          this.props.counter
        ),
        _react2.default.createElement(
          'button',
          {
            onClick: function onClick() {
              return store.dispatch({ type: "INCREMENT" });
            }
          },
          'Increment'
        ),
        _react2.default.createElement(
          'button',
          {
            onClick: function onClick() {
              return store.dispatch({ type: "DECREMENT" });
            }
          },
          'Decrement'
        )
      );
    }
  }]);

  return App;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    counter: state.counter
  };
};

App = (0, _reactRedux.connect)(mapStateToProps)(App);

exports.default = App;


function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { counter: 0 };
  var action = arguments[1];

  switch (action.type) {
    case 'INCREMENT':
      return {
        counter: state.counter + 1
      };
    case 'DECREMENT':
      return {
        counter: state.counter - 1
      };
    default:
      return state;
  }
}

function loadState() {
  try {
    var stringState = localStorage.getItem('state');
    if (stringState === null) {
      return undefined;
    }
    return JSON.parse(stringState);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

function saveState(state) {
  try {
    var stringState = JSON.stringify(state);
    localStorage.setItem("state", stringState);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

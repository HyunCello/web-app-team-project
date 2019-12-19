var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Result = function (_React$Component) {
  _inherits(Result, _React$Component);

  function Result(props) {
    _classCallCheck(this, Result);

    var _this = _possibleConstructorReturn(this, (Result.__proto__ || Object.getPrototypeOf(Result)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Result, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "result" },
        React.createElement(
          "h3",
          null,
          this.props.title
        ),
        React.createElement(
          "h4",
          null,
          "code"
        ),
        React.createElement(
          "div",
          { className: "result-box" },
          React.createElement(
            "div",
            { className: "code" },
            this.props.code
          )
        ),
        React.createElement(
          "h4",
          null,
          "text"
        ),
        React.createElement(
          "div",
          { className: "result-box" },
          React.createElement(
            "div",
            { className: "text" },
            this.props.text
          )
        )
      );
    }
  }]);

  return Result;
}(React.Component);

var App = function (_React$Component2) {
  _inherits(App, _React$Component2);

  function App(props) {
    _classCallCheck(this, App);

    var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this2.onFocus = function () {
      document.getElementById('main').style.visibility = 'hidden';
      // document.getElementById('tab').style.visibility = 'hidden'
    };

    _this2.onBlur = function () {
      document.getElementById('main').style.visibility = 'visible';
      // document.getElementById('tab').style.visibility = 'visible'
    };

    _this2.searchKeyword = function () {
      var keyword = document.getElementsByClassName('keyword').item(0).value;
      console.log(keyword);
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://35.206.218.100:5000/api?msg=' + keyword);
      xhr.onload = function () {
        if (xhr.status === 200) {
          var parseElement = JSON.parse(xhr.responseText)['data'];
          console.log(parseElement);
          _this2.setState({
            data: parseElement
          });
        } else {
          console.log(xhr.statusText);
        }
      };
      xhr.onerror = function () {
        console.log(xhr.statusText);
      };
      xhr.send();

      // console.log(document.getElementsByClassName('keyword').item(0));
    };

    _this2.ret = function () {
      return React.createElement(
        "form",
        null,
        React.createElement("input", { className: 'keyword', onFocus: _this2.onFocus, onBlur: _this2.onBlur, onChange: _this2.searchKeyword }),
        React.createElement(
          "button",
          { onClick: _this2.searchKeyword },
          "search"
        ),
        React.createElement(Result, { title: "title", code: "code", text: "text" }),
        React.createElement(
          "h1",
          null,
          "Hi"
        )
      );
    };

    _this2.state = {
      liked: false,
      data: null
    };
    return _this2;
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      if (this.state.data) {
        return React.createElement(
          "div",
          null,
          React.createElement("input", { className: 'keyword', onFocus: this.onFocus, onBlur: this.onBlur, onChange: this.searchKeyword }),
          this.state.data.map(function (value) {
            var title = value['title'][0];
            var text = value['text'][0];
            var code = value['code'][0];

            return React.createElement(Result, { title: title, text: text, code: code });
          })
        );
      }
      return React.createElement(
        "form",
        null,
        React.createElement("input", { className: 'keyword', onFocus: this.onFocus, onBlur: this.onBlur, onChange: this.searchKeyword })
      );
    }
  }]);

  return App;
}(React.Component);

var search_bar = document.getElementById('search-bar');

ReactDOM.render(React.createElement(App, null), search_bar);
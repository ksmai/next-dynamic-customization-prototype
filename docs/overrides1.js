var components = (function (Card, CardActions, CardContent, Button, Typography, react, styled) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Card__default = /*#__PURE__*/_interopDefaultLegacy(Card);
    var CardActions__default = /*#__PURE__*/_interopDefaultLegacy(CardActions);
    var CardContent__default = /*#__PURE__*/_interopDefaultLegacy(CardContent);
    var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
    var Typography__default = /*#__PURE__*/_interopDefaultLegacy(Typography);
    var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

    var ExampleOverride = function ExampleOverride(props) {
      return /*#__PURE__*/React.createElement("p", {
        style: {
          color: props.data.color
        }
      }, "This is ExampleOverride component: ", props.data.text);
    };

    function _taggedTemplateLiteral(strings, raw) {
      if (!raw) {
        raw = strings.slice(0);
      }

      return Object.freeze(Object.defineProperties(strings, {
        raw: {
          value: Object.freeze(raw)
        }
      }));
    }

    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }

    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }

    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;

      var _s, _e;

      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }

    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;

      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

      return arr2;
    }

    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var _templateObject;
    var MyStyledComponent = styled__default["default"].h5(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    color: ", ";\n"])), function (props) {
      return props.color;
    });

    var ExampleWithMui = function ExampleWithMui(_ref) {
      var data = _ref.data,
          actions = _ref.actions;

      var _useState = react.useState(data.count),
          _useState2 = _slicedToArray(_useState, 2),
          count = _useState2[0],
          setCount = _useState2[1];

      return /*#__PURE__*/React.createElement(Card__default["default"], {
        sx: {
          minWidth: 275
        }
      }, /*#__PURE__*/React.createElement(CardContent__default["default"], null, /*#__PURE__*/React.createElement(MyStyledComponent, {
        color: data.color
      }, data.title), /*#__PURE__*/React.createElement(Typography__default["default"], {
        variant: "body2"
      }, data.description)), /*#__PURE__*/React.createElement(CardActions__default["default"], null, /*#__PURE__*/React.createElement(Button__default["default"], {
        size: "small",
        onClick: actions.action2
      }, "Trigger action2"), /*#__PURE__*/React.createElement(Button__default["default"], {
        size: "small",
        onClick: function onClick() {
          return setCount(function (c) {
            return c + 1;
          });
        }
      }, "increment me! ", count)));
    };

    var Component3 = function Component3() {
      return /*#__PURE__*/React.createElement("div", null, "Your Component3 is overriden");
    };

    var index = {
      ExampleOverride: ExampleOverride,
      ExampleWithMui: ExampleWithMui,
      Component3: Component3
    };

    return index;

})(Card, CardActions, CardContent, Button, Typography, React, styled);

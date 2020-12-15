"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var withCustomStyle = function (overwriteProps) { return function (Component) { return function (props) { return (<Component {...props} {...overwriteProps}/>); }; }; };
exports.default = withCustomStyle;

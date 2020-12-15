"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var styles_1 = require("./styles");
var BackgroundContainer = function (_a) {
    var style = _a.style;
    return (<react_native_1.View style={styles_1.default.backgroundOverlay}>
    <react_native_1.View style={[styles_1.default.roundedBackground, style]}/>
  </react_native_1.View>);
};
exports.default = BackgroundContainer;

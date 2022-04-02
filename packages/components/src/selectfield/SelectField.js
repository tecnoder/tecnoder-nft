"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectField = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_select_1 = __importDefault(require("react-select"));
const utility_1 = require("../utility");
const SelectField = (_a) => {
    var { wrapperClass, name, options, label, optionText, optionValue, errors } = _a, rest = __rest(_a, ["wrapperClass", "name", "options", "label", "optionText", "optionValue", "errors"]);
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `grid-row column ${wrapperClass}` }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mb-05" }, { children: label }), void 0), (0, jsx_runtime_1.jsx)(react_select_1.default, Object.assign({ name: name || "colors", options: options, className: ((0, utility_1.isErrorExists)(errors) && (name in errors) ? 'basic-multi-select error-field' : 'basic-multi-select'), classNamePrefix: "select" }, rest), void 0), (0, utility_1.isErrorExists)(errors) &&
                (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "error-field-desc" }, { children: name in errors && errors[name][0] }), void 0)] }), void 0));
};
exports.SelectField = SelectField;
exports.default = exports.SelectField;
//# sourceMappingURL=SelectField.js.map
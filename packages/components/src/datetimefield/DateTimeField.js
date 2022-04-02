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
exports.DateTimeField = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_datepicker_1 = __importDefault(require("react-datepicker"));
require("react-datepicker/dist/react-datepicker.css");
const utility_1 = require("../utility");
const DateTimeField = (_a) => {
    var { wrapperClass, onChange, name, errors, label } = _a, rest = __rest(_a, ["wrapperClass", "onChange", "name", "errors", "label"]);
    const handleChange = (date) => {
        if (date) {
            onChange(date);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `grid-row column ${wrapperClass}` }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mb-05" }, { children: label }), void 0), (0, jsx_runtime_1.jsx)(react_datepicker_1.default, Object.assign({ className: (errors != undefined && errors != null && Object.keys(errors).length > 0 && (name in errors) ? 'error-field' : ''), onChange: date => handleChange(date) }, rest), void 0), (0, utility_1.isErrorExists)(errors) &&
                (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "error-field-desc" }, { children: name in errors && errors[name][0] }), void 0)] }), void 0));
};
exports.DateTimeField = DateTimeField;
exports.default = exports.DateTimeField;
//# sourceMappingURL=DateTimeField.js.map
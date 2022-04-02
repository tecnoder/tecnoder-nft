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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextareaField = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const utility_1 = require("../utility");
const TextareaField = (_a) => {
    var { wrapperClass, name, label, errors, defaultValue } = _a, rest = __rest(_a, ["wrapperClass", "name", "label", "errors", "defaultValue"]);
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `grid-row column ${wrapperClass}` }, { children: [label && (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mb-05" }, { children: label }), void 0), (0, jsx_runtime_1.jsx)("textarea", Object.assign({ name: name, rows: 5 }, rest, { className: (errors != undefined && errors != null && Object.keys(errors).length > 0 && (name in errors) ? 'error-field' : '') }), void 0), (0, utility_1.isErrorExists)(errors) &&
                (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "error-field-desc" }, { children: name in errors && errors[name][0] }), void 0)] }), void 0));
};
exports.TextareaField = TextareaField;
exports.TextareaField.defaultProps = {
    defaultValue: ""
};
exports.default = exports.TextareaField;
//# sourceMappingURL=TextareaField.js.map
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
exports.InputField = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const utility_1 = require("./utility");
const InputField = (_a) => {
    var { wrapperClass, type, name, label, errors } = _a, rest = __rest(_a, ["wrapperClass", "type", "name", "label", "errors"]);
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `grid-row row-grid column ${wrapperClass}` }, { children: [label && (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mb-05" }, { children: label }), void 0), (0, jsx_runtime_1.jsx)("input", Object.assign({ type: type, name: name }, rest, { className: (errors != undefined && errors != null && Object.keys(errors).length > 0 && (name in errors) ? 'error-field' : '') }), void 0), (0, utility_1.isErrorExists)(errors) &&
                (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "error-field-desc" }, { children: name in errors && errors[name][0] }), void 0)] }), void 0));
};
exports.InputField = InputField;
exports.InputField.defaultProps = {
    type: "text"
};
exports.default = exports.InputField;
//# sourceMappingURL=InputField.js.map
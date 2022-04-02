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
exports.CheckboxField = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const CheckboxField = (_a) => {
    var { id, type, name } = _a, rest = __rest(_a, ["id", "type", "name"]);
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `round` }, { children: [(0, jsx_runtime_1.jsx)("input", Object.assign({ id: id, type: "checkbox", name: name }, rest), void 0), (0, jsx_runtime_1.jsx)("label", { htmlFor: id }, void 0)] }), void 0));
};
exports.CheckboxField = CheckboxField;
exports.default = exports.CheckboxField;
//# sourceMappingURL=CheckboxField.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordTipsItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const PasswordTipsItem = ({ label, meetsReq }) => {
    const setClass = () => {
        const classArr = ["tips-text"];
        if (meetsReq)
            classArr.push('works-out');
        return classArr.join(' ');
    };
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "tips-item" }, { children: (0, jsx_runtime_1.jsx)("li", Object.assign({ className: setClass() }, { children: label }), void 0) }), void 0));
};
exports.PasswordTipsItem = PasswordTipsItem;
exports.default = exports.PasswordTipsItem;
//# sourceMappingURL=index.js.map
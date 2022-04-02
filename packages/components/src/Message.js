"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const Message = ({ type, message }) => {
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${`mcr_message`} ${type}` }, { children: [type === "error" && (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "mr-05" }, { children: (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faExclamationTriangle }, void 0) }), void 0), (0, jsx_runtime_1.jsx)("span", { children: message }, void 0)] }), void 0));
};
exports.Message = Message;
exports.default = exports.Message;
//# sourceMappingURL=Message.js.map
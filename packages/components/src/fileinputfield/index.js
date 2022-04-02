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
exports.FileInputField = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const bs_1 = require("react-icons/bs");
const io5_1 = require("react-icons/io5");
const utility_1 = require("../utility");
const FileInputField = (_a) => {
    var { wrapperClass, id, name, type, label, errors, value, onChange, fileType } = _a, rest = __rest(_a, ["wrapperClass", "id", "name", "type", "label", "errors", "value", "onChange", "fileType"]);
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${wrapperClass}` }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: `grid-row column ${`custom_input`} ${(0, utility_1.isErrorExists)(errors) && (name in errors) ? 'error-field' : ''}` }, { children: value
                    ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [fileType === 'VIDEO' ? ((0, jsx_runtime_1.jsxs)("video", Object.assign({ title: label, width: "100%", height: "100%", poster: URL.createObjectURL(value), controls: true, controlsList: "nodownload" }, { children: [(0, jsx_runtime_1.jsx)("source", { src: URL.createObjectURL(value), type: "video/mp4" }, void 0), "Your browser does not support the video tag."] }), void 0))
                                :
                                    (fileType === 'AUDIO' ? ((0, jsx_runtime_1.jsxs)("audio", Object.assign({ title: label, controls: true, controlsList: "nodownload" }, { children: [(0, jsx_runtime_1.jsx)("source", { src: URL.createObjectURL(value), type: "audio/mpeg" }, void 0), "Your browser does not support the audio element."] }), void 0))
                                        :
                                            ((typeof value === 'string') ?
                                                (0, jsx_runtime_1.jsx)("img", { alt: label, src: value }, void 0) :
                                                (0, jsx_runtime_1.jsx)("img", { alt: label, src: URL.createObjectURL(value) }, void 0))), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: `btn ${`btn_close`}`, onClick: () => {
                                    onChange(null);
                                } }, { children: (0, jsx_runtime_1.jsx)(io5_1.IoCloseCircleSharp, {}, void 0) }), void 0)] }, void 0)
                    : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("input", Object.assign({ id: name || id, type: "file", name: name, className: `file_input`, value: value }, rest, { onChange: (e) => {
                                    const { files } = e.target;
                                    onChange(files && files[0]);
                                } }), void 0), (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: name, className: `grid-row column ${label}` }, { children: (0, jsx_runtime_1.jsxs)("span", Object.assign({ className: `text_center` }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "d-block mr-1" }, { children: (0, jsx_runtime_1.jsx)(bs_1.BsFillPlusCircleFill, {}, void 0) }), void 0), "Select ", label.toLowerCase()] }), void 0) }), void 0)] }, void 0) }), void 0), (0, utility_1.isErrorExists)(errors) &&
                (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "error-field-desc" }, { children: name in errors && errors[name][0] }), void 0)] }), void 0));
};
exports.FileInputField = FileInputField;
exports.FileInputField.defaultProps = {
    name: "file"
};
exports.default = exports.FileInputField;
//# sourceMappingURL=index.js.map
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
exports.CreatableSelectField = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const creatable_1 = __importDefault(require("react-select/creatable"));
const CreatableSelectField = (_a) => {
    var { wrapperClass, options, onChange, isMulti } = _a, rest = __rest(_a, ["wrapperClass", "options", "onChange", "isMulti"]);
    const customStyles = {
        control: (styles) => (Object.assign(Object.assign({}, styles), { backgroundColor: 'transparent', color: 'inherit', padding: 0, borderWidth: 0, minHeight: 10, boxShadow: 'none' })),
        placeholder: (styles) => (Object.assign(Object.assign({}, styles), { color: 'inherit' })),
        menu: (provided, state) => (Object.assign(Object.assign({}, provided), { width: state.selectProps.width, backgroundColor: '#344258', padding: 5 })),
        option: (provided, state) => {
            return (Object.assign(Object.assign({}, provided), { color: state.isFocused ? 'white' : 'inherit', backgroundColor: state.isFocused ? 'dimgrey' : 'transparent', paddingTop: 5, paddingBottom: 5, paddingLeft: 20, paddingRight: 20 }));
        },
    };
    const handleChange = (newValue) => {
        if (onChange) {
            onChange(newValue);
        }
    };
    const handleInputChange = (_inputValue) => {
    };
    return ((0, jsx_runtime_1.jsx)(creatable_1.default, Object.assign({ styles: customStyles, isClearable: true, onChange: (nv, _act) => handleChange(nv), onInputChange: (iv, _act) => handleInputChange(iv), options: options, isMulti: isMulti, className: "basic-multi-select", classNamePrefix: "select" }, rest), void 0));
};
exports.CreatableSelectField = CreatableSelectField;
exports.default = exports.CreatableSelectField;
//# sourceMappingURL=CreatableSelectField.js.map
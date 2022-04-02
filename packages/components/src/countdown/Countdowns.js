"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToTime = exports.FromTime = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const moment_1 = __importDefault(require("moment"));
const utility_1 = require("../utility");
const FromTime = (props) => {
    const [duration, setDuration] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        let timer = setInterval(() => {
            const d = moment_1.default.utc().diff(moment_1.default.utc(props.time, utility_1._DT_FMT_DB));
            setDuration(moment_1.default.duration(d, 'milliseconds'));
            if (props.onUpdate) {
                props.onUpdate();
            }
        }, 1000);
        return () => {
            if (timer)
                clearInterval(timer);
        };
    });
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: duration && duration.asMilliseconds() > 0 && ((0, jsx_runtime_1.jsxs)("span", Object.assign({ className: `${props.wrapperClass}` }, { children: [(0, jsx_runtime_1.jsxs)("span", Object.assign({ className: "mr-1" }, { children: [props.label, ":"] }), void 0), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "mr-05" }, { children: `${duration.days()}D ` }), void 0), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "mr-05" }, { children: `${duration.hours()}H ` }), void 0), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "mr-05" }, { children: `${duration.minutes()}M ` }), void 0), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "mr-05" }, { children: `${duration.seconds()}S ` }), void 0)] }), void 0)) }, void 0));
};
exports.FromTime = FromTime;
const ToTime = (props) => {
    const [duration, setDuration] = (0, react_1.useState)();
    const [diff, setDiff] = (0, react_1.useState)(-1);
    (0, react_1.useEffect)(() => {
        let timer = setInterval(() => {
            const d = moment_1.default.utc(props.time, utility_1._DT_FMT_DB).diff(moment_1.default.utc());
            if (d >= 0) {
                setDiff(d);
                setDuration(moment_1.default.duration(d, 'milliseconds'));
                if (props.onUpdate) {
                    props.onUpdate();
                }
            }
            else {
                clearInterval(timer);
                timer = null;
                if (props.onDone) {
                    setDiff(-1);
                    props.onDone();
                }
            }
        }, 1000);
        return () => {
            if (timer)
                clearInterval(timer);
        };
    });
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: diff > 0 && duration && duration.asMilliseconds() > 0 && ((0, jsx_runtime_1.jsxs)("span", Object.assign({ className: `${props.wrapperClass}` }, { children: [(0, jsx_runtime_1.jsxs)("span", Object.assign({ className: "mr-1" }, { children: [props.label, ":"] }), void 0), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "mr-05" }, { children: `${duration.days()}D ` }), void 0), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "mr-05" }, { children: `${duration.hours()}H ` }), void 0), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "mr-05" }, { children: `${duration.minutes()}M ` }), void 0), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "mr-05" }, { children: `${duration.seconds()}S ` }), void 0)] }), void 0)) }, void 0));
};
exports.ToTime = ToTime;
//# sourceMappingURL=Countdowns.js.map
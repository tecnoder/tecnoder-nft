"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartTimeBeforeEndTime = void 0;
require("reflect-metadata");
const moment_1 = __importDefault(require("moment"));
const registerDecorator_1 = require("../registerDecorator");
const _RULE = 'StartTimeBeforeEndTime';
class StartTimeBeforeEndTimeValidationRule {
    evaluate(target, value, key, options) {
        if ((0, moment_1.default)(target.endTime).isAfter((0, moment_1.default)(value))) {
            return null;
        }
        let message = `Start time should be before end time`;
        if (options) {
            let option = options.find(element => element.constraint === _RULE);
            if (option) {
                if (option.message) {
                    message = option.message;
                }
            }
        }
        return { key: key, message: message };
    }
}
StartTimeBeforeEndTimeValidationRule.instance = new StartTimeBeforeEndTimeValidationRule();
function StartTimeBeforeEndTime(options) {
    return function (target, propertyKey) {
        (0, registerDecorator_1.registerDecorator)(target, propertyKey, StartTimeBeforeEndTimeValidationRule.instance, _RULE, options);
    };
}
exports.StartTimeBeforeEndTime = StartTimeBeforeEndTime;
//# sourceMappingURL=StartTimeBeforeEndTime.js.map
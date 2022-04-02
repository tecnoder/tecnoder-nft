"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValid = exports.validate = exports.rules = void 0;
exports.rules = __importStar(require("./rules"));
function validate(target, key) {
    const keys = Reflect.getMetadata("validation", target);
    var errorMessages = [];
    if (Array.isArray(keys)) {
        for (const key of keys) {
            const rules = Reflect.getMetadata("validation", target, key);
            const options = Reflect.getMetadata("validationOptions", target, key);
            if (!Array.isArray(rules)) {
                continue;
            }
            for (const rule of rules) {
                const error = rule.evaluate(target, target[key], key, options);
                if (error) {
                    errorMessages.push(error);
                }
            }
        }
    }
    if (key) {
        let errors = errorMessages.find(element => element.key == key);
        if (errors == undefined) {
            return '';
        }
        else {
            return errors;
        }
    }
    else {
        let errors = [];
        errorMessages.forEach((error) => {
            if (!(errors.hasOwnProperty(error.key))) {
                errors[error.key] = [];
            }
            errors[error.key].push(error.message);
        });
        return errors;
    }
}
exports.validate = validate;
function isValid(target) {
    const validationResult = validate(target);
    return validationResult.length === 0;
}
exports.isValid = isValid;
//# sourceMappingURL=validator.js.map
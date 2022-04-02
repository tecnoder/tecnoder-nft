"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDecorator = void 0;
const addValidationRule_1 = require("./addValidationRule");
function registerDecorator(target, propertyKey, rule, constraint, options) {
    if (options) {
        options.constraint = constraint;
    }
    (0, addValidationRule_1.addValidationRule)(target, propertyKey, rule, options);
}
exports.registerDecorator = registerDecorator;
//# sourceMappingURL=registerDecorator.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addValidationRule = void 0;
function addValidationRule(target, propertyKey, rule, option) {
    let rules = Reflect.getMetadata("validation", target, propertyKey) || [];
    rules.push(rule);
    let options = Reflect.getMetadata("validationOptions", target, propertyKey) || [];
    if (option) {
        options.push(option);
    }
    let properties = Reflect.getMetadata("validation", target) || [];
    if (properties.indexOf(propertyKey) < 0) {
        properties.push(propertyKey);
    }
    Reflect.defineMetadata("validation", properties, target);
    Reflect.defineMetadata("validation", rules, target, propertyKey);
    Reflect.defineMetadata("validationOptions", options, target, propertyKey);
}
exports.addValidationRule = addValidationRule;
//# sourceMappingURL=addValidationRule.js.map
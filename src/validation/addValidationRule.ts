import { IValidationRule } from './IValidationRule';
import { ValidationOptions } from './ValidationOptions';

export function addValidationRule(target: any, propertyKey: string, rule: IValidationRule, option?: ValidationOptions) {
    let rules: IValidationRule[] = Reflect.getMetadata("validation", target, propertyKey) || [];
    rules.push(rule);

    let options: ValidationOptions[] = Reflect.getMetadata("validationOptions", target, propertyKey) || [];
    if(option){
        options.push(option);
    }

    let properties: string[] = Reflect.getMetadata("validation", target) || [];

    if (properties.indexOf(propertyKey) < 0) {
        properties.push(propertyKey);
    }

    Reflect.defineMetadata("validation", properties, target);
    Reflect.defineMetadata("validation", rules, target, propertyKey);
    Reflect.defineMetadata("validationOptions", options, target, propertyKey);

}
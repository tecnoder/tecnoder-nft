import { addValidationRule } from './addValidationRule';
import { IValidationRule } from './IValidationRule';
import { ValidationOptions } from './ValidationOptions';
export function registerDecorator(target: any, propertyKey: string, rule: IValidationRule, constraint: string, options?: ValidationOptions){
    if(options){
        options.constraint = constraint;
    }
    addValidationRule(target, propertyKey, rule, options);
}
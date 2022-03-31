import "reflect-metadata";
import { IValidationRule } from '../IValidationRule';
import { ValidationOptions } from '../ValidationOptions';
import { registerDecorator } from '../registerDecorator';

const _RULE = 'Required';

class RequiredValidationRule implements IValidationRule {
    static instance = new RequiredValidationRule();

    evaluate(_target: any, value: any, key: string, options?: ValidationOptions[]): any {

        if (value) {
            return null;
        }

        let message: string = `${key} is required`;

        if(options){
            let option = options.find(element => element.constraint === _RULE);
            if(option){ 
                if(option.message){
                    message = option.message
                }
            }
        }

        return {key: key, message: message};

    }
}

export function Required(options?: ValidationOptions){
    return function(target: any, propertyKey: string){
        registerDecorator(target, propertyKey, RequiredValidationRule.instance, _RULE, options)
    }
}

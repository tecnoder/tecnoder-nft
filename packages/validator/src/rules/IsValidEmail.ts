import "reflect-metadata";
import { IValidationRule } from '../IValidationRule';
import { ValidationOptions } from '../ValidationOptions';
import { registerDecorator } from '../registerDecorator';

const _RULE = 'NotStartsWithRule';

class IsValidEmailRule implements IValidationRule {
    static instance = new IsValidEmailRule();

    evaluate(_target: any, value: any, key: string, _options?: ValidationOptions[]): any {

        let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

        if(regex.test(value)){
            return null;
        }

        let message: string = `Invalid Email`;

        return {key: key, message: message};


    }
}

export function IsValidEmail(options?: ValidationOptions){
    return function(target: any, propertyKey: string){
        registerDecorator(target, propertyKey, IsValidEmailRule.instance, _RULE, options)
    }
}
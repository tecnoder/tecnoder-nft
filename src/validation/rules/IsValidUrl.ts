import "reflect-metadata";
import { IValidationRule } from '../IValidationRule';
import { ValidationOptions } from '../ValidationOptions';
import { registerDecorator } from '../registerDecorator';
import { validUrlRegex } from "../../utils/Constants";

const _RULE = 'NotStartsWithRule';

class IsValidUrlRule implements IValidationRule {
    static instance = new IsValidUrlRule();

    evaluate(_target: any, value: any, key: string, _options?: ValidationOptions[]): any {

        let regex = validUrlRegex;

        if(!value || regex.test(value)){
            return null;
        }

        let message: string = `Invalid Url`;

        return {key: key, message: message};


    }
}

export function IsValidUrl(options?: ValidationOptions){
    return function(target: any, propertyKey: string){
        registerDecorator(target, propertyKey, IsValidUrlRule.instance, _RULE, options)
    }
}
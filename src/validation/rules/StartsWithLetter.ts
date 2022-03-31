import "reflect-metadata";
import { IValidationRule } from '../IValidationRule';
import { ValidationOptions } from '../ValidationOptions';
import { registerDecorator } from '../registerDecorator';

const _RULE = 'StartsWithLetter';

class StartsWithLetterRule implements IValidationRule {
    static instance = new StartsWithLetterRule();

    evaluate(_target: any, value: any, key: string, options?: ValidationOptions[]): any {

        if(!(value.charAt(0) <= "9" && value.charAt(0) >= "0")){
            return null;
        }
        
        let message: string = `${key} must start with a letter`;

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


export function StartsWithLetter(options?: ValidationOptions){
    return function(target: any, propertyKey: string){
        registerDecorator(target, propertyKey, StartsWithLetterRule.instance, _RULE, options)
    }
}
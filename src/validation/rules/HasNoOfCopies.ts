import "reflect-metadata";
import { IValidationRule } from "../IValidationRule";
import { ValidationOptions } from "../ValidationOptions";
import { registerDecorator } from "../registerDecorator";

const _RULE = 'HasNoOfCopies';

class HasNoOfCopiesValidationRule implements IValidationRule {
    static instance = new HasNoOfCopiesValidationRule();

    evaluate(target: any, value: any, key: string, options?: ValidationOptions[]): any {
        if ((target.dropTypeId===1 && value === 1) || (target.dropTypeId===2 && value > 1)) { // noOfCopies ===1 for auction or >0 for Fixed type
            return null;
        }

        let message: string = `Number of copies is required`;

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

export function HasNoOfCopies(options?: ValidationOptions){
    return function(target: any, propertyKey: string){
        registerDecorator(target, propertyKey, HasNoOfCopiesValidationRule.instance, _RULE, options)
    }
}
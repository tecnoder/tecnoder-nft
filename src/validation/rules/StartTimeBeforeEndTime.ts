import "reflect-metadata";

import moment from 'moment';
import { IValidationRule } from "../IValidationRule";
import { ValidationOptions } from "../ValidationOptions";
import { registerDecorator } from "../registerDecorator";


const _RULE = 'StartTimeBeforeEndTime';

class StartTimeBeforeEndTimeValidationRule implements IValidationRule {
    static instance = new StartTimeBeforeEndTimeValidationRule();

    evaluate(target: any, value: any, key: string, options?: ValidationOptions[]): any {
        if (moment(target.endTime).isAfter(moment(value))) {
            return null;
        }

        let message: string = `Start time should be before end time`;

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

export function StartTimeBeforeEndTime(options?: ValidationOptions){
    return function(target: any, propertyKey: string){
        registerDecorator(target, propertyKey, StartTimeBeforeEndTimeValidationRule.instance, _RULE, options)
    }
}
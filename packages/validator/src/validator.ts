import { IValidationRule } from './IValidationRule';
import { ValidationOptions } from './ValidationOptions';

export * as rules from './rules';
export * as classes from './classes'

export function validate(target: any, key?:string) {
    // Get the list of properties to validate
    const keys = Reflect.getMetadata("validation", target) as string[];
    var errorMessages: any[] = [];
    if (Array.isArray(keys)) {
        for (const key of keys) {
            const rules = Reflect.getMetadata("validation", target, key) as IValidationRule[];
            
            const options = Reflect.getMetadata("validationOptions", target, key) as ValidationOptions[];
            if (!Array.isArray(rules)) {
                continue;
            }

            for (const rule of rules) {
                const error = rule.evaluate(target, target[key], key, options);
                
                if (error) {
                    errorMessages.push(error);
                }
            }
        }
    }
    if(key){
        let errors = errorMessages.find(element => element.key == key);
        if(errors == undefined){
            return '';
        }
        else{
            return errors;
        }
    }
    else{
        let errors: any = [];

        errorMessages.forEach((error: any) => {
            if(!(errors.hasOwnProperty(error.key))){
                errors[error.key] = [];   
            }
            errors[error.key].push(error.message);
        });
        return errors;
    }
}

export function isValid(target: any) {
    const validationResult = validate(target);
    return validationResult.length === 0;
}
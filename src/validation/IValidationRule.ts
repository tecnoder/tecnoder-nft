import { ValidationOptions } from './ValidationOptions';
export interface IValidationRule {
    evaluate(target: any, value: any, key: string, options: ValidationOptions[]): any;
}
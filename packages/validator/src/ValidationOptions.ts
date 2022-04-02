export interface ValidationOptions {

    /**
     * property
     */
    property?: string;

    /**
     * Any data property
     */
    data?: any;

    /**
     * Error message to be used on validation fail.
     * Message can be either string or a function that returns a string.
     */
    message?: string;

    /**
     * Error message to be used on validation fail.
     * Message can be either string or a function that returns a string.
     */
    constraint?: string;

}
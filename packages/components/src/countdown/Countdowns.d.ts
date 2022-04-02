/// <reference types="react" />
interface CountDownProps {
    time: Date;
    label: string;
    wrapperClass: string;
    onDone?: any;
    onUpdate?: any;
}
export declare const FromTime: (props: CountDownProps) => JSX.Element;
export declare const ToTime: (props: CountDownProps) => JSX.Element;
export {};

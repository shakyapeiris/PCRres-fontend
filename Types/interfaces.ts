import { ChangeEventHandler, CSSProperties, FocusEventHandler, FormEventHandler } from "react";

export interface BlogProps{
    title: string;
    image: string;
    body: string;
}

export interface AuthInterFace{
    loginId: string | null;
    isAdmin: boolean;
    login: (authId: string, isAdmin: boolean) => void;
    logout: () => void;
}

export interface InputInterface{
    value: number | string;
    type: string;
    placeholder: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onBlur: FocusEventHandler<HTMLInputElement>;
    styles: CSSProperties | undefined;
}

interface UseInputProps{
    inputValue: string | number;
    hasError: boolean;
    valueChangeHandler: ChangeEventHandler<HTMLInputElement>
    inputBlurHandler: FocusEventHandler<HTMLInputElement>
}

export interface LoginProps{
    message: string | null;
    email: UseInputProps;
    password: UseInputProps;
    onSubmit: FormEventHandler<HTMLFormElement>;
    sending: boolean;
    success: boolean;
}

export interface RegisterInterface{
    name: UseInputProps;
    age: UseInputProps;
    address: UseInputProps;
    contactNo: UseInputProps;
    NIC: UseInputProps;
    email: UseInputProps;
    gender: UseInputProps;
    password: UseInputProps;
    province: {
        inputValue: string | number;
        hasError: boolean;
        valueChangeHandler: ChangeEventHandler<HTMLSelectElement>
        inputBlurHandler: FocusEventHandler<HTMLSelectElement>
    };
    district: {
        inputValue: string | number;
        hasError: boolean;
        valueChangeHandler: ChangeEventHandler<HTMLSelectElement>
        inputBlurHandler: FocusEventHandler<HTMLSelectElement>
    };
    onSubmit: FormEventHandler<HTMLFormElement>;
    sending: boolean;
    message: string | null;
    successful: boolean;
}

export interface AdminRegisterInterface{
    name: UseInputProps;
    address: UseInputProps;
    email: UseInputProps;
    price: UseInputProps;
    password: UseInputProps;
    contactNo: UseInputProps;
    days: {date: string, clicked: boolean}[]
    timeSlots: {time: string, clicked: boolean}[]
    setDateChecked: (index: number, checked: boolean) => void;
    setTimeChecked: (index: number, checked: boolean) => void;
    onSubmit: FormEventHandler<HTMLFormElement>;
    sending: boolean;
    message: string | null;
    success: boolean,
}
import {ChangeEvent} from "react";
import "./Input.scss"
import * as path from "path";

interface InputProps {
    value: string | number
    placeholder: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    className?: string
    type?: "number" | "text" | "password" | "tel"
}

export const Input = ({value, type, onChange, className, placeholder}:InputProps) => {
    return (
        <input className={`input ${className ?? ""}`} type={type} value={value} placeholder={placeholder ?? "Type here"} onChange={onChange}></input>
    );
};
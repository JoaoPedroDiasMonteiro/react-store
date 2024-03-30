import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    readonly label: string
}

export default function Input(props: InputProps) {
    return (
        <div className="flex gap-2 items-center">
            <label htmlFor={props.label} className="block text-sm font-medium leading-6 text-gray-900">
                {props.label}
            </label>
            <div>
                <input
                    type="text"
                    name={props.label}
                    id={props.label}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Type here..."
                    {...props}
                />
            </div>
        </div>
    )
}

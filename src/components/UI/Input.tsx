import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    readonly label: string,
    readonly model: [string | undefined, Function]
}

export default function Input(props: InputProps) {
    const { label, model, className, onChange, ...rest } = props

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        model[1](event.target.value)
    }

    return (
        <div>
            <label htmlFor={label} className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                <input
                    id={label}
                    name={label}
                    className={`${className} block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    onChange={handleOnChange}
                    value={model[0]}
                    {...rest}
                />
            </div>
        </div>
    )
}

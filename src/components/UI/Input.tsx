import React, { useEffect, useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    readonly label: string,
    readonly model: Function
}

export default function Input({model, label, ...rest}: InputProps) {
    const [value, setValue] = useState<string>('')

    useEffect(() => {
        model(value)
    }, [value, model])

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value)
    }

    return (
        <div className="flex gap-2 items-center">
            <label htmlFor={label} className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div>
                <input
                    type="text"
                    name={label}
                    id={label}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Type here..."
                    value={value}
                    {...rest}
                    onChange={handleOnChange}
                />
            </div>
        </div>
    )
}

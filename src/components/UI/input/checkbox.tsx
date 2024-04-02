import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    readonly label: string,
    readonly model: [boolean, Function]
}

export default function Checkbox(props: CheckboxProps) {
    const { label, model, className, onChange, ...rest } = props

    function handleOnChange() {
        model[1](!model[0])
    }

    return (
        <div className="flex items-center">
            <input
                id={label}
                name={label}
                className={`${className} h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600`}
                onChange={handleOnChange}
                checked={model[0]}
                {...rest}
                type="checkbox"
            />
            <label htmlFor={label} className="ml-3 block text-sm leading-6 text-gray-700">
                {label}
            </label>
        </div>
    )
}

import React, { useMemo } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    readonly label: string,
    readonly model: [value: boolean | {}, setValue: Function, key?: string]
}

export default function Checkbox(props: CheckboxProps) {
    const { label, model, className, onChange, ...rest } = props

    const checked = useMemo(() => {
        if (typeof model[0] === 'object' && model[2]) {
            // @ts-ignore
            return model[0][model[2]]
        }

        return model[0]
    }, [model])

    function handleOnChange() {
        if (model[2] && typeof model[0] === 'object') {
            // @ts-ignore
            const value = model[0][model[2]]

            model[1]({ ...model[0], [model[2]]: !value })
        } else {
            model[1](!model[0])
        }
    }

    return (
        <div className="flex items-center">
            <input
                id={label}
                name={label}
                className={`${className} h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600`}
                onChange={handleOnChange}
                checked={checked}
                {...rest}
                type="checkbox"
            />
            <label htmlFor={label} className="ml-3 block text-sm leading-6 text-gray-700">
                {label}
            </label>
        </div>
    )
}

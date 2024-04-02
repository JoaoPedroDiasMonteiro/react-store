import React from "react";

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {

}

export default function Button(props: ButtonProps) {
    const {className, children, ...rest} = props
    return (
        <button
            type="submit"
            className={`${className} flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            {...rest}
        >
            {children}
        </button>
    )
}
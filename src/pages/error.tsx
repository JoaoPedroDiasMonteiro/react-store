import React from "react";

interface ErrorProps {
    readonly className?: string
    readonly errorCode?: string
    readonly errorMessage?: string
}

export default function Error({ className, errorCode, errorMessage }: ErrorProps) {
    const defaultErrorCode = '404'
    const defaultErrorMessage = "THE PAGE YOU WERE LOOKING FOR DOESN'T EXIST."

    return <div className={`container mx-auto w-full py-10 px-4 text-center ${className}`}>
        <div className="text-9xl font-bold">{errorCode ?? defaultErrorCode}</div>
        <p className="mt-6">{errorMessage ?? defaultErrorMessage}</p>
    </div>
}
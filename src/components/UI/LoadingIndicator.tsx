import React, { useEffect, useState } from "react";

interface LoadingIndicatorProps {
    readonly show: boolean
}

export default function LoadingIndicator({ show }: LoadingIndicatorProps) {
    const [dots, setDots] = useState<string>('...')

    useEffect(() => {
        setTimeout(() => {
            switch (dots) {
                case '...':
                    setDots('')
                    break;
                case '..':
                    setDots('...')
                    break;
                case '.':
                    setDots('..')
                    break;
                case '':
                    setDots('.')
                    break;
            }
        }, 222)
    }, [dots])

    if (!show) {
        return <></>
    }

    return (
        <div className="fixed w-screen h-screen bg-black opacity-70 inset-0 text-white flex items-center justify-center z-50">
            <p className="relative">
                <span>loading</span>
                <span className="absolute">{dots}</span>
            </p>
            <span></span>
        </div>
    )
}
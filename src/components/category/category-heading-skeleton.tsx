import React from "react"

export default function CategoryHeadingSkeleton() {
    return (
        <div className="group relative h-96 rounded-lg bg-white sm:aspect-h-5 sm:aspect-w-4 sm:h-auto" >
            <div>
                <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-lg">
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            className="h-full w-full bg-slate-300 animate-pulse"
                        />
                    </div>
                    <div className="absolute inset-0" />
                </div>
                <div className="absolute inset-0 flex items-end rounded-lg p-6">
                    <div>
                        <p aria-hidden="true" className="text-sm text-white">
                            <span className="h-5 w-32 bg-slate-600 animate-pulse"></span>
                        </p>
                        <h3 className="mt-1 font-semibold text-white">
                            <span className="h-5 w-16 bg-slate-600 animate-pulse"></span>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

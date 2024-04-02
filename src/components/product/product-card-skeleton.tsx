import React from "react";

export default function ProductCardSkeleton() {
    return (
        <div className="relative">
            <div className="h-56 w-full overflow-hidden rounded-md lg:h-72 xl:h-80">
                <div className="h-full w-full bg-slate-300 animate-pulse" />
            </div>

            <p className="rounded-md mt-4 w-24 h-5 bg-slate-300 animate-pulse"></p>
            <p className="rounded-md mt-1 w-32 h-5 bg-slate-300 animate-pulse"></p>
            <p className="rounded-md mt-1 w-14 h-5 bg-slate-300 animate-pulse"></p>
        </div>
    )
};

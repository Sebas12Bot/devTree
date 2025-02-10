import React from "react";

export default function ErrorMessage({ children } : { children: React.ReactNode }) {
    return (
        <div>
            <p className="bg-red-50 text-red-600 p3 text-sm font-bold text-center">{children}</p>
        </div>
    )
}
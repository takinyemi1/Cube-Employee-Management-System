import React from "react"

const SummaryCard = ({icon, text, number, color}) => {
    return (
        <div className="rounded flex bg-white">
            {/* icon */}
            <div className={`text-3xl flex justify-center items-center ${color} text-white px-4 rounded`}>
                {icon}
            </div>
            {/* leave, present, etc */}
            <div className="pl-4 py-1">
                {/* total employees */}
                <p className="text-lg font-semibold">{text}</p> 
                {/* number of icons */}
                <p className="text-xl font-bold">{number}</p>
            </div>
        </div>
    )
}

export default SummaryCard
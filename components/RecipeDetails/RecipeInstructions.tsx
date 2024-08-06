import React from 'react'

export default function RecipeInstructions({instructions}: {instructions: string[]}) {
    return (
        <div className="w-full flex flex-col justify-start items-start gap-2">
            <span className="text-lg font-bold text-slate-600">
                Instructions
            </span>
            <ul className="font-thin list-decimal list-outside text-slate-600 pl-8">
                {
                    instructions.map(instruction => (
                        <li key={instruction} className="pl-1">{instruction}</li>
                    ))
                }
            </ul>
        </div>
    )
}

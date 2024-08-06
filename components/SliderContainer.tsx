import React from 'react'
import SwipeContainer from './SwipeContainer';
import { Bungee } from 'next/font/google'
const bungee = Bungee({ weight: '400', subsets: ['latin'] })

export default function SliderContainer({ title, items, wrap }: { title: string, items: JSX.Element[], wrap?: boolean }) {
    const splitTitle = title.split(' ');
    const firstWord = splitTitle[0];
    const restWord = splitTitle.slice(1).join(' ');

    return (
        <div className="w-full flex flex-col justify-center items-center gap-8 md:px-20 px-2 py-5">
            <div className={`w-full text-center text-xl md:text-3xl font-bold ${bungee.className}`}>
                <span className="text-red-500">{firstWord} </span>{restWord}
            </div>
            <SwipeContainer wrap={wrap}>
                {items}
            </SwipeContainer>
        </div>
    )
}

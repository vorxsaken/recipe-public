import { ReactNode, useState } from 'react'

export default function SwipeContainer({ children, wrap }: { children: ReactNode, wrap?: boolean }) {
    const [xDown, setXDown] = useState(0);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const handleMouseDown = (event: any) => {
        setIsMouseDown(true);
        setXDown(event.clientX);
        event.currentTarget.style.cursor = "grabbing";
    };

    const handleMouseMove = (event: any) => {
        if (!isMouseDown) {
            return;
        }

        const xUp = event.clientX;

        const xDiff = xDown - xUp;

        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        event.currentTarget.scrollLeft += xDiff;

        setXDown(xUp);
    };

    const handleMouseUp = (event: any) => {
        setIsMouseDown(false);
        event.currentTarget.style.cursor = "grab";
    };

    return (
        <div
            className={`w-full overflow-x-auto scrollbar-hide flex gap-2 md:gap-4 select-none cursor-grab
            ${wrap ? 'flex-wrap justify-center items-center' : 'flex-nowrap'}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {children}
        </div>
    )
}

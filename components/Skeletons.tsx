interface skeletonsUI {
    count?: Number,
    hFull?: boolean,
    type?: string
}

export default function Skeletons({ count, hFull, type }: skeletonsUI) {
    const heightUI = hFull ? 'h-full' : 'h-7';
    const skeleton = {
        imageType: 'w-full h-full',
        titleType: 'w-[80%] h-5',
        subtitleType: 'w-60 h-4',
        paragraphType: 'w-full h-4',
        textInputType: 'w-full h-20',
    }

    const typeUI = type === 'title' ? skeleton.titleType : type === 'image' ? skeleton.imageType : 
    type === 'subtitle' ? skeleton.subtitleType : type === 'paragraph' ? skeleton.paragraphType : type === 'text input' ? skeleton.textInputType : 'w-full'

    return (
        <div className="w-[95%] h-full flex flex-col justify-start items-start gap-2">
            {
                [...Array(count || 1)].map((i, index) => (
                    <div key={index} className={`${typeUI} ${ heightUI } bg-gray-200 rounded-2xl overflow-hidden relative`}>
                        <div className="w-1/2 h-full bg-white blur-2xl absolute animate-xSlide rounded-xl">
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

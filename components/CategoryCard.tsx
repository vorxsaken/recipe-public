import Image, { StaticImageData } from 'next/image'

export default function CategoryCard({title, image}: {title: string, image: string | StaticImageData}) {
  return (
    <div className='w-48 h-48 flex flex-col gap-2 justify-center items-center md:flex-none'>
        <div className='w-36 h-36 flex justify-center items-center overflow-hidden relative rounded-xl'>
            <Image src={image} alt='category' fill className='pointer-events-none object-cover' />
        </div>
        <div className='w-full text-center font-semibold text-slate-800 text-sm'>
            {title}
        </div>
    </div>
  )
}

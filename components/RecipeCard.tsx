import Image, { StaticImageData } from 'next/image'
import { BiTime } from 'react-icons/bi';
import { AiFillFolderAdd, AiFillStar } from 'react-icons/ai'
import { GiSpoon } from 'react-icons/gi'
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';

interface recipeCard {
  recipeId: string,
  image?: StaticImageData,
  title: string,
  calorie?: string,
  serving?: string,
  link: string,
  shallow?: boolean,
  ratings?: {
    id: string,
    value: number,
  }[],
  collection?: {
    id: string,
    name: string
  }[],
  asLink?: boolean,
  likeEvent?: () => void
}

export default function RecipeCard({ recipeId, image, title, calorie, serving, link, likeEvent, shallow, asLink, ratings, collection }: recipeCard) {
  const collections = useSelector((state: any) => state.user.collections);
  const [isSaved, setisSaved] = useState(false);
  const isAs = asLink ? `/recipe/${recipeId}` : link;
  const shortTitle = title?.length > 50 ? title?.substring(0, 50) + ' ...' : title;
  const rating = useMemo(() => {
    const calcRating = ratings?.reduce((init: any, rating: any) => {
      return init + rating.value
    }, 0) as any

    return (calcRating / (ratings?.length || 1))
  }, [ratings])

  useEffect(() => {
    if (collections) {
      for (let i = 0; i < collections.length; i++) {
        if (collections[i].recipeId.some((id: any) => id === recipeId)) {
          setisSaved(true);
          break;
        }
        setisSaved(false)
      }
    }
  }, [collections])

  return (
    <div title={title} className='w-full h-72 md:w-[21vw] md:h-[35vh] flex flex-col flex-none justify-start items-center gap-2 border border-slate-300 
    overflow-hidden rounded-lg cursor-pointer relative group'>
      <Link scroll={false} shallow={shallow} href={link} as={isAs} className='w-full h-48 md:h-56 absolute top-0 z-10' />
      <div className={`w-auto absolute top-2 right-3 bg-gradient-to-b to-black z-10 flex justify-end 
      invisible group-hover:visible rounded-md p-1 ${isSaved ? 'bg-red-50' : 'bg-white'}`}>
        <AiFillFolderAdd onClick={() => { console.log('like') }} className={`text-2xl cursor-pointer ${isSaved ? 'text-red-500' : 'text-slate-500'}`} />
      </div>
      <div className='w-full h-48 md:h-48 bg-blue-200 overflow-hidden relative'>
        <Image src={image || ''} alt='burger' fill className='object-cover pointer-events-none' />
      </div>
      <div className='w-full flex flex-col gap-2 text-lg md:text-sm pl-2 md:pl-4 text-slate-700 font-semibold'>
        <span>{shortTitle}</span>
        <div className='flex flex-row gap-2'>
          <div className='text-xs text-slate-400 font-thin flex flex-row gap-2'>
            <GiSpoon className='text-red-400' />
            <span>{calorie} cal</span>
          </div>
          <div className='text-xs text-slate-400 font-thin flex flex-row gap-2'>
            <AiFillFolderAdd className='text-red-400' />
            <span>{collection?.length}</span>
          </div>
          <div className='text-xs text-slate-400 font-thin flex flex-row gap-2'>
            <AiFillStar className='text-red-400' />
            <span>{isNaN(rating) ? 0 : rating}</span>
          </div>
        </div>
      </div>
      <div className='w-full px-2 md:px-4 pb-2 flex justify-start items-center text-slate-800'>
        <div className='flex justify-center items-center gap-1'>
          <BiTime className='text-sm md:text-md' />
          <span className='text-[0.6rem] md:text-[0.7rem]'> {serving} min serving</span>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import Image from 'next/image';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { setTempCollection } from '@/store/Reducers/userReducer';

export default function Collections(props: {kollection: any}) {
  const dispatch = useDispatch();
  const { kollection } = props;
  
  const ToCollection = () => {
    dispatch(setTempCollection(kollection))
    Router.push('/collections/collection')
  }

  return (
    <div onClick={ToCollection} className='flex flex-col md:gap-1 gap-3 cursor-pointer' {...props}>
      <div className='w-80 sm:w-96 md:w-[380px] h-60 flex justify-start items-start rounded-2xl overflow-hidden gap-1'>
        <div className='w-[70%] h-full overflow-hidden relative bg-gray-200'>
          {
            kollection.recipes[0]?.bigImage && (
              <Image src={kollection.recipes[0].bigImage} alt="" fill className='object-cover pointer-events-none' />
            )
          }
        </div>
        <div className='w-[30%] h-full flex flex-col justify-start items-center gap-1'>
          <div className='w-full h-[33%] overflow-hidden relative bg-gray-200'>
            {
              kollection.recipes[1]?.bigImage && (
                <Image src={kollection.recipes[1].bigImage} alt="" fill className='object-cover pointer-events-none' />
              )
            }
          </div>
          <div className='w-full h-[33%] overflow-hidden relative bg-gray-200'>
            {
              kollection.recipes[2]?.bigImage && (
                <Image src={kollection.recipes[1].bigImage} alt="" fill className='object-cover pointer-events-none' />
              )
            }
          </div>
          <div className='w-full h-[34%] overflow-hidden relative bg-gray-200'>
            {
              kollection.recipes[3]?.bigImage && (
                <Image src={kollection.recipes[3].bigImage} alt="" fill className='object-cover pointer-events-none' />
              )
            }
          </div>
        </div>
      </div>
      <div className='md:text-xl text-3xl font-semibold text-center'>
        {kollection.name}
      </div>
    </div>
  )
}

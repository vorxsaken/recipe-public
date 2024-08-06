import {BsGithub, BsInstagram, BsTwitter} from 'react-icons/bs'
import Image from 'next/image';
import Logo from '../../assets/images/Food Recipe.png';

export default function Footer() {
  return (
    <footer className='w-full p-6 flex flex-col gap-6 justify-center items-center border-t-2 border-slate-200 mb-16 md:mb-0'>
        <Image src={Logo} alt="Logo" width={100} />
        <p className='w-full md:w-1/4 text-center text-xs'>
          Food recipe is a website where you can find food recipe easily. 
          Get inspired with delicious and easy to follow recipes. 
          From savory mains to sweet treats.
        </p>
        <div className='flex justify-center items-center gap-8 text-2xl'>
          <BsGithub className='text-slate-600' />
          <BsInstagram className='text-pink-600' />
          <BsTwitter className='text-sky-600' />
        </div>
        <div className='text-center text-slate-500 text-sm'>
          &#169; 2023 All Right Reserved
        </div>
    </footer>
  )
}

import Button from "../Button";
import Image from "next/image";
import Food from '../../assets/images/food.png';
import { Bungee } from "next/font/google"
const bungee = Bungee({weight: "400", subsets: ['latin']});

export default function Hero() {
  return (
    <div className="w-full h-[600px] p-4 flex justify-center items-center relative">
        <div className="flex flex-col gap-8 justify-center items-start absolute md:top-36 md:left-36 left-5 top-[15%] z-0">
          <p className={`md:text-6xl text-3xl ${bungee.className}`}>
            <span className="text-red-500">Delicious Food Recipe</span><br />
            For Everyone
          </p>
          <div className="max-w-lg md:max-w-2xl md:text-sm text-xs md:text-slate-800 text-black font-bold">
          {`This food recipe website offers a vast collection of culinary creations from around the community, 
          featuring easy-to-follow instructions, mouth-watering photos, and helpful cooking tips. 
          Whether you're a seasoned chef or a beginner in the kitchen, this site has something for everyone.`}
          </div>
          <Button>Get Started</Button>
        </div>
        <div className="absolute md:top-10 md:right-36 -z-10 top-[45%]">
          <Image src={Food} alt='food' />
        </div>
    </div>
  )
}

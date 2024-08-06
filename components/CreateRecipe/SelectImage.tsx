import { BsImageFill } from 'react-icons/bs'
import Image from 'next/image'
import { useState, useRef} from 'react';
import Compressor from 'compressorjs';

interface SelectImageUI {
    onChange: (e: any) => void,
    value?: string,
    sm?: boolean,
    circleRounded?: boolean
}

export default function SelectImage({ onChange, value, sm, circleRounded }: SelectImageUI) {
    const [imageUrl, setImageUrl] = useState(value || '')
    const ref = useRef(null)

    const compressImage = (uncompressImage: any) => {
        return new Promise((resolve) => {
            let compressedImage = {};
            // small image for thumbnail and etc
            new Compressor(uncompressImage, {
                quality: 0.8,
                width: 300,
                success(res) {
                    compressedImage = {
                        smallImage: res
                    }
                    // big Image for real pic
                    new Compressor(uncompressImage, {
                        quality: 0.8,
                        width: 600,
                        success(res) {
                            compressedImage = {
                                ...compressedImage,
                                bigImage: res
                            }
                            
                            resolve(compressedImage)
                        }
                    })
                }
            })
        })
    }

    const chooseImage = () => {
        const inputFile = ref.current as any;
        inputFile.click()
    }

    const inputChange = async (e: any) => {
        const compressedImage = await compressImage(e.target.files[0]) as any;
        const url = URL.createObjectURL(compressedImage.bigImage)
        setImageUrl(url);
        onChange(compressedImage)
    }

    const containerSize = sm ? 'w-60 md:w-[220px] h-60 md:h-[220px]' : 'w-full md:w-[500px] h-96 md:h-[450px]';
    const borderRadius = circleRounded ? 'rounded-full' : 'rounded-xl';

    return (
        <>
            <input onChange={(e) => inputChange(e)} ref={ref} type="file" className='hidden' />
            {
                imageUrl ? (
                    <div onClick={chooseImage} className={`${containerSize} ${borderRadius} overflow-hidden cursor-pointer relative`}>
                        <Image src={imageUrl} alt='recipe image preview' fill className='object-cover' />
                    </div>
                ) : (
                    <div
                        onClick={chooseImage}
                        className={`${containerSize} ${borderRadius} bg-zinc-200 flex justify-center items-center cursor-pointer overflow-hidden`}
                    >
                        <div className='flex flex-col justify-center items-center gap-4'>
                            <BsImageFill className={`${sm ? 'text-4xl' : 'text-6xl'} text-zinc-400`} />
                            <p className={`text-zinc-400 ${sm && 'text-xs'}`}>
                                Click this field to select image
                            </p>
                        </div>
                    </div>
                )
            }
        </>
    )
}

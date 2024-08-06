import { useState } from 'react'
import Layout from '@/components/Layout'
import SelectImage from '@/components/CreateRecipe/SelectImage'
import TextField from '@/components/TextField'
import Button from '@/components/Button'
import { useSelector } from 'react-redux'
import { imageType, uploadImages } from '@/utils'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/Reducers/userReducer'
import Router from 'next/router'

export default function Edit() {
    const user = useSelector((state: any) => state.user.userInfo);
    const [image, setImage] = useState<imageType>({});
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const input = (e: any) => {setImage(e)};

    const updateProfile = async () => {
        const username = document.getElementById('username') as any;
        const description = document.getElementById('description') as any;
        setLoading(true);

        const url = (Object.entries(image)).length > 0 ? await uploadImages(image.smallImage, image.bigImage) : user.image;
        try {
            fetch('/api/user/update', {
                method: 'POST',
                body: JSON.stringify({
                    userId: user.id,
                    username: username.value,
                    description: description.value,
                    image: url?.smallImage || url
                })
            })
            .then(res => res.json())
            .then(res => {
                dispatch(setUser(res));
                setLoading(false);
                Router.replace(`/profile/${user.id}`)
            })
            .catch(error => { throw new Error(error) });

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <Layout title={`Edit User ${user.name}`}>
            <div className='min-h-[600px] flex flex-col justify-start items-center gap-10 pt-8 pb-32 mt-16 md:mt-0 px-4'>
                <SelectImage sm circleRounded onChange={input} value={user.image} />
                <div className="w-full md:w-[400px] flex flex-col gap-4">
                    <div className="w-full text-xl font-bold">
                        Username
                    </div>
                    <TextField defaultValue={user.name} id='username' medium placeholder="input your desired username ..." />
                </div>
                <div className="w-full md:w-[400px] flex flex-col gap-4">
                    <div className="w-full text-xl font-bold">
                        Description
                    </div>
                    <TextField 
                        initValue={user.description} 
                        id='description' 
                        textArea 
                        placeholder="Describe yourself ...." 
                        maxLength={150}
                        showCounter
                    />
                </div>
                <div className="w-full md:w-[400px] flex justify-center items-center">
                    <Button onClick={updateProfile} loading={loading}>
                        save
                    </Button>
                </div>
            </div>
        </Layout>
    )
}

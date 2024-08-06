import { useState } from 'react'
import FullScreenContent from '../FullScreenContent'
import TextField from '../TextField'
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import Lottie from 'lottie-react'
import LoadingAnimation from '../../assets/92025-loading.json';
import Router from 'next/router';
import { debounce } from '@/utils';

function SearchModal({ showModal, openSearch }: { showModal: boolean, openSearch: () => void }) {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const fetchUsers = debounce(async () => {
        const text = (document.getElementById('search') as any).value;
        if (text) {
            setLoading(true)
            const req = await fetch(`/api/user/read/search/${text}`);
            const res = await req.json();
            setUsers(res);
            if (res.length < 1) setMessage('empty result');
            setLoading(false);
        } else {
            setMessage('')
        }
    }, 400)

    const toProfile = (link: string) => {
        Router.push(link);
        openSearch();
    }

    return (
        <FullScreenContent show={showModal} bg={true} onChangeState={openSearch}>
            <div className='w-full flex flex-col justify-start items-start gap-4 px-4'>
                <TextField placeholder='Search ...' medium id='search' onKeyUp={fetchUsers} icon={<FaSearch />} />
                <div className='w-full h-auto px-2'>
                    <div className='bg-slate-300 h-[0.8px] rounded-2xl'></div>
                </div>
                <div className='w-full max-h-[400px] flex flex-col justify-start items-start gap-2'>
                    {
                        loading ? (
                            <div className='w-full flex justify-center items-center'>
                                <Lottie className='w-28' animationData={LoadingAnimation} />
                            </div>
                        ) :
                            users.length > 0 ?
                                users.map((user, index) => (
                                    <div
                                        onClick={() => toProfile(`/profile/${user._id['$oid']}`)}
                                        key={index}
                                        className='flex justify-center items-center gap-3 cursor-pointer'
                                    >
                                        <div className='w-10 h-10 rounded-full overflow-hidden relative'>
                                            <Image src={user.image} fill alt='avatar' className='object-cover' />
                                        </div>
                                        <span className='text-base'>
                                            {user.name}
                                        </span>
                                    </div>
                                )) : (
                                    <div className='w-full flex justify-center items-center text-sm'>
                                        {message}
                                    </div>
                                )
                    }
                </div>
            </div>
        </FullScreenContent>
    )
}

export default SearchModal
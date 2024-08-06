import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from "next"
import Layout from "@/components/Layout"
import Image from "next/image"
import RecipeCard from "@/components/RecipeCard"
import Button from "@/components/Button"
import { BsPlus, BsCheck2 } from 'react-icons/bs'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import RecipeDetailsModal from "@/components/RecipeDetails/RecipeDetailsModal"
import Observer from "@/components/Observer"
import Link from "next/link";
import FullScreenContent from "@/components/FullScreenContent";
import InfiniteFetch from "@/components/InfiniteFetch";
import Router from "next/router";
import { getUserInfo, setFollowing } from "@/store/Reducers/userReducer";
import { useSession } from 'next-auth/react'
import store from '@/store'

interface User {
    id: string,
    name: string,
    image: string,
    description: string
}

interface FollowListModalUI {
    follower?: boolean,
    showModal: boolean,
    closeModal: () => void,
    id: string,
    follButtonCallback: (num: number) => void
}

function FollowButton({ following, userId, userDotId, successFollow, successUnfollow }: {
    following: boolean,
    userId: string,
    userDotId: string,
    successFollow: () => void,
    successUnfollow: () => void
}) {
    const [isFollow, setIsFollow] = useState(following);
    const [loading, setLoading] = useState(false);
    const email = useSelector((state: any) => state.user.userInfo.email);
    const dispatch = useDispatch();

    const resetFollowing = () => {
        fetch(`/api/user/read/${email}`)
            .then(res => res.json())
            .then((json: any) => {
                dispatch(setFollowing(json.following));
            })
            .catch(error => console.log(error))
    }

    const followOrUnfollow = () => {
        setLoading(true);
        fetch(`/api/user/${isFollow ? 'delete/unfollow' : 'create/follow'}`, {
            method: 'POST',
            body: JSON.stringify({
                userId: userId,
                userDotId: userDotId
            })
        })
            .then(res => res.json())
            .then((json) => {
                setIsFollow(!isFollow)
                setLoading(false);
                isFollow ? successUnfollow() : successFollow();
                resetFollowing();
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <Button text={isFollow} small loading={loading} onClick={followOrUnfollow}>
                {
                    isFollow ? 'unfollow' : 'follow'
                }
            </Button>
        </>
    )
}

function FollowListModal({ showModal, closeModal, follower, id, follButtonCallback }: FollowListModalUI) {
    const localUserFollow = useSelector((state: any) => state?.user?.userInfo);
    const ref = useRef();

    const touser = (id: string) => {
        Router.push(`/profile/${id}`);
        closeModal();
    }

    const followButtonSuccess = (num: number) => {
        if (localUserFollow?.id === id) follButtonCallback(num)
    }
    const successView = (results: any) => {
        if (results.length < 20) { (ref?.current as any).stopLoad() }
        return results?.map((result: any, index: any) => (
            <div key={index} className="w-full flex justify-between md:items-start items-center">
                <div onClick={() => touser(result?.userFollow?.user?.id)} className="flex justify-center items-center gap-3 cursor-pointer">
                    <div className="w-12 h-12 md:w-9 md:h-9 rounded-full overflow-hidden relative">
                        <Image src={result?.userFollow?.user?.image} alt='avatar' fill className="object-cover" />
                    </div>
                    <span className="font-bold text-slate-800 md:text-sm text-xl">
                        {result?.userFollow?.user?.name}
                    </span>
                </div>
                {
                    localUserFollow?.id !== result?.userFollow?.user?.id && (
                        <FollowButton
                            userId={localUserFollow?.id}
                            userDotId={result?.userFollow?.user?.id}
                            following={localUserFollow?.following?.some((foll: any) => foll?.userFollow?.user?.id === result?.userFollow?.user?.id)}
                            successFollow={() => followButtonSuccess(1)}
                            successUnfollow={() => followButtonSuccess(-1)}
                        />
                    )
                }
            </div>
        ))
    }

    const emptyView =
        <div className="w-full flex justify-start items-start text-sm text-slate-700">
            {
                follower ? "no follower" : "not following anyone"
            }
        </div>

    return (
        <FullScreenContent bg show={showModal} onChangeState={closeModal} >
            <div className="w-full flex flex-col justify-start items-start gap-5 px-6">
                <span className="text-2xl font-extrabold text-slate-800">
                    {
                        follower ? 'Follower' : 'Following'
                    }
                </span>
                <span className="w-full bg-gradient-to-r from-white/50 via-gray-400 to-white/50 h-[0.8px] rounded-2xl" />
                <div className="w-full max-h-80 overflow-auto flex flex-col justify-start items-start gap-4">
                    <InfiniteFetch
                        ref={ref}
                        url={`/api/user/read/${follower ? 'follower' : 'following'}`}
                        body={{ userId: id }}
                        emptyView={emptyView}
                        successView={(result) => successView(result)}
                        endPage={1}
                    />
                </div>
            </div>
        </FullScreenContent>
    )
}

export default function Profile({ user, totalRecipes, foll }: { user: User, totalRecipes: string, foll: any }) {
    const userId = useSelector((state: any) => state.user.userInfo.id);
    const localFollowing = useSelector((state: any) => state.user.userInfo.following)
    const [userRecipe, setuserRecipe] = useState<any[]>([]);
    const [followLoading, setfollowLoading] = useState(false)
    const [followingCount, setFollowingCount] = useState(foll?._count?.following || 0);
    const [followerCount, setfollowerCount] = useState<number>(foll?._count?.follower || 0)
    const [showFollow, setshowFollow] = useState(false);
    const [followingOrFollower, setFollowingOrFollower] = useState(false);
    const [isNotFollow, setIsNotFollow] = useState(true);
    const [showLoad, setshowLoad] = useState(false);
    const CHECK_END_OF_PAGE_VARIABLE = useSelector((state: any) => state.recipe.endPage);
    const CHECK_IF_FOLLOW = localFollowing.some((follow: any) => follow.userFollow.user.id === user.id) || false;
    const showFollowModal = (follower: boolean) => {
        setFollowingOrFollower(follower)
        setshowFollow(true)
    }
    const { data: session } = useSession();
    const skip = useRef(0)

    const follButtonCallback = (num: number) => {
        setFollowingCount(followingCount + num);
    }

    const fetchRecipes = async () => {
        fetch('/api/user/read/recipe', {
            method: 'POST',
            body: JSON.stringify({
                skip: skip.current,
                userId: user.id
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.length < CHECK_END_OF_PAGE_VARIABLE) {
                    setshowLoad(false);
                } else {
                    setuserRecipe((prev: any) => { return prev.concat(json) });
                    skip.current += 20;
                }
            })
            .catch(error => console.log(error))
    }

    const unfollow = (unfollow: boolean) => {
        if (userId) {
            setfollowLoading(true)
            fetch(`/api/user/${unfollow ? 'delete/unfollow' : 'create/follow'}`, {
                method: 'POST',
                body: JSON.stringify({
                    userId: userId,
                    userDotId: user.id
                })
            })
                .then(() => {
                    setIsNotFollow(unfollow);
                    setfollowerCount(unfollow ? followerCount - 1 : followerCount + 1);
                    setfollowLoading(false);
                    store.dispatch(getUserInfo(session?.user?.email as string));
                })
                .catch(error => console.log(error));
        }
    }

    const recipes = userRecipe.length > 0 && (
        <div className="w-[90%] flex flex-col justify-center items-center md:items-start gap-4 pb-20">
            <div className="text-xl font-bold text-zinc-800">
                Recipes
            </div>
            <div className="w-full flex flex-wrap justify-center items-center md:justify-start md:items-center gap-4 px-3">
                {
                    userRecipe.map((recipe: any) => (
                        <>
                            <RecipeCard
                                title={recipe.title}
                                image={recipe.smallImage}
                                calorie={recipe.calorie}
                                recipeId={recipe.id}
                                serving={recipe.servingTime}
                                shallow
                                link={`/profile/${user.id}/?recipeDetails=${recipe.id}`}
                            />
                        </>
                    ))
                }
            </div>
        </div>
    )

    const loading = showLoad ? (
        <>
            <Observer trigger={() => fetchRecipes()} />
        </>
    ) : userRecipe.length === 0 && (
        <div className="w-full h-[200px] flex flex-col justify-center items-center">
            <span className="text-2xl font-bold">
                No Recipes
            </span>
            <span className="text-sm font-thin text-gray-500">
                Show your recipes to other users
            </span>
        </div>
    )

    const userButton = userId === user.id ? (
        <Link href={'/profile/edit'}>
            <Button small text>
                Edit Profile
            </Button>
        </Link>
    ) : (
        <Button small text={isNotFollow} loading={followLoading}>
            {
                !isNotFollow ? (
                    <div className="flex flex-row gap-1 select-none" onClick={() => unfollow(true)}>
                        <BsCheck2 className="text-lg" />
                        <span className="text-sm font-thin">Followed</span>
                    </div>
                ) : (
                    <div className="flex flex-row gap-1 select-none" onClick={() => unfollow(false)}>
                        <BsPlus className="text-lg" />
                        <span className="text-sm font-thin">Follow</span>
                    </div>
                )
            }
        </Button>
    )

    useEffect(() => {
        setshowLoad(false);
        skip.current = 0;
        setuserRecipe([]);
        setfollowerCount(foll?._count?.follower || 0);
        setFollowingCount(foll?._count?.following || 0);
        CHECK_IF_FOLLOW ? setIsNotFollow(false) : setIsNotFollow(true);
        setTimeout(() => {
            setshowLoad(true)
        }, 1000);
    }, [user.id])

    return (
        <Layout title={user.name}>
            <RecipeDetailsModal route={`/profile/${user.id}`} shallow />
            <FollowListModal
                follower={followingOrFollower}
                showModal={showFollow}
                closeModal={() => setshowFollow(false)}
                id={user.id}
                follButtonCallback={(num: number) => follButtonCallback(num)}
            />
            <div className="min-h-[600px] flex flex-col justify-start items-center gap-10 pb-10">
                <div className="w-full md:w-[600px] flex flex-col md:flex-row justify-center items-center md:justify-start md:items-start gap-4 md:gap-10 mt-20 md:mt-10 px-4">
                    <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden bg-slate-300 relative">
                        <Image src={user.image} alt='avatar profile' fill className="object-cover" />
                    </div>
                    <div className="w-[70%] md:max-w-[400px] flex flex-col justify-center items-center md:justify-start md:items-start gap-3">
                        <div className="flex flex-col">
                            <span className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-800 text-center md:text-start">
                                {user.name}
                            </span>
                            <div className="flex justify-center items-center md:justify-start md:items-start gap-4 text-xs sm:text-sm text-gray-500">
                                <span>
                                    <span className="font-bold text-gray-600">{totalRecipes}</span>&nbsp;
                                    Recipes
                                </span>
                                <span onClick={() => showFollowModal(true)} className='cursor-pointer'>
                                    <span className="font-bold text-gray-600">{followerCount}</span>&nbsp;
                                    Follower
                                </span>
                                <span onClick={() => showFollowModal(false)} className="cursor-pointer">
                                    <span className="font-bold text-gray-600">{followingCount}</span>&nbsp;
                                    Following
                                </span>
                            </div>
                        </div>
                        <div className="text-xs text-zinc-800 text-center md:text-start">
                            {user.description}
                        </div>
                        {userButton}
                    </div>
                </div>
                {recipes}
                {loading}
            </div >
        </Layout >
    )
}

export const getServerSideProps = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({
        where: {
            id: id as string
        },
        select: {
            id: true,
            name: true,
            image: true,
            description: true,
        }
    })

    const totalRecipes = await prisma.recipe.count({
        where: {
            ownerId: id as string
        }
    })

    const foll = await prisma.user.findUnique({
        where: {
            id: id as string
        },
        select: {
            _count: {
                select: {
                    follower: true,
                    following: true
                }
            },
            follower: {
                select: {
                    userFollow: {
                        select: {
                            user: true
                        }
                    }
                }
            },
            following: {
                select: {
                    userFollow: {
                        select: {
                            user: true
                        }
                    }
                }
            },

        }
    })

    return {
        props: {
            user,
            totalRecipes,
            foll
        }
    }
}



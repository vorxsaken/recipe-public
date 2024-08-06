import Layout from "@/components/Layout"
import Collections from "@/components/Collections";
import { Merriweather_Sans } from 'next/font/google';
import type { NextApiRequest, NextApiResponse } from "next";
import { database } from "../api/_base";
const crete = Merriweather_Sans({ weight: '600', subsets: ['latin'] })

export default function collections({ collections }: { collections: any }) {
    
    return (
        <Layout title="Collections">
            <div className="w-full min-h-[700px] md:pl-20 py-2 flex flex-col justify-start md:items-start gap-10 pb-20">
                <div className={`text-3xl font-bold mt-20 text-zinc-800 pl-5 ${crete.className}`}>
                    Collections
                </div>
                <div className="flex flex-wrap justify-center md:justify-start items-start gap-6 px-4">
                    {
                        collections.collections.map((collection: any) => (
                            <Collections
                                key={collection.id}
                                kollection={collection}
                            />
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}


export const getServerSideProps = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;

    const collections = await database.user.findUnique({
        where: {
            id: id as string
        },
        select: {
            collections: {
                include: {
                    recipes: {
                        include: {
                            ratings: true
                        }
                    }
                }
            }
        }
    })

    return {
        props: {
            collections
        }
    }
}
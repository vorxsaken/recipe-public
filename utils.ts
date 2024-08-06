import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from './lib/firebase'
import appetizer from './assets/images/categories/appetizer.jpg'
import beverages from './assets/images/categories/beverages.jpg'
import breakfast from './assets/images/categories/breakfast.webp'
import dessert from './assets/images/categories/dessert.jpg'
import meat from './assets/images/categories/meat.jpg'
import pasta from './assets/images/categories/pasta.webp'
import salads from './assets/images/categories/salads.webp'
import seafood from './assets/images/categories/seafood.jpg'
import soup from './assets/images/categories/soup and stews.jpeg'
import vegetarian from './assets/images/categories/vegetarian.jpg'
import { useEffect, useState } from 'react'

const fetcher = async (url: string, body?: any) => {
    const fetching = await fetch(url, body && body);
    const result = await fetching.json();
    return result;
}

const uploadImages = (smallImage: any, bigImage: any) => {
    return new Promise((resolve) => {
        const smallImageRef = ref(storage, `images/${Date.now()}-small`);
        const bigImageRef = ref(storage, `images/${Date.now()}-big`);
        uploadBytes(smallImageRef, smallImage).then(async () => {
            uploadBytes(bigImageRef, bigImage).then(async () => {
                const smallImageUrl = await getDownloadURL(smallImageRef);
                const bigImageUrl = await getDownloadURL(bigImageRef);
                resolve({
                    smallImage: smallImageUrl,
                    bigImage: bigImageUrl
                })
            })
        })
    })
}

export interface imageType {
    [key: string]: Blob,
}

export interface Follow {
    following: {
        userFollow: {
            user: {
                description: string,
                email: string,
                emailverified: boolean,
                id: string,
                image: string,
                name: string
            }
        }
    }[],
    follower: {
        userFollow: {
            user: {
                description: string,
                email: string,
                emailVerified: boolean,
                id: string,
                image: string,
                name: string
            }
        }
    }[]
}

const categories = [
    {
        name: 'Appetizers',
        image: appetizer
    }, 
    {
        name: 'Soups and stews',
        image: soup
    }, 
    {
        name: 'Beverages',
        image: beverages
    }, 
    {
        name: 'Breakfast',
        image: breakfast
    }, 
    {
        name: 'Dessert',
        image: dessert
    }, 
    {
        name: 'Meat',
        image: meat
    }, 
    {
        name: 'Pasta',
        image: pasta
    }, 
    {
        name: 'Salads',
        image: salads
    }, 
    {
        name: 'Seafood',
        image: seafood
    }, 
    {
        name: 'Vegetarian',
        image: vegetarian
    } 
];

const debounce = (callback: () => void, wait: number) => {
    let timeOut: any = null;
    return (...args: any) => {
        clearTimeout(timeOut);

        timeOut = setTimeout(() => {
            callback.apply(null, args)
        }, wait)
    }
}

const useMediaQuery = (query: any) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => {
            setMatches(media.matches);
        };
        media.addListener(listener);
        return () => media.removeListener(listener);
    }, [matches, query]);

    return matches;
}

export { fetcher, uploadImages, categories, debounce, useMediaQuery }
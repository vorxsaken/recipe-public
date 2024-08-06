import Lottie from 'lottie-react';
import { useEffect, useRef } from 'react';
import LoadingAnimation from '../assets/92025-loading.json'

export default function Observer({ trigger, small }: { trigger: () => void, small?: boolean }) {
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    trigger();
                }
            }
        );
        observer.observe(ref.current as any)
    }, [])

    return (
        <div ref={ref} className="w-full flex justify-center items-center mt-6">
            <Lottie className={small ? 'w-20 md:w-24' : 'w-24 md:w-32'} animationData={LoadingAnimation} />
        </div>
    )
}

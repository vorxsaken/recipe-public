import { ReactElement, useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react'
import Observer from './Observer'

interface InfiniteViewUI {
    url: string,
    body: { [name: string]: any },
    emptyView: ReactElement,
    endView?: ReactElement,
    successView: (res: any) => ReactElement,
    endPage: number
}

const InfiniteFetch = forwardRef(({
    url,
    body,
    emptyView,
    endView,
    successView,
    endPage,
}: InfiniteViewUI, ref) => {
    const [key, setkey] = useState(0)
    const [datas, setdatas] = useState<any>([]);
    const [showLoad, setshowLoad] = useState(true)
    const endOfView = endView || <div></div>;
    var skip = 0;

    const fetcher = async () => {
        const recipe = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ ...body, skip })
        });

        const json = await recipe.json();

        if (json.length < endPage) {
            setshowLoad(false);
        } else {
            const currentData = successView(json) as any;
            setdatas((prev: any) => { return [...prev, ...currentData] })
            skip += 20;
        }
    }

    const loading = showLoad ? (
        <>
            <Observer trigger={() => fetcher()} small />
        </>
    ) : datas.length === 0 ? emptyView : endOfView

    useImperativeHandle(ref, () => ({
        refetch() {
            setdatas([])
            setshowLoad(true);
            setkey((prev) => prev + 1);
        },
        stopLoad() { setshowLoad(false) }
    }))

    return (
        <div className='w-full flex justify-start items-start gap-4 flex-wrap' key={key}>
            {datas}
            {loading}
        </div>
    )
});

InfiniteFetch.displayName = 'InfiniteFetch';
export default InfiniteFetch;
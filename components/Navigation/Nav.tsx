import BottomMenu from './BottomMenu'
import TopMenu from './TopMenu'

export default function Nav() {

  return (
    <>
      <div className='w-full h-16 border-b-2 border-slate-100 flex justify-between items-center fixed md:top-0 
    bottom-0 bg-white z-20 md:px-10'>
        <TopMenu />
        {/* bottom navigation on small screen */}
        <BottomMenu />
      </div>
    </>
  )
}

import RecipeCard from '@/components/RecipeCard'
import Layout from '@/components/Layout'
import InfiniteFetch from '@/components/InfiniteFetch'
import { useEffect, useRef } from 'react'
import RecipeDetailsModal from '@/components/RecipeDetails/RecipeDetailsModal'
import { GetServerSideProps } from 'next';

function Category({category}: {category: string}) {
  const ref = useRef();

  const successView = (results: any) => {
    return results?.map((result: any, index: any) => (
      <RecipeCard
        recipeId={result.id}
        key={result.id}
        image={result.smallImage}
        title={result.title}
        calorie={result.calorie}
        ratings={result.ratings}
        collection={result.collections}
        serving={result.servingTime}
        link={`/category/${category}/?recipeDetails=${result.id}`}
      />
    ))
  }

  const emptyView =
    <div className="w-full flex justify-start items-start text-base md:text-sm text-slate-800 pl-6 md:pl-0 italic">
      Theres no recipe with this category anymore
    </div>

  useEffect(() => {
    (ref.current as any).refetch();
  }, [category])

  return (
    <Layout title={category as string}>
      <RecipeDetailsModal route={`/category/${category}`} />
      <div className='min-h-[700px] flex flex-col justify-start items-center gap-8 py-10 overflow-hidden mt-16 md:mt-0'>
        <div className='w-full text-base text-gray-500 pl-6 md:pl-10'>
          Showing for category :&nbsp;
          <span className='font-bold text-gray-600'>
            {category}
          </span>
        </div>
        <div className='w-full flex justify-center md:justify-center items-start gap-2 md:gap-4 md:pl-10 flex-wrap px-3'>
          <div className='w-full md:w-[90vw]'>
            <InfiniteFetch
              url={`/api/recipe/read/category`}
              body={{ category: category }}
              emptyView={emptyView}
              successView={successView}
              endPage={1}
              ref={ref}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Category

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { category } = ctx.query

  return {
    props: {
      category
    }
  }
}

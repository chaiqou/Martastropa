import React from 'react'
import { db } from '../../../../lib/db'
import { notFound } from 'next/navigation'
import { Button } from '../../../../components/ui/Button'
import Editor from '../../../../components/subreddits/submit-post/Editor'

interface PageProps {
    params: {
        slug: string,
    }
}

const page = async ({params}: PageProps) => {
  const subreddit = db.subreddit.findFirst({
    where: {
        name: params.slug,
    }
  })

  if(!subreddit) return notFound();


  return (
    <div className='flex flex-col items-start gap-6'>
        <div className='border-b border-gray-200 pb-5'>
            <div className='-ml-2 -mt-2 flex flex-wrap items-baseline'>
                <h3 className='ml-2 mt-3 text-base font-semibold leading-6 text-gray-900'>Create Post</h3>
                <p className='ml-2 mt-1 truncate text-sm text-gray-500'>In m/{params.slug}</p>
            </div>
        </div>

        <Editor />
        <div className='w-full flex justify-end'>
            <Button form='subreddit-post-form' className='w-full' type='submit'>Post</Button>
        </div>
    </div>
  )
}

export default page
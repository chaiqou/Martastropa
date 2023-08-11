'use client';
import TextareaAutosize from 'react-textarea-autosize';

const Editor = () => {
  return (
    <div className='w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200'>
        <form className='w-fit ' id='subreddit-post-form'>
            <div className='prose prose-stone dark:prose-invert'>
                <TextareaAutosize placeholder='Title' className='w-full resize-none overflow-hidden appearance-none font-bold outline-none bg-transparent text-5xl' />
            </div>
        </form>
    </div>
  )
}

export default Editor
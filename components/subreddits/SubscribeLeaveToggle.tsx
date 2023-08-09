'use client'
import { useMutation } from '@tanstack/react-query';
import { Button } from '../ui/Button';
import { SubscribeToSubredditPayload } from '../../lib/validators/subreddit';
import axios, { AxiosError } from 'axios';
import { useCustomToast } from '../../hooks/use-custom-toast';
import { toast } from '../../hooks/use-toast';
import { startTransition } from 'react';
import { useRouter } from 'next/navigation';

interface SubscribeLeaveToggleProps {
  isSubscribed: boolean
  subredditId: string
  subredditName: string
}

const SubscribeLeaveToggle = ({
  isSubscribed,
  subredditId,
  subredditName,
}: SubscribeLeaveToggleProps)  => {
  const {loginToast} = useCustomToast();
  const router = useRouter();


  const {mutate: subscribe , isLoading: isSubLoading} = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload  = {
        subredditId,
        subredditName,
        isSubscribed,
      }
      console.log(payload)

      const {data} = await axios.post('/api/subreddit/subscribe', payload);

      return data as string;

    },

    onError: (error) => {
      console.log(error)
      if(error instanceof AxiosError){
        if(error.response?.status === 401){
         return loginToast()
        }
      }

      return toast({
        title: 'There was a problem',
        description: 'Something went wrong , please try again',
        variant: 'destructive',
      });
    },

    onSuccess: () => {
      startTransition(() => {
        router.refresh()
      })

      return toast({
        title: "Subscribed",
        description: `You are now subscribed to m/${subredditName}`
  
      });
    },

  })


  return (
    isSubscribed ? <Button className='w-full mt-1 mb-4'>Leave Community</Button> : <Button  isLoading={isSubLoading} onClick={() => subscribe()} className='w-full mt-1 mb-4'>Join to post</Button>
  )
}

export default SubscribeLeaveToggle;
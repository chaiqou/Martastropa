'use client'
import { useMutation } from '@tanstack/react-query';
import { Button } from '../ui/Button';
import { SubscribeToSubredditPayload } from '../../lib/validators/subreddit';
import axios from 'axios';

interface SubscribeLeaveToggleProps {
  subbreditId: string
}


const SubscribeLeaveToggle = ({subbreditId}) => {
  const isSubscribed = false;


  const {} = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload  = {
        subbreditId,
      }

      const {data} = await axios.post('/api/subreddit/subscribe', payload);

      return data as string;

    }

  })


  return (
    isSubscribed ? <Button className='w-full mt-1 mb-4'>Leave Community</Button> : <Button className='w-full mt-1 mb-4'>Join to post</Button>
  )
}

export default SubscribeLeaveToggle;
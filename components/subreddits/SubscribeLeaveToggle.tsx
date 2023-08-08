'use client'
import { useMutation } from '@tanstack/react-query';
import { Button } from '../ui/Button';

const SubscribeLeaveToggle = () => {
  const isSubscribed = false;


  const {} = useMutation({
    mutationFn: async () => {}
  })


  return (
    isSubscribed ? <Button className='w-full mt-1 mb-4'>Leave Community</Button> : <Button className='w-full mt-1 mb-4'>Join to post</Button>
  )
}

export default SubscribeLeaveToggle;
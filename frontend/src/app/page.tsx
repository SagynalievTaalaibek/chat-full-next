'use client';
import { Typography } from '@mui/material';
import MessageForm from '@/app/components/MessageForm/MessageForm';
import { PostMessage } from '@/types';

export default function Home() {
  const onSubmit = async (newMessage: PostMessage) => {
    console.log(JSON.stringify(newMessage));

  };

  return (
    <>
      <Typography variant="h3">Send new Message</Typography>
      <MessageForm onSubmit={onSubmit} isLoading={false}/>
    </>
  );
}

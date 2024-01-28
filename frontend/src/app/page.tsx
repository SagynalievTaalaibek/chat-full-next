'use client';
import { Typography } from '@mui/material';
import MessageForm from '@/app/components/MessageForm/MessageForm';
import { useMutation } from '@tanstack/react-query';
import axiosApi from '@/axiosApi';
import { PostMessage } from '@/types';

export default function Home() {
  const mutation = useMutation({
    mutationFn: async (postMessage: PostMessage) => {
      await axiosApi.post('/messages', postMessage);
    }
  });

  /*const {data: products, isLoading} = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const productsResponse = await axiosApi.get<Product[]>('/products');
      return productsResponse.data;
    },
  });*/

  const onSubmit = async (newMessage: PostMessage) => {
    await mutation.mutateAsync(newMessage);
  };

  return (
    <>
      <Typography variant="h3">Send new Message</Typography>
      <MessageForm onSubmit={onSubmit} isLoading={mutation.isPending}/>
    </>
  );
}

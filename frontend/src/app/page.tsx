'use client';
import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Grid } from '@mui/material';
import MessageForm from '@/components/MessageForm/MessageForm';
import axiosApi from '@/axiosApi';
import { GetMessage, PostMessage } from '@/types';
import ChatCard from '@/components/ChatCard/ChatCard';

export default function Home() {
  const [datetime, setDatetime] = useState('');
  const [messages, setMessages] = useState<GetMessage[]>([]);

  const mutation = useMutation({
    mutationFn: async (postMessage: PostMessage) => {
      await axiosApi.post('/messages', postMessage);
    }
  });

  const query = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      let url = '/messages';

      if (datetime) {
        url += '?datetime=' + datetime;
      }
      const response = await axiosApi.get<GetMessage[]>(url);
      return response.data;
    },
  });

  const fetchMessages = useCallback(async () => {
    const result = await query.refetch();

    if (result.data && result.data.length > 0) {
      setMessages(prevState => [...prevState, ...result.data]);
      setDatetime(result.data[result.data.length - 1].datetime);
    }

  }, [query.refetch]);

  useEffect(() => {
    void fetchMessages();
    const interval = setInterval(fetchMessages, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchMessages]);


  const onSubmit = async (newMessage: PostMessage) => {
    await mutation.mutateAsync(newMessage);
  };

  return (
    <>
      <MessageForm onSubmit={onSubmit} isLoading={mutation.isPending}/>
      <Grid container spacing={4} sx={{mt: 2}}>
        {messages.map((message) => (
          <ChatCard
            key={message.id}
            author={message.author}
            message={message.message}
            datetime={message.datetime}
          />
        ))}
      </Grid>
    </>
  );
}

'use client';
import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { PostMessage } from '@/types';

interface Props {
  onSubmit: (postMessage: PostMessage) => void;
  isLoading: boolean;
}

const MessageForm: React.FC<Props> = ({onSubmit, isLoading}) => {
  const [title, setTitle] = useState('Send Message');
  const [chat, setChat] = useState({
    message: '',
    author: ''
  });


  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;

    setChat(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onChatSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (chat.message.length === 0 || chat.author.length === 0) {
      setTitle('Write message and author!');
      return;
    } else {
      setTitle('Send Message!');
    }

    onSubmit(chat);
    setChat({
      message: '',
      author: ''
    });
  };

  return (
    <>
      <Typography variant="h3">{title}</Typography>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': {width: '45ch', mt: 1},
        }}
        noValidate
        autoComplete="off"
        onSubmit={onChatSubmit}
      >
        <div>
          <TextField
            id="author"
            name="author"
            label="Author"
            required={chat.author.length === 0}
            value={chat.author}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <TextField
            id="message"
            name="message"
            label="Message"
            multiline
            rows={4}
            required={chat.message.length === 0}
            value={chat.message}
            onChange={(e) => onChange(e)}
          />
        </div>
        <LoadingButton
          type="submit"
          color="primary"
          variant="contained"
          disabled={isLoading}
          loading={isLoading}
          loadingPosition="start"
          startIcon={<SaveIcon/>}
          sx={{mt: 1}}
        >
          Create
        </LoadingButton>
      </Box>
    </>
  );
};

export default MessageForm;
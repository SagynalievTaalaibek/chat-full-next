import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';
dayjs.extend(LocalizedFormat);

interface Props {
  author: string;
  message: string;
  datetime: string;
}

const ChatCard: React.FC<Props> = ({author, message, datetime}) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
      >
        <CardContent sx={{flexGrow: 1}}>
          <Typography gutterBottom variant="h5" component="h2">
            Author: {author}
          </Typography>
          <Typography gutterBottom variant="h6">
            Date: {dayjs(datetime).format('lll')}
          </Typography>
          <Typography>
            {message}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ChatCard;
'use client';

import React, { useState } from 'react';
import { Box, TextField, Typography, Container, Paper, List, ListItem, ListItemText, Divider, useTheme } from '@mui/material';

const dummyHistory = [
  { id: 1, title: 'チャット 1', date: '2023-10-01', preview: 'こんにちは！' },
  { id: 2, title: 'チャット 2', date: '2023-10-02', preview: 'おはようございます！' },
  { id: 3, title: 'チャット 3', date: '2023-10-03', preview: 'こんばんは！' },
];

export default function HistoryPage() {
  const [search, setSearch] = useState('');
  const theme = useTheme();
  const filteredHistory = dummyHistory.filter(chat =>
    chat.title.toLowerCase().includes(search.toLowerCase()) || 
    chat.preview.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ marginTop: 8, padding: 4, borderRadius: 2 }}>
        <Typography component="h1" variant="h4" sx={{ marginBottom: 4, color: 'primary.main', fontWeight: 'bold' }}>
          会話履歴
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="検索..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ marginBottom: 4 }}
        />
        <List>
          {filteredHistory.map((chat) => (
            <React.Fragment key={chat.id}>
              <ListItem 
                button 
                sx={{ 
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'primary.light',
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="h6" color="text.primary">
                      {chat.title}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        {chat.date} - 
                      </Typography>
                      {" " + chat.preview}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
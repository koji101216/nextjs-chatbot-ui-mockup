'use client';

import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, Divider, Typography, IconButton, useMediaQuery, Theme, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';

const dummyChats = [
  { id: 1, title: 'チャット 1' },
  { id: 2, title: 'チャット 2' },
  { id: 3, title: 'チャット 3' },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      padding: 2,
      borderRight: `1px solid ${theme.palette.divider}`,
      bgcolor: 'background.paper',
      boxShadow: 3,
    }}>
      {isSmallScreen && (
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      )}
      <Typography variant="h6" sx={{ marginBottom: 2, color: 'primary.main', fontWeight: 'bold' }}>
        チャット履歴
      </Typography>
      <List>
        {dummyChats.map((chat) => (
          <ListItem key={chat.id} disablePadding>
            <ListItemButton
              onClick={() => router.push(`/chat/${chat.id}`)}
              sx={{
                borderRadius: 1,
                '&:hover': {
                  bgcolor: 'primary.light',
                },
              }}
            >
              <ListItemText primary={chat.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" sx={{ marginBottom: 2, color: 'primary.main', fontWeight: 'bold' }}>
        設定
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => router.push('/settings')}
            sx={{
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'primary.light',
              },
            }}
          >
            <ListItemText primary="プロフィール編集" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'primary.light',
              },
            }}
          >
            <ListItemText primary="通知設定" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" sx={{ marginBottom: 2, color: 'primary.main', fontWeight: 'bold' }}>
        その他
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => router.push('/history')}
            sx={{
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'primary.light',
              },
            }}
          >
            <ListItemText primary="会話履歴" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

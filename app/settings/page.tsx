'use client';

import React, { useState, useContext, useEffect } from 'react';
import { Box, Button, TextField, Typography, Container, Paper, Switch, FormControlLabel, useTheme, Avatar, Grid, Divider, IconButton } from '@mui/material';
import { Brightness4, Brightness7, Notifications, Language, Lock, Security } from '@mui/icons-material';
import { ColorModeContext } from '@/app/theme';
import { useGlobalState } from '@/app/context/GlobalStateContext';

export default function SettingsPage() {
  const { state, dispatch } = useGlobalState();
  const [username, setUsername] = useState(state.username || '');
  const [email, setEmail] = useState(state.email || '');
  const [notifications, setNotifications] = useState(state.notifications);
  const [language, setLanguage] = useState(state.language || '日本語');
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  useEffect(() => {
    dispatch({ type: 'SET_USERNAME', payload: username });
    dispatch({ type: 'SET_EMAIL', payload: email });
    dispatch({ type: 'SET_NOTIFICATIONS', payload: notifications });
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  }, [username, email, notifications, language, dispatch]);

  const handleSave = () => {
    console.log('Settings saved', { username, email, notifications, language });
    // ここに保存ロジックを追加します
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ marginTop: 8, padding: 4, borderRadius: 2, bgcolor: theme.palette.background.paper }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar sx={{ width: 64, height: 64, bgcolor: theme.palette.primary.main, mr: 2 }}>
            {username.charAt(0).toUpperCase() || 'U'}
          </Avatar>
          <Typography component="h1" variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
            設定
          </Typography>
        </Box>
        <Divider sx={{ mb: 4 }} />
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.secondary, fontWeight: 'medium' }}>
              プロフィール編集
            </Typography>
            <TextField
              fullWidth
              id="username"
              label="ユーザー名"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.secondary, fontWeight: 'medium' }}>
              アプリケーション設定
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  name="notifications"
                  color="primary"
                />
              }
              label="通知を有効にする"
              sx={{ mb: 2, display: 'flex' }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={theme.palette.mode === 'dark'}
                  onChange={colorMode.toggleColorMode}
                  name="darkMode"
                  color="primary"
                />
              }
              label="ダークモード"
              sx={{ mb: 2, display: 'flex' }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Language sx={{ mr: 1 }} />
              <Typography variant="body1">言語: {language}</Typography>
              <IconButton size="small" sx={{ ml: 1 }}>
                <Lock />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Security />}
            onClick={() => console.log('セキュリティ設定')}
          >
            セキュリティ設定
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ py: 1.5, px: 4, fontSize: '1.1rem' }}
          >
            保存
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

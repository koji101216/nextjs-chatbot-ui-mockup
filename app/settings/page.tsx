'use client';

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Paper, Switch, FormControlLabel, useTheme } from '@mui/material';

export default function SettingsPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(true);
  const theme = useTheme();

  const handleSave = () => {
    console.log('Settings saved', { username, email, notifications });
    // ここに保存ロジックを追加します
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ marginTop: 8, padding: 4, borderRadius: 2, bgcolor: theme.palette.background.paper }}>
        <Typography component="h1" variant="h4" sx={{ marginBottom: 4, color: theme.palette.primary.main, fontWeight: 'bold' }}>
          設定
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Typography variant="h6" sx={{ marginBottom: 2, color: theme.palette.text.secondary }}>
            プロフィール編集
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="ユーザー名"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 4 }}
          />
          <Typography variant="h6" sx={{ marginTop: 4, marginBottom: 2, color: theme.palette.text.secondary }}>
            通知設定
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
            sx={{ marginBottom: 4 }}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1.1rem' }}
          >
            保存
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
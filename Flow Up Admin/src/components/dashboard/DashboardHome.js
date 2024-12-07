// src/components/dashboard/DashboardHome.js
import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function DashboardHome() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        <Item>
          <Typography variant="h6">Total Users</Typography>
          <Typography variant="h3">1,234</Typography>
        </Item>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Item>
          <Typography variant="h6">Active Users</Typography>
          <Typography variant="h3">789</Typography>
        </Item>
      </Grid>
      {/* Add more statistics widgets */}
    </Grid>
  );
}
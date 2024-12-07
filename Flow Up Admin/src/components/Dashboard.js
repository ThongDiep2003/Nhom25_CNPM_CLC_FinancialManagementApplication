// src/components/Dashboard.js
import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  People as PeopleIcon,
  Category as CategoryIcon,
  Forum as ForumIcon,
  Logout as LogoutIcon,
  BarChart as BarChartIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
// Import Users component
import Users from './dashboard/Users';
import Forum from './dashboard/Forum';
import Statistics from './dashboard/Statistics';

const drawerWidth = 240;

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: drawerWidth,
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export default function Dashboard() {
  const [selectedMenu, setSelectedMenu] = useState('users');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const menuItems = [
    { id: 'users', text: 'Users', icon: <PeopleIcon /> },
    // { id: 'categories', text: 'Categories', icon: <CategoryIcon /> },
    { id: 'forum', text: 'Forum', icon: <ForumIcon /> },
    { id: 'statistics', text: 'Statistics', icon: <BarChartIcon /> },
  ];

  const renderContent = () => {
    switch (selectedMenu) {
      case 'users':
        return <Users />;
      case 'forum':
        return <Forum />;
      case 'statistics':
        return <Statistics />; // Thêm case này
      default:
        return null;
    }
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <StyledAppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </StyledAppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: drawerWidth, 
            boxSizing: 'border-box' 
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.id}
                selected={selectedMenu === item.id}
                onClick={() => setSelectedMenu(item.id)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Box sx={{ position: 'fixed', bottom: 0, width: drawerWidth }}>
            <List>
              <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Main>
        <Toolbar />
        {renderContent()}
      </Main>
    </Box>
  );
}
import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useTheme,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { getDatabase, ref, onValue } from 'firebase/database';

export default function Statistics() {
  const theme = useTheme();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    blockedUsers: 0,
    totalPosts: 0,
    totalReplies: 0,
    userTransactions: {},
    topUsers: [], // Thêm state cho top users
  });

  useEffect(() => {
    const db = getDatabase();
    
    // Fetch users data
    const usersRef = ref(db, 'users');
    const forumRef = ref(db, 'forum');

    // Lắng nghe thay đổi từ cả users và forum
    Promise.all([
      new Promise(resolve => onValue(usersRef, resolve)),
      new Promise(resolve => onValue(forumRef, resolve))
    ]).then(([usersSnapshot, forumSnapshot]) => {
      const users = usersSnapshot.val() || {};
      const forums = forumSnapshot.val() || {};

      const userCount = Object.keys(users).length;
      const blockedCount = Object.values(users).filter(user => user.status === 'blocked').length;

      // Tính toán số lượng post và reply cho mỗi user
      const userActivity = {};
      Object.values(forums).forEach(forum => {
        // Đếm posts
        const posterEmail = forum.email;
        userActivity[posterEmail] = userActivity[posterEmail] || { posts: 0, replies: 0 };
        userActivity[posterEmail].posts++;

        // Đếm replies
        if (forum.replies) {
          Object.values(forum.replies).forEach(reply => {
            const replierEmail = reply.email;
            userActivity[replierEmail] = userActivity[replierEmail] || { posts: 0, replies: 0 };
            userActivity[replierEmail].replies++;
          });
        }
      });

      // Sắp xếp users theo hoạt động
      const topUsers = Object.entries(userActivity)
        .map(([email, activity]) => ({
          email,
          totalActivity: activity.posts + activity.replies,
          posts: activity.posts,
          replies: activity.replies,
        }))
        .sort((a, b) => b.totalActivity - a.totalActivity)
        .slice(0, 5); // Lấy top 5 users

      setStats(prev => ({
        ...prev,
        totalUsers: userCount,
        activeUsers: userCount - blockedCount,
        blockedUsers: blockedCount,
        totalPosts: Object.keys(forums).length,
        totalReplies: Object.values(forums).reduce((acc, forum) => 
          acc + (forum.replies ? Object.keys(forum.replies).length : 0), 0),
        topUsers,
      }));
    });
  }, []);

  const userChartData = [
    { name: 'Active Users', value: stats.activeUsers },
    { name: 'Blocked Users', value: stats.blockedUsers },
  ];

  const COLORS = ['#4CAF50', '#FF5722'];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Statistics Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">Total Users</Typography>
              <Typography variant="h3" sx={{ mt: 2, color: theme.palette.primary.main }}>
                {stats.totalUsers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">Forum Posts</Typography>
              <Typography variant="h3" sx={{ mt: 2, color: theme.palette.secondary.main }}>
                {stats.totalPosts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">Total Replies</Typography>
              <Typography variant="h3" sx={{ mt: 2, color: theme.palette.success.main }}>
                {stats.totalReplies}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* User Distribution Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              User Status Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Top Users Table */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Most Active Users
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell align="right">Posts</TableCell>
                    <TableCell align="right">Replies</TableCell>
                    <TableCell align="right">Total Activity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stats.topUsers.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>{user.email}</TableCell>
                      <TableCell align="right">{user.posts}</TableCell>
                      <TableCell align="right">{user.replies}</TableCell>
                      <TableCell align="right">{user.totalActivity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Activity Summary */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Overall Activity Summary
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Metric</TableCell>
                    <TableCell align="right">Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Average Posts per User</TableCell>
                    <TableCell align="right">
                      {(stats.totalPosts / (stats.totalUsers || 1)).toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Average Replies per Post</TableCell>
                    <TableCell align="right">
                      {(stats.totalReplies / (stats.totalPosts || 1)).toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>User Engagement Rate</TableCell>
                    <TableCell align="right">
                      {((stats.activeUsers / (stats.totalUsers || 1)) * 100).toFixed(1)}%
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
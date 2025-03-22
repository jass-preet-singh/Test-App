import React, { lazy, Suspense, useState } from 'react';
import { AppBar, Box, CircularProgress, Tab, Tabs, Typography } from '@mui/material';
import { Image, Person } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '../store';
import { setActiveTab, TabType } from '../redux/tab/tabSlice';

const UserList = lazy(() => import("./UserList"));
const Carousel = lazy(() => import("./Carousel"));

const TabContainer = () => {
  const dispatch = useAppDispatch()
  const activeTab = useAppSelector((state) => state.tabs.activeTab);

  const handleChange = (event: React.SyntheticEvent, newValue: TabType) => {
    dispatch(setActiveTab(newValue))
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h4" gutterBottom textAlign="center" pt={3}>
          Tabs Management - Users & Carousel
        </Typography>

        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          {/* Tabs */}
          <Tabs
            value={activeTab}
            onChange={handleChange}
            aria-label="icon position tabs example"

          >
            <Tab icon={<Person />} label="User List" value="USERS" />
            <Tab icon={<Image />} label="Image Carousel" value="CAROUSEL" />
          </Tabs>

        </Box>

        {/* Tab Content */}

        <Suspense fallback={<Box display="flex" justifyContent="center" mt={3}><CircularProgress /></Box>}>
          <div style={{ marginTop: "20px" }}>
            {activeTab === "USERS" && <UserList />}
            {activeTab === "CAROUSEL" && <Carousel />}
          </div>
        </Suspense>

      </Box>
    </>
  );
}
export default TabContainer
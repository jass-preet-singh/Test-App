import React, { lazy, Suspense } from 'react';
import { Box, CircularProgress, Tab, Tabs, Typography } from '@mui/material';
import { Image, Person } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '../store';
import { setActiveTab, TabType } from '../redux/tab/tabSlice';

const UserList = lazy(() => import("./UserList"));
const Carousel = lazy(() => import("./Carousel"));

const tabStyles = {
  minHeight: "40px",
  maxHeight: "40px",
  padding: "4px 12px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "120px",
  position: "relative",
  fontSize: "12px",
  "&.active::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "50%",
    width: "70px", // Fixed width for indicator
    height: "2px",
    backgroundColor: "primary.main",
    transform: "translateX(-50%)", // Centers the border under the tab
  },
};

const TabContainer = () => {
  const dispatch = useAppDispatch()
  const activeTab = useAppSelector((state) => state.tabs.activeTab);

  const handleChange = (event: React.SyntheticEvent, newValue: TabType) => {
    dispatch(setActiveTab(newValue))
  };


  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h5" gutterBottom textAlign="center" pt={3}>
          Tabs Management - Users & Carousel
        </Typography>

        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} marginTop={3}>
          {/* Tabs */}
          <Tabs
            value={activeTab}
            onChange={handleChange}
            aria-label="icon position tabs example"
            sx={{
              display: "flex",
              justifyContent: "center",
              "& .MuiTabs-indicator": {
                display: "none", // Hides the default indicator
              },
            }}          >
            <Tab
              icon={<Person />}
              label="User List"
              value="USERS"
              className={activeTab === "USERS" ? "active" : ""}
              sx={tabStyles} // Ensures icon and text are inline
            />
            <Tab
              icon={<Image />}
              label="Image Carousel"
              value="CAROUSEL"
              className={activeTab === "CAROUSEL" ? "active" : ""}
              sx={tabStyles}

            />
          </Tabs>

        </Box>

        {/* Tab Content */}

        <Suspense fallback={<Box display="flex" justifyContent="center" mt={3}><CircularProgress /></Box>}>
          {activeTab === "USERS" && <UserList />}
          {activeTab === "CAROUSEL" && <Carousel />}
        </Suspense>

      </Box>
    </>
  );
}
export default TabContainer
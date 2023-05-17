import { useState ,useEffect } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Popover ,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { Badge } from "@mui/material";
import axios from 'axios';

const DirecteurNavbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const token = useSelector((state) => state.token);

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;
  const role = `${user.role}`;

  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:3001/notifications/read', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const fetchedNotifications = response.data;
        setNotifications(fetchedNotifications);
      } else {
        throw new Error('Failed to fetch notifications');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:3001/notifications/read', {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.status === 200) {
          const fetchedNotifications = response.data;
          setNotifications(fetchedNotifications);
        } else {
          throw new Error('Failed to fetch notifications');
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchNotifications();
  }, []);

  const markNotificationAsRead = async (notificationId) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/notifications/${notificationId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        // Update the notifications state to mark the notification as read
        const updatedNotifications = notifications.map((notification) => {
          if (notification.id === notificationId) {
            return { ...notification, status: 'read' };
          }
          return notification;
        });
        setNotifications(updatedNotifications);
        fetchNotifications();
      } else {
        throw new Error('Failed to mark notification as read');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sortedNotifications = [...notifications].sort((a, b) => {
    // Assuming each notification has a timestamp property
    return new Date(b.timestamp) - new Date(a.timestamp);
  });


 
  
  
  


  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/directeur")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Gofacture
        </Typography>
        
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Recherche..." />
            <IconButton>
              <Search />
            </IconButton>
            
          </FlexBetween>
        )}
      </FlexBetween>
      
          
      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>

      <IconButton aria-describedby={id} onClick={handleClick}>
      <Badge badgeContent={notifications.filter(notification => notification.status === 'unread').length} color="error">
        <Notifications sx={{ fontSize: "25px" }} />
      </Badge>
    </IconButton>

    {/* Popover */}
    <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          PaperProps={{
            sx: {
              p: 2, // Adjust the padding as needed
            },
          }}
        >

          {sortedNotifications.map((notification, index) => (
            <Typography
              key={notification._id}
              sx={{
                p: 1, // Adjust the padding within each notification
                backgroundColor: notification.status === 'read' ? theme.palette.background.paper : theme.palette.background.default,
                color: theme.palette.text.primary,
                cursor: 'pointer',
                mb: index !== notifications.length - 1 ? 1 : 0, // Add margin-bottom to all notifications except the last one
                borderRadius: '8px', // Add border radius
              }}
              onClick={() => markNotificationAsRead(notification._id)}
            >
              {notification.message}
            </Typography>
          ))}
        </Popover>
          
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={role}>
                <Typography>  Privilege : {role}</Typography>
              </MenuItem>
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Sortir</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>

            <IconButton onClick={handleClick}>
            <Badge badgeContent={notifications.length} color="error">
              <Notifications sx={{ fontSize: "25px" }} />
            </Badge>
          </IconButton>

          {/* Popover */}
          <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          PaperProps={{
            sx: {
              p: 2, // Adjust the padding as needed
            },
          }}
        >
          {notifications.map((notification, index) => (
            <Typography
              key={notification.id}
              sx={{
                p: 1, // Adjust the padding within each notification
                backgroundColor: notification.status === 'read' ? '#e0e0e0' : '#ffffff',
                cursor: 'pointer',
                mb: index !== notifications.length - 1 ? 1 : 0, // Add margin-bottom to all notifications except the last one
                borderRadius: '8px', // Add border radius
              }}
              onClick={() => markNotificationAsRead(notification.id)}
            >
              {notification.message}
            </Typography>
          ))}
        </Popover>




            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
              
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default DirecteurNavbar;

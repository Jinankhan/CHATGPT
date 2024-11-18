import { Box, Stack } from '@mui/system';
import newchat from '../../../../public/assets/new-chat.svg';
import info from '../../../../public/assets/info.svg';
import menu from '../../../../public/assets/menu.svg';
import chevronDown from '../../../../public/assets/chevron-down.svg';
import { Button, Typography } from '@mui/material';
import Avatar from '../../atoms/avatar';
import Popper from '../../molecules/popper';
import ProfileModal from '../../molecules/profileModal';
import React, { useContext, useState } from 'react';
import TemporaryChatModal from '../../molecules/temporaryChatModal';
import { useNavigate } from 'react-router-dom';
import { chatContext } from '../../../context';
import { useAuth0 } from '@auth0/auth0-react';
import AdvancedFeaturesModal from '../../molecules/advanceFeaturesModal';

const Header = () => {
  const [anchor, setAnchor] = useState<
    null | HTMLButtonElement | HTMLDivElement
  >(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [openTemporaryChat, setOpenTemporaryChat] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { user, setChatData, setShowSidebar, showSidebar } =
    useContext(chatContext);
  const navigate = useNavigate();
  const { logout } = useAuth0();
  const handleClick = (value: string) => {
    switch (value) {
      case 'Log out': {
        setChatData([]);
        localStorage.removeItem('local');
        localStorage.removeItem('user');
        logout();
      }
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: '12px',
        position: 'fixed',
        width: showSidebar ? '80%' : '96%',
        background: '#212121'
      }}
    >
      <Stack direction="row" alignItems="center" columnGap="8px">
        {!showSidebar && (
          <>
            {user.isLoggedIn && (
              <Box
                sx={{ cursor: 'pointer' }}
                onClick={() => setShowSidebar(true)}
              >
                <img src={menu} alt="icon" width={24} height={24} />
              </Box>
            )}
            <Box
              onClick={() => {
                localStorage.removeItem('local');
                setChatData([]);
                navigate('/');
              }}
              sx={{ cursor: 'pointer' }}
            >
              <img src={newchat} alt="icon" width={24} height={24} />
            </Box>
          </>
        )}

        <Button
          variant="text"
          endIcon={<img src={chevronDown} alt="icon" width={18} height={18} />}
          disableFocusRipple
          disableTouchRipple
          sx={{
            textTransform: 'none',
            color: '#B4B4B4',
            fontWeight: 600,
            fontSize: '18px',
            padding: '6px 12px',
            borderRadius: '.5rem',
            '&:hover': {
              background: '#2f2f2f'
            }
          }}
          onClick={(e) => {
            setOpenProfile(false);
            setAnchor(e.currentTarget);
            setOpenTemporaryChat(true);
          }}
        >
          {user.isLoggedIn ? 'ChatGPT' : 'CHATGPT 4o mini'}
        </Button>
      </Stack>

      {user.isLoggedIn && (
        <Stack
          direction="row"
          alignItems="center"
          columnGap="5px"
          marginRight="150px"
        >
          <Typography
            variant="h3"
            fontSize="14px"
            fontWeight="600"
            color="#B4B4B4"
          >
            Memory full
          </Typography>
          <img src={info} alt="icon" width={18} height={18} />
        </Stack>
      )}
      {user.isLoggedIn ? (
        <Avatar
          src={user.profile}
          onClick={(e) => {
            setOpenTemporaryChat(false);
            setOpenProfile(true);
            setAnchor(e.currentTarget);
          }}
        />
      ) : (
        <Box sx={{ display: 'flex', gap: '10px', height: '30px' }}>
          <Button
            disableFocusRipple
            disableTouchRipple
            sx={{
              background: '#fff',
              color: '#0D0D0D',
              textTransform: 'none',
              padding: '4px 12px',
              borderRadius: 99999,
              '&:hover': { background: '#fff' },
              boxShadow: 'none',
              fontSize: '.875rem'
            }}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button
            disableFocusRipple
            disableTouchRipple
            sx={{
              background: '#212121',
              border: '1px solid hsla(0,0%,100%,.1)',
              color: '#ECECEC',
              textTransform: 'none',
              padding: '4px 12px',
              borderRadius: 99999,
              '&:hover': { background: '#212121' },
              boxShadow: 'none',
              fontSize: '.875rem'
            }}
            onClick={() => navigate('/login')}
          >
            Sign up
          </Button>
        </Box>
      )}

      <Popper
        anchor={anchor}
        open={openTemporaryChat}
        handleClose={() => setOpenTemporaryChat(false)}
        parent={
          user.isLoggedIn ? (
            <TemporaryChatModal
              isChecked={isChecked}
              handleChange={(value: boolean) => setIsChecked(value)}
            />
          ) : (
            <AdvancedFeaturesModal handleClick={() => navigate('/login')} />
          )
        }
        width={'340px'}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ top: 29 }}
      />
      <Popper
        anchor={anchor}
        open={openProfile}
        handleClose={() => setOpenProfile(false)}
        parent={<ProfileModal handleClick={handleClick} />}
        width={'260px'}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ top: 29 }}
      />
    </Box>
  );
};

export default Header;

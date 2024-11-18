import { Box, Stack, Typography } from '@mui/material';
import React, { useContext } from 'react';
import gptPlan from '../../../../public/assets/gpt-plan.svg';
import gpt from '../../../../public/assets/gpt.svg';
import explore from '../../../../public/assets/explore.svg';
import newchat from '../../../../public/assets/new-chat.svg';
import menu from '../../../../public/assets/menu.svg';
import { chatContext } from '../../../context';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const { showSidebar, setShowSidebar, setCurrentChat, chatData, setChatData } =
    useContext(chatContext);
  interface Item {
    date: string;
    title: string;
    text: string;
  }
  const handleTimeFrame = (date: string) => {
    const currentDate = new Date();
    const day_difference = Number(
      (
        (currentDate.getTime() - new Date(Number(date)).getTime()) /
        (60 * 60 * 24 * 1000)
      ).toFixed()
    );
    console.log(day_difference);
    switch (true) {
      case day_difference === 0:
        return 'Today';
      case day_difference === 1:
        return 'Yesterday';
      case day_difference <= 7:
        return 'Previous 7 Days';
      case day_difference <= 30:
        return 'Previous 30 Days';
      default:
        return new Date(date).toLocaleString('default', { month: 'long' });
    }
  };

  const updated = chatData
    .sort((a, b) => new Date(a.id).getTime() - new Date(b.id).getTime())
    .map((item) => ({
      date: item.id,
      title: handleTimeFrame(item.id),
      text: item.chat[0]?.agent.substring(0, 24) ?? ''
    }));

  const time_slots: string[] = [];
  const chat_record: Record<string, Item[]> = updated.reduce((acc, item) => {
    if (acc[item.title]) {
      acc[item.title].push(item);
    } else {
      time_slots.push(item.title);
      acc[item.title] = [item];
    }
    return acc;
  }, {} as Record<string, Item[]>);

  return (
    showSidebar && (
      <Box
        sx={{
          width: '18vw',
          height: '100%',
          background: '#171717',
          paddingLeft: '.75rem',
          paddingRight: '.75rem',
          overflowY: 'auto',
          position: 'relative',
          animation: 'expandSidebar 1s ease-out',
          '@keyframes expandSidebar': {
            '0%': { width: '0vw' },
            '30%': { width: '6vw' },
            '50%': { width: '12vw' },
            '70%': { width: '16vw' },
            '85%': { width: '17vw' },
            '100%': { width: '18vw' }
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '5px',
            height: '30px',
            position: 'sticky',
            top: 0,
            background: '#171717',
            zIndex: 1000
          }}
        >
          <Box onClick={() => setShowSidebar(false)} sx={{ cursor: 'pointer' }}>
            <img src={menu} alt="newchat" width={24} height={24} />
          </Box>
          <Box
            onClick={() => {
              localStorage.removeItem('local');
              setChatData([]);
              setShowSidebar(false);
            }}
          >
            <img
              src={newchat}
              alt="newchat"
              width={24}
              height={24}
              style={{ cursor: 'pointer' }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '2px',
            marginBottom: '12px',
            marginTop: '56px',
            height: '80px'
          }}
        >
          <Stack direction="row" alignItems="center" gap="5px">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1px',
                borderRadius: '50%',
                border: '1px solid hsla(0,0%,100%,.1)'
              }}
            >
              <img src={gpt} alt="gpt" height={18} width={18} />
            </Box>
            <Typography fontSize="14px" color="#ECECEC">
              ChatGpt
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap="5px">
            <img src={explore} alt="explore" height={18} width={18} />
            <Typography fontSize="14px" color="#ECECEC">
              Explore Gpts
            </Typography>
          </Stack>
        </Box>

        <Box sx={{ marginBottom: '70px', position: 'sticky' }}>
          {time_slots.map((slot) => (
            <Box key={slot} sx={{ color: '#ECECEC', marginTop: '15px' }}>
              <Typography fontSize="12px">{slot}</Typography>
              {chat_record[slot].map((record) => (
                <Box
                  key={record.title}
                  sx={{
                    padding: '8px',
                    '&:hover': {
                      background: '#2F2F2F',
                      borderRadius: '.5rem',
                      cursor: 'pointer'
                    }
                  }}
                  onClick={() => {
                    setCurrentChat(record.date);
                    navigate(`/chat?chat-id=${record.date}`);
                  }}
                >
                  <Typography fontSize="14px">{record.text}</Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            bottom: 1,
            position: 'absolute',
            cursor: 'pointer',
            background: '#171717',
            zIndex: 99,
            padding: '10px 0',
            marginTop: 'auto'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '3px',
              alignItems: 'center',
              padding: '8px 8px',
              '&:hover': {
                background: '#2f2f2f'
              },
              borderRadius: '0.5rem',
              marginBottom: '4px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%',
                padding: '5px',
                border: '1px solid hsla(0,0%,100%,.1)'
              }}
            >
              <img src={gptPlan} alt="icon" width={18} height={18} />
            </Box>

            <Stack flex={1}>
              <Typography color="white" fontSize="14px">
                Upgrade Plans
              </Typography>
              <Typography color="#9B9B9B" fontSize="12px">
                More access to the best models
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    )
  );
};

export default Sidebar;

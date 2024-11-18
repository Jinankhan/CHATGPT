import { Box, Button, Stack, Typography } from '@mui/material';
import TextField from '../../atoms/textfield/index';
import { TASK_LISTS } from '../../../constants';
import Chip from '../../atoms/chip';
import stop from '../../../../public/assets/stop.svg';
import share from '../../../../public/assets/share.svg';
import React, { useContext } from 'react';
import { chatContext } from '../../../context';
interface ITaskprops {
  name: string;
  src: string;
}
interface IChatPromptProps {
  handleChange: (name: string) => void;
  handleClick: () => void;
  data: ITaskprops[];
  showAllTasks: boolean;
  handleFileUpload: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isEmpty: boolean;
  handleQuery: (value: number) => void;
  handleTaskClick: (task: string) => void;
}

const ChatPrompt = (props: IChatPromptProps) => {
  const data = props.showAllTasks ? props.data : props.data.slice(0, 4);

  const { user } = useContext(chatContext);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '15px'
      }}
    >
      <Typography
        variant="h1"
        fontSize="30px"
        fontWeight="600"
        className="suggestion"
        lineHeight="2.25rem"
        sx={{ marginBottom: '10px' }}
      />

      <TextField
        onChange={(e) => props.handleChange(e.target.value)}
        onKeyDown={(e) => props.handleQuery(e.which)}
        placeholder="Message ChatGPT"
        sx={{ maxWidth: '800px' }}
        startAdornment={
          user.isLoggedIn && (
            <Button
              disableFocusRipple
              disableTouchRipple
              disableElevation
              variant="text"
              sx={{ '&:hover': { background: 'none' } }}
              onClick={(e) => props.handleFileUpload(e)}
            >
              <img src={share} alt="share" />
            </Button>
          )
        }
        endAdornment={
          <Box
            sx={{
              width: '30px',
              height: '30px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '50%',
              background: props.isEmpty ? 'grey' : 'white',
              opacity: props.isEmpty ? 0.3 : 1
            }}
            onClick={() => {
              props.handleQuery(13);
            }}
          >
            <img src={stop} alt="stop" />
          </Box>
        }
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '5px 5px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: '679px',
          marginTop: '15px',
          translate: 'transformY(0)',
          animation: 'animate 2s  ease-in-out',
          '@keyframes animate': {
            '0%': { transform: 'translateY(10px)', visibility: 'hidden' },
            '50%': { visibility: 'hidden' },
            '100%': { transform: 'translateY(0px)', visibility: 'visible' }
          }
        }}
      >
        {data.map((item) => {
          return (
            <Chip
              key={item.name}
              label={
                <Stack direction={'row'} columnGap={1} alignItems="center">
                  <img src={item.src} alt={item.name} width={18} height={18} />
                  <Typography variant="h1" fontSize="13px">
                    {item.name}
                  </Typography>
                </Stack>
              }
              background="#212121"
              chipcolor="#9B9B9B"
              onClick={() => props.handleTaskClick(item.name)}
            />
          );
        })}
        {TASK_LISTS.length > 4 && !props.showAllTasks && (
          <Chip
            label="more"
            onClick={() => props.handleClick()}
            background="#212121"
            chipcolor="#9B9B9B"
          />
        )}
      </Box>
    </Box>
  );
};

export default ChatPrompt;

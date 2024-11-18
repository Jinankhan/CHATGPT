import { Box, Button, Typography } from '@mui/material';
import { FILE_UPLOAD_TYPE, TASK_LISTS } from '../../../constants';
import ChatPrompt from '../../molecules/chatPrompt';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popper from '../../molecules/popper';
import { useLLMInference } from '../../../hooks/updatedhook';
import { chatContext } from '../../../context';

const LandingChat = () => {
  const [openFileUploadModal, setShowFileUploadModal] = useState(false);
  const [anchor, setAnchor] = useState<null | HTMLButtonElement>(null);
  const [showAllTasks, setShowAllTasks] = useState(false);
  const { handleUserInput, value } = useLLMInference();
  const navigate = useNavigate();
  const { setChatData, setCurrentChat } = useContext(chatContext);

  const FileSelectModal = () => {
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            height: '159px',
            background: '#2f2f2f',
            borderRadius: '1rem',
            color: 'white',
            padding: '4px',
            border: '1px solid hsla(0,0%,100%,.1)',
            cursor: 'pointer'
          }}
        >
          {FILE_UPLOAD_TYPE.map((item) => {
            return (
              <>
                <Button
                  key={item.name}
                  component="label"
                  sx={{
                    margin: '0px 8px',
                    justifyContent: 'flex-start',
                    color: 'white',
                    textTransform: 'none',
                    padding: '12px',
                    borderRadius: '.375rem',
                    '&:hover': { background: 'hsla(0,0%,100%,.1)' }
                  }}
                  startIcon={
                    <img
                      src={item.src}
                      alt={item.name}
                      width={20}
                      height={20}
                    />
                  }
                >
                  <Typography variant="h1" fontSize="14px">
                    {item.name}
                  </Typography>
                  {item.name === 'Upload from computer' && (
                    <input
                      type="file"
                      onChange={(e) => {
                        setShowFileUploadModal(false);
                        console.log(e.target.files);
                      }}
                      multiple
                      style={{ display: 'none' }}
                    />
                  )}
                </Button>

                {item.name === 'Connect to Microsoft onedrive' && (
                  <Box
                    sx={{
                      width: '100%',
                      backgroundColor: 'hsla(0,0%,100%,.1)',
                      padding: '0.5px'
                    }}
                  />
                )}
              </>
            );
          })}
        </Box>
      </>
    );
  };
  return (
    <>
      <ChatPrompt
        handleTaskClick={(task) => {
          localStorage.setItem('user-query', task);
          navigate('/chat');
        }}
        handleChange={(name) => {
          handleUserInput(name);
        }}
        handleQuery={(key: number) => {
          if (key == 13 && value.length > 1) {
            const session = Date.now().toString();
            setChatData((prev) => [...prev, { chat: [], id: session }]);
            localStorage.setItem('user-query', value);
            setCurrentChat(session);
            navigate(`/chat?chat-id=${session}`);
          }
        }}
        handleClick={() => {
          setShowAllTasks(true);
        }}
        data={TASK_LISTS}
        showAllTasks={showAllTasks}
        handleFileUpload={(target: React.MouseEvent<HTMLButtonElement>) => {
          setAnchor(target.currentTarget);
          setShowFileUploadModal(true);
        }}
        isEmpty={value.length == 0}
      />

      <Popper
        anchor={anchor}
        open={openFileUploadModal}
        handleClose={() => setShowFileUploadModal(false)}
        parent={<FileSelectModal />}
        width={'340px'}
      />
    </>
  );
};

export default LandingChat;

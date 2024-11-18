import Header from '../../components/organisms/header/index';
import HomeTemplate from '../../templates/homeTemplate';
import Typography from '@mui/material/Typography';
import { Box, Button, Stack, Tooltip } from '@mui/material';
import TextField from '../../components/atoms/textfield/index';
import start from '../../../public/assets/stop.svg';
import share from '../../../public/assets/share.svg';
import React, { useContext, useEffect } from 'react';
import gpt from '../../../public/assets/gpt.svg';
import copyIcon from '../../../public/assets/copyIcon.svg';
import { chatContext } from '../../context';
import { MODEL_RESPONSE_ICONS } from '../../constants';
import pause from '../../../public/assets/pause.svg';
import CodeBlock from '../../components/organisms/codeblock';
import { STREAM_STATE, useLLMInference } from '../../hooks/updatedhook';

const ConversationPage = () => {
  const {
    chatData,
    handleUserInput,
    initiateInference,
    handleStreamInterrupt,
    value,
    streamState
  } = useLLMInference();

  const { currentChat } = useContext(chatContext);
  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const presentChat = chatData.find((c) => c.id === currentChat)?.chat;
  useEffect(() => {
    const query = localStorage.getItem('user-query');
    query && initiateInference(query, currentChat ?? '');
  }, []);

  const { user } = useContext(chatContext);

  localStorage.setItem('local', JSON.stringify(chatData));
  return (
    <HomeTemplate
      height="100%"
      header={<Header />}
      footer={
        <>
          <TextField
            onChange={(e) => handleUserInput(e.target.value)}
            value={streamState === STREAM_STATE.SETTLED ? '' : value}
            onKeyDown={(e) => {
              if (e.which == 13 && value.length > 1) {
                e.preventDefault();
                initiateInference('', currentChat ?? '');
              }
            }}
            placeholder="Message ChatGPT"
            sx={{
              maxWidth: '790px',
              '@media (max-width: 1031px)': {
                maxWidth: '550px'
              }
            }}
            startAdornment={
              <Button
                disableFocusRipple
                disableTouchRipple
                disableElevation
                variant="text"
                sx={{ '&:hover': { background: 'none' } }}
              >
                <img src={share} alt="share" />
              </Button>
            }
            endAdornment={
              streamState === STREAM_STATE.ONGOING ? (
                <Box
                  sx={{
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '50%',
                    background: 'white',
                    opacity: 1,
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    handleStreamInterrupt();
                  }}
                >
                  <img src={pause} alt="stop" />
                </Box>
              ) : (
                <Box
                  sx={{
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: value.length != 0 ? 'white' : 'grey',
                    opacity: value.length != 0 ? 1 : 0.3,
                    cursor: value.length != 0 ? 'pointer' : 'default',
                    borderRadius: '50%'
                  }}
                  onClick={() => {
                    initiateInference('', currentChat ?? '');
                  }}
                >
                  <img src={start} alt="stop" />
                </Box>
              )
            }
          />
          <Typography
            variant="h6"
            fontSize="12px"
            color="#b4b4b4"
            marginTop={5}
          >
            ChatGPT can make mistakes. Check important info.
          </Typography>
        </>
      }
      content={
        <>
          <Box
            sx={{
              width: '40%',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              '@media (max-width: 1031px)': {
                width: '80%'
              }
            }}
          >
            {presentChat?.map((item, index) => {
              return (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '30px',
                      maxWidth: '700px'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%'
                      }}
                    >
                      <Box
                        sx={{
                          borderRadius: '1em',
                          color: '#ECECEC',
                          background: '#323232D9',
                          padding: '1em',
                          fontSize: '16px'
                        }}
                      >
                        {item?.user.split('\n').map((line, index) => (
                          <span key={index}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'flex-start'
                      }}
                    >
                      <Stack direction="row" columnGap="15px">
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: '#212121',
                            width: '32px',
                            height: '32px',
                            border: '1px solid hsla(0,0%,100%,.1)',
                            borderRadius: '50%'
                          }}
                        >
                          <img src={gpt} alt="gpt" width={16} height={16} />
                        </Box>

                        <Box
                          sx={{
                            color: '#ECECEC',
                            fontSize: '16px',
                            flex: 1,
                            wordBreak: 'break-word'
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '15px',
                              overflowY: 'auto'
                            }}
                          >
                            {
                              <CodeBlock
                                markdown={`${item?.agent} ${
                                  item?.state === STREAM_STATE.ONGOING
                                    ? '&#x2689;'
                                    : ''
                                }`}
                              />
                            }

                            {item?.state === STREAM_STATE.SETTLED &&
                              user.isLoggedIn && (
                                <Box
                                  sx={{
                                    display: 'flex',
                                    gap: '4px',
                                    marginBottom:
                                      index === chatData.length - 1
                                        ? '40px'
                                        : '15px'
                                  }}
                                >
                                  {MODEL_RESPONSE_ICONS.map((option) => {
                                    return (
                                      <Tooltip
                                        title={option.name}
                                        arrow
                                        key={option.name}
                                        slotProps={{
                                          tooltip: {
                                            sx: {
                                              backgroundColor: '#000000',
                                              padding: '6px',
                                              border:
                                                '1px solid hsla(0,0%,100%,.1)'
                                            }
                                          },
                                          arrow: {
                                            sx: {
                                              color: '#000000',
                                              fontSize: '14px'
                                            }
                                          }
                                        }}
                                      >
                                        <Button
                                          onClick={() =>
                                            handleCopyText(item?.agent)
                                          }
                                          disableTouchRipple
                                          sx={{
                                            justifyContent: 'flex-start',
                                            '&:hover': {
                                              background: '#2F2F2F'
                                            },
                                            padding: '4px',
                                            margin: 0,
                                            minWidth: '20px'
                                          }}
                                        >
                                          <img
                                            src={option.src}
                                            alt={option.name}
                                            width={18}
                                            height={18}
                                          />
                                        </Button>
                                      </Tooltip>
                                    );
                                  })}
                                </Box>
                              )}
                            {item?.state === STREAM_STATE.PAUSED && (
                              <Tooltip
                                title="copy"
                                arrow
                                slotProps={{
                                  tooltip: {
                                    sx: {
                                      backgroundColor: '#000000',
                                      padding: '6px',
                                      border: '1px solid hsla(0,0%,100%,.1)'
                                    }
                                  },
                                  arrow: {
                                    sx: {
                                      color: '#000000',
                                      fontSize: '14px'
                                    }
                                  }
                                }}
                              >
                                <Button
                                  sx={{
                                    '&:hover': { background: 'transparent' },
                                    justifyContent: 'flex-start',
                                    padding: 0,
                                    minWidth: '20px',
                                    width: '20px'
                                  }}
                                  disableTouchRipple
                                  onClick={() => {
                                    handleCopyText(item?.agent);
                                  }}
                                >
                                  <img
                                    src={copyIcon}
                                    alt="copyIcon"
                                    width={17}
                                    height={17}
                                  />
                                </Button>
                              </Tooltip>
                            )}
                          </Box>
                        </Box>
                      </Stack>
                    </Box>
                  </Box>
                </>
              );
            })}
          </Box>
        </>
      }
    />
  );
};

export default ConversationPage;

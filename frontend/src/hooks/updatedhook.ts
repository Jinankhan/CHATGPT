import { useContext, useState, useRef } from 'react';
import { HfInference } from '@huggingface/inference';
import { IChatItemProps, IChatProps, chatContext } from '../context';

export enum STREAM_STATE {
  ONGOING = 'ONGOING',
  PAUSED = 'PAUSED',
  START = 'STARTED',
  COMPLETED = 'COMPLETED',
  SETTLED = 'SETTLED',
  DEFAULT = 'DEFAULT'
}

const token = process.env.REACT_APP_HFTOKEN as string;

export const useLLMInference = () => {
  const { chatData, setChatData } = useContext(chatContext);

  const [streamState, setStreamState] = useState<STREAM_STATE>(
    STREAM_STATE.DEFAULT
  );
  const streamStateRef = useRef<STREAM_STATE>(STREAM_STATE.DEFAULT);
  const [value, setValue] = useState('');

  const handleUserInput = (input: string) => {
    setValue(input);
  };

  const initiateInference = async (query: string, chat_id: string) => {
    const currentSession = Date.now().toString();
    setChatData((prev) =>
      prev.map((item) =>
        item.id === chat_id
          ? {
              ...item,
              chat: [
                ...item.chat,
                {
                  agent: '',
                  user: query.length > 1 ? query : value,
                  id: currentSession,
                  state: STREAM_STATE.DEFAULT
                }
              ]
            }
          : item
      )
    );

    const selectedChat = chatData.find((item) => item.id === chat_id)?.chat;
    console.log(selectedChat, 'kk');

    setStreamState(STREAM_STATE.ONGOING);
    streamStateRef.current = STREAM_STATE.ONGOING;

    localStorage.removeItem('user-query');

    const client = new HfInference(token);

    const stream = client.chatCompletionStream({
      model: 'Qwen/Qwen2.5-Coder-32B-Instruct',
      messages: [
        {
          role: 'user',
          content:
            query !== ''
              ? query
              : selectedChat?.reduce(
                  (acc, data) =>
                    acc + `user : ${data.user} \n agent :${data.agent}\n`,
                  ''
                ) + value
        }
      ],
      max_tokens: 200
    });

    setValue('');

    for await (const chunk of stream) {
      console.log('jere');
      if (streamStateRef.current === STREAM_STATE.PAUSED.toString()) {
        console.log('Stream paused, exiting loop...');
        break;
      }

      if (
        chunk.choices &&
        chunk.choices.length > 0 &&
        (streamStateRef.current === STREAM_STATE.ONGOING ||
          streamStateRef.current === STREAM_STATE.DEFAULT)
      ) {
        saveStreamData(
          chunk.choices[0].delta.content ?? 'ERROR',
          currentSession,
          chat_id
        );
      }
    }
    const updateChatState = (chat: IChatItemProps) => {
      if (chat.id === currentSession) {
        return {
          ...chat,
          state:
            streamStateRef.current === STREAM_STATE.PAUSED
              ? STREAM_STATE.PAUSED
              : STREAM_STATE.SETTLED
        };
      }
      return chat;
    };

    const updateItemChat = (item: IChatProps) => {
      if (item.id === chat_id) {
        return {
          ...item,
          chat: item.chat.map(updateChatState)
        };
      }
      return item;
    };

    setChatData((prev) => prev.map(updateItemChat));

    setStreamState(STREAM_STATE.DEFAULT);
    streamStateRef.current = STREAM_STATE.DEFAULT;
  };

  const saveStreamData = (
    newContent: string,
    currentSession: string,
    chat_id: string
  ) => {
    const saveChatState = (chat: IChatItemProps) => {
      if (chat.id === currentSession) {
        return {
          ...chat,
          agent: chat.agent + newContent
        };
      }
      return chat;
    };

    const saveItemChat = (item: IChatProps) => {
      if (item.id === chat_id) {
        return {
          ...item,
          chat: item.chat.map(saveChatState)
        };
      }
      return item;
    };

    setChatData((prev) => prev.map(saveItemChat));
  };

  const handleStreamInterrupt = () => {
    setStreamState(STREAM_STATE.PAUSED);
    streamStateRef.current = STREAM_STATE.PAUSED;
  };

  return {
    chatData,
    initiateInference,
    handleUserInput,
    handleStreamInterrupt,
    streamState,
    streamStateRef,
    value
  };
};

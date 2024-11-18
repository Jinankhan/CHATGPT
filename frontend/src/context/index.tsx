import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState
} from 'react';
import { STREAM_STATE } from '../hooks/updatedhook';

export interface IChatItemProps {
  agent: string;
  user: string;
  state: STREAM_STATE;
  id: string;
}
export interface IChatProps {
  id: string;
  chat: IChatItemProps[];
}

interface IUserProps {
  name: string;
  profile: string;
  isLoggedIn: boolean;
}
interface IStreamChatContext {
  chatData: IChatProps[];
  setChatData: Dispatch<SetStateAction<IChatProps[]>>;
  user: IUserProps;
  setUser: Dispatch<SetStateAction<IUserProps>>;
  showSidebar: boolean;
  currentChat: string;
  setCurrentChat: Dispatch<SetStateAction<string>>;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}

const defaultChatContext: IStreamChatContext = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setChatData: () => {},
  chatData: [],
  user: { name: '', profile: '', isLoggedIn: false },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
  showSidebar: false,
  setShowSidebar: () => {},
  setCurrentChat: () => {},
  currentChat: ''
};

const chatContext = createContext<IStreamChatContext>(defaultChatContext);

const ChatProvider = ({ children }: { children: React.ReactElement }) => {
  const local_chat_data = JSON.parse(localStorage.getItem('local') ?? '[]');
  const local_user_data = JSON.parse(
    localStorage.getItem('user') ?? JSON.stringify(defaultChatContext.user)
  );
  const [chatData, setChatData] = useState<IChatProps[]>(local_chat_data);

  const [user, setUser] = useState<IUserProps>(local_user_data);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [currentChat, setCurrentChat] = useState('');

  return (
    <chatContext.Provider
      value={{
        user,
        showSidebar,
        setShowSidebar,
        setUser,
        chatData,
        setChatData,
        currentChat,
        setCurrentChat
      }}
    >
      {children}
    </chatContext.Provider>
  );
};

export { chatContext, ChatProvider };

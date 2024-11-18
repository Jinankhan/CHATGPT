import React, { useContext, useState } from 'react';
import Header from '../../components/organisms/header/index';
import HomeTemplate from '../../templates/homeTemplate';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import ModalBox from '../../components/molecules/ModalBox';
import { chatContext } from '../../context';
import GreetModal from '../../components/molecules/greetModal';
import LandingChat from '../../components/organisms/fileUploadModal';

const HomePage = () => {
  const navigate = useNavigate();
  const [showGreetingModal, setShowGreetingModal] = useState(false);
  const [authenticatedCount, setAuthenticatedCount] = useState(0);

  const { user } = useContext(chatContext);
  const [count, setCount] = useState(0);
  if (!user.isLoggedIn && count == 0) {
    setShowGreetingModal(true);
    setCount(count + 1);
  }

  if (user.isLoggedIn && authenticatedCount == 0) {
    setAuthenticatedCount(authenticatedCount + 1);
    setShowGreetingModal(false);
  }

  const handleCloseGreetingModal = () => {
    setShowGreetingModal(false);
  };
  return (
    <>
      <ModalBox
        content={
          <GreetModal
            handleAuth={() => navigate('/login')}
            handleClose={() => handleCloseGreetingModal()}
          />
        }
        open={showGreetingModal}
        handleClose={() => handleCloseGreetingModal()}
      />
      <HomeTemplate
        height="89vh"
        header={<Header />}
        footer={
          <Typography variant="h6" fontSize="14px" color="#b4b4b4">
            By messaging ChatGPT, you agree to our Terms and have read our
            Privacy Policy .
          </Typography>
        }
        content={<LandingChat />}
      />
    </>
  );
};

export default HomePage;

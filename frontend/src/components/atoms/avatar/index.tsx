import { Avatar as MuiAvatar, AvatarProps } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const StyledAvatar = styled(MuiAvatar)({
  width: 32,
  height: 32,
  cursor: 'pointer'
});
const Avatar = (props: AvatarProps) => {
  return <StyledAvatar {...props} />;
};

export default Avatar;

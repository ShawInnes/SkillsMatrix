import React, {FC} from 'react';
import {UserModel} from "infrastructure/context";
import styled from "styled-components";
import GitInfo from 'react-git-info/macro';

export type FooterProps = {
  user?: UserModel;
}

export const Footer: FC<FooterProps> = ({user}) => {
  const gitInfo = GitInfo();

  return (
   <FooterContainer className="d-flex justify-content-end mt-auto bg-dark pt-3">
       <div className="d-flex text-muted justify-content-end px-3">
         <p>Version: {gitInfo.commit.shortHash}</p>
       </div>
   </FooterContainer>
  );
}

const FooterContainer = styled.footer`
`;

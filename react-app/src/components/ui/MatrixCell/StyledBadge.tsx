import styled from "styled-components";

export const StyledBadge = styled.span`
  line-height: 2em;
  padding-left: 16px;
  padding-right: 16px;
  
  &.NotInterested {
    background-color: #ff8c00;
    color: black;
  }

  &.WillLearn {
    background-color: #FFE500;
    color: black;
  }

  &.LimitedExposure {
    background-color: #0644B3;
    color: white;
  }

  &.Proficient {
    background-color: #119F0B;
    color: white;
  }

  &.Expert {
    background-color: #750787;
    color: white;
  }
`;

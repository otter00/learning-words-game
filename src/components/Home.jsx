import React from 'react';
import './styles/styles.scss';
import styled from 'styled-components';
import HomePageStyles from './styles/HomePage.module.scss';

const BodyDiv = styled.div`
    margin: 0vh 10vw;
`

export default function HomePage(props) {
    return (
        <BodyDiv>
            <h1 className={HomePageStyles.title}>Start Learning English with Us!</h1>
        </BodyDiv>
    )
}
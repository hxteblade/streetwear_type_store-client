import { Container, Typography } from '@mui/material';
import { FC } from 'react';
import cl from './Info.module.scss'


const Info : FC = () => {
    

    return (
        <Container className={cl.background}>
            <Container className={cl.Info}>
                <Container className={cl.InfoBox}>
                    <Container className={cl.InfoBoxLabel}>
                        <Typography variant='h1'>hate is better than indifference</Typography>
                        <Typography variant='body1'>store with the best clothing manufacturers in style
                        streetwear</Typography>
                    </Container>
                    <Container className={cl.InfoBoxContact}>
                        <Typography variant='h2'>we are everywhere</Typography>
                    </Container>
                </Container>
                <div className={cl.InfoPng}></div>
            </Container>
        </Container>
    )
}

export default Info;
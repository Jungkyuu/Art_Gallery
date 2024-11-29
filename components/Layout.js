import MainNav from './MainNav';
import { Container } from 'react-bootstrap';

export default function Layout({ children }) {
    return (
        <>
            <MainNav />
            <br />
            <Container style={{ marginTop: '20px' }}>
                {children}
            </Container>
            <br />
        </>
    );
}

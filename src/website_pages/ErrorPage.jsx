import { Container } from "react-bootstrap";

export default function ErrorPage() {
    return (
        <Container>
            <h1 className="my-3">Oops!</h1>
            <p>
                Page not found. Return back to <a href="/">home</a>.
            </p>
        </Container>
    );
}
import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import WishlistedGameDisplay from "../components/WishlistedGames";
import { WishlistedContext } from "../contexts/WishlistedContext";

export default function HomePage() {
    const { wishedGame } = useContext(WishlistedContext);
    return (
        <Container>
            <h1 className="my-3">Your wishlisted games:</h1>

            {wishedGame && wishedGame.length > 0 ? (
                <Row>
                    <CardGroup wishedGame={wishedGame} />
                </Row>
            ) : (
                <p className="my-3 text-muted">
                    You haven’t wishlisted any games yet.
                </p>
            )}
        </Container>
    );
}

function CardGroup({ wishedGame }) {
    return wishedGame.map((game) => {
        return (
            <Col md={4} key={game.id}>
                <WishlistedGameDisplay game={game} />
            </Col>
        );
    });
}

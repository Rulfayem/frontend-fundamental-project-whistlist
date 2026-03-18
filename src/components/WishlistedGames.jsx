import { Card, Button, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { WishlistedContext } from "../contexts/WishlistedContext";

export default function WishlistedGameDisplay({ game }) {
    const owned = game.owned;
    const { setWishedGame } = useContext(WishlistedContext);

    //button logic to delete the respective card
    const deleteGame = () => {
        setWishedGame((prevGames) =>
            prevGames.filter((prevGame) => prevGame.id !== game.id)
        );
    };

    //button logic to toggle the respective card whether user owns the game or not
    const toggleOwned = () => {
        setWishedGame((prevGames) =>
            prevGames.map((prevGame) =>
                prevGame.id === game.id
                    ? { ...prevGame, owned: !prevGame.owned }
                    : prevGame
            )
        );
    };

    return (
        <Card
            className="my-3"
            style={{
                border: "none",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
                backgroundColor: "#2f3348",
            }}
        >
            {/* header banner to clearly show if card is Owned or Not Owned */}
            <div
                style={{
                    backgroundColor: owned ? "#28a745" : "#dc3545",
                    color: "white",
                    padding: "6px 12px",
                    fontWeight: "bold",
                    textAlign: "center",
                }}
            >
                {owned ? "Owned ✅" : "Not Owned ✖️"}
            </div>

            {/* the main meat content of the card */}
            <Card.Body>
                <Card.Title style={{ color: "#66c0f4" }}>{game.gameTitle}</Card.Title>
                <Card.Text style={{ whiteSpace: "pre-wrap", color: "#dbe3ec" }}>
                    {game.gameDescription}
                </Card.Text>

                {/* buttons at bottom of card*/}
                <Row className="mt-3">
                    <Col xs="auto">
                        <Button variant="secondary" href={`game/${game.id}`}>
                            <i className="bi bi-pencil"></i>
                        </Button>
                    </Col>

                    <Col xs="auto">
                        {owned ? (
                            <Button onClick={toggleOwned} className="btn-orange">
                                <i className="bi bi-x-lg"></i>
                            </Button>
                        ) : (
                            <Button variant="success" onClick={toggleOwned}>
                                <i className="bi bi-check-lg"></i>
                            </Button>
                        )}
                    </Col>

                    <Col xs="auto">
                        <Button variant="danger" onClick={deleteGame}>
                            <i className="bi bi-trash3"></i>
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}
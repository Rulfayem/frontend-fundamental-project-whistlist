import { Card, Button } from "react-bootstrap";
import { useContext } from "react";
import { WishlistedContext } from "../contexts/WishlistedContext";

export default function WishlistedGameDisplay({ game }) {
    const owned = game.owned;
    const border = owned ? "success" : "danger";
    const { setWishedGame } = useContext(WishlistedContext);

    const deleteGame = () => {
        setWishedGame((prevGames) =>
            prevGames.filter((prevGame) => prevGame.id !== game.id)
        );
    }

    return (
        <Card border={border} className="my-3">
            <Card.Header>{owned ? "Owned" : "Not Owned"}</Card.Header>
            <Card.Body>
                <Card.Title>{game.gameTitle}</Card.Title>
                <Card.Text>{game.gameDescription}</Card.Text>

                <Button variant="secondary" href={`game/${game.id}`} className="ms-2">
                    <i className="bi bi-pencil"></i>
                </Button>

                <Button variant="danger" onClick={deleteGame} className="ms-2">
                    <i className="bi bi-trash3"></i>
                </Button>
            </Card.Body>
        </Card>
    );
}
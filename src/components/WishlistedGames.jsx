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
    };

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
        <Card border={border} className="my-3">
            <Card.Header>{owned ? "Owned✅" : "Not Owned❌"}</Card.Header>
            <Card.Body>
                <Card.Title>{game.gameTitle}</Card.Title>

                {/* if user writes on a new line, it will reflect properly on the card */}
                <Card.Text style={{ whiteSpace: "pre-line" }}>
                    {game.gameDescription}
                </Card.Text>

                {/* edit game description button */}
                <Button variant="secondary" href={`game/${game.id}`} className="ms-2">
                    <i className="bi bi-pencil"></i>
                </Button>

                {/* toggle button to display if user owns the game or not */}
                {owned ? (
                    <Button onClick={toggleOwned} className="ms-2 btn-orange">
                        <i className="bi bi-x-lg"></i>
                    </Button>
                ) : (
                    <Button variant="success" onClick={toggleOwned} className="ms-2">
                        <i className="bi bi-check-lg"></i>
                    </Button>
                )}

                {/* deletes the card for the respective game button */}
                <Button variant="danger" onClick={deleteGame} className="ms-2">
                    <i className="bi bi-trash3"></i>
                </Button>
            </Card.Body>
        </Card>
    );
}
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { WishlistedContext } from "../contexts/WishlistedContext";
import { useNavigate, useParams } from "react-router-dom";

export default function EditGameDesc() {
    const { wishedGame, setWishedGame } = useContext(WishlistedContext);
    const navigate = useNavigate();

    const { id } = useParams();
    const gameId = parseInt(id);
    const currentGame = wishedGame.find((game) => game.id === gameId);

    const [gameTitle, setGameTitle] = useState(currentGame?.gameTitle || "");
    const [gameDescription, setGameDescription] = useState(currentGame?.gameDescription || "");

    // incase game is not found
    if (!currentGame) {
        return (
            <Container className="my-3">
                <h1>Game not found</h1>
                <p>The requested game does not exist.</p>
            </Container>
        );
    }

    function updateGame(event) {
        event.preventDefault();
        const updatedGames = wishedGame.map((game) => {
            if (game.id === gameId) {
                return { ...game, gameTitle, gameDescription };
            }
            return game;
        });
        setWishedGame(updatedGames);
        navigate('/');
    }

    return (
        <Container>
            <h1 className="my-3">Edit Description</h1>
            <Form onSubmit={updateGame}>
                <Form.Group className="mb-3" controlId="gameTitle">
                    <Form.Label>Game Title</Form.Label>
                    <Form.Control
                        value={gameTitle}
                        onChange={(e) => setGameTitle(e.target.value)}
                        type="text"
                        placeholder="Hollow Knight: Silksong"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        value={gameDescription}
                        onChange={(e) => setGameDescription(e.target.value)}
                        as="textarea"
                        rows={3}
                        placeholder={`1. Metroidvania\n2. Platformer\n3. Difficult`}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}
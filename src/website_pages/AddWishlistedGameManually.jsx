import { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { WishlistedContext } from "../contexts/WishlistedContext";
import { useNavigate } from "react-router-dom";

export default function AddWishlistedGameManually() {
    const [gameTitle, setGameTitle] = useState("");
    const [gameDescription, setGameDescription] = useState("");
    const { wishedGame, setWishedGame } = useContext(WishlistedContext);
    const navigate = useNavigate();

    return (
        <Container>
            <h1 className="my-3">Add Game</h1>

            <Button
                variant="secondary"
                className="mb-3"
                onClick={() => navigate("/add-game-from-steam")}
            >
                Add Game From Steam
            </Button>

            <Form
                onSubmit={event => {
                    event.preventDefault();
                    setWishedGame([
                        ...wishedGame,
                        { id: Date.now(), gameTitle, gameDescription },
                    ]);
                    navigate("/");
                }}
            >

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

                <Form.Group className="mb-3" controlId="gameDescription">
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
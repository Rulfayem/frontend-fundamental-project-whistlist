import { useContext, useState } from "react";
import { Button, Container, Form, Card } from "react-bootstrap";
import { WishlistedContext } from "../contexts/WishlistedContext";
import { useNavigate } from "react-router-dom";

export default function AddWishlistedGameManually() {
    const [gameTitle, setGameTitle] = useState("");
    const [gameDescription, setGameDescription] = useState("");
    const { wishedGame, setWishedGame } = useContext(WishlistedContext);
    const navigate = useNavigate();

    const isSubmitionValid = gameTitle.trim() !== "" && gameDescription.trim() !== "";

    return (
        <Container>
            <h1 className="my-3">Add Game</h1>

            <Button
                onClick={() => navigate("/add-game-from-steam")}
                className="mb-4 w-100"
                style={{
                    background: "linear-gradient(90deg, #e74e20, #5702e0)",
                    border: "none",
                    color: "#dbe3ec",
                    fontWeight: "bold",
                    padding: "10px",
                    fontSize: "1rem",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                    cursor: "pointer",
                }}
            >
                Add Game From Steam
            </Button>

            <Card
                className="p-3 no-hover-card cool-custom-card"
                style={{
                    backgroundColor: "#2e3347",
                    borderRadius: "10px",
                    border: "2px solid #62bcf0",
                }}
            >
                <Form
                    onSubmit={(event) => {
                        event.preventDefault();
                        if (!isSubmitionValid) return;
                        setWishedGame([
                            ...wishedGame,
                            { id: Date.now(), gameTitle, gameDescription, owned: false },
                        ]);
                        navigate("/");
                    }}
                >
                    <Form.Group className="mb-3" controlId="gameTitle">
                        <Form.Label
                            style={{
                                color: "#dbe3ec",
                                fontWeight: "bold",
                                fontSize: "1.05rem",
                            }}
                        >
                            Game Title
                        </Form.Label>
                        <Form.Control
                            value={gameTitle}
                            onChange={(e) => setGameTitle(e.target.value)}
                            type="text"
                            placeholder="Hollow Knight: Silksong"
                            required
                            className="white-placeholder input-white"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="gameDescription">
                        <Form.Label
                            style={{
                                color: "#dbe3ec",
                                fontWeight: "bold",
                                fontSize: "1.05rem",
                            }}
                        >
                            Description
                        </Form.Label>
                        <Form.Control
                            value={gameDescription}
                            onChange={(e) => setGameDescription(e.target.value)}
                            as="textarea"
                            rows={3}
                            placeholder={`1. Metroidvania\n2. Platformer\n3. Difficult`}
                            required
                            className="white-placeholder input-white"
                        />
                    </Form.Group>

                    <Button
                        type="submit"
                        disabled={!isSubmitionValid}
                        className="w-100"
                        style={{
                            background: isSubmitionValid
                                ? "linear-gradient(90deg, #4e91dd, #2f73af)"
                                : "#4a4f63",
                            border: "none",
                            fontWeight: "bold",
                            padding: "10px",
                            color: "#dbe3ec",
                            cursor: isSubmitionValid ? "pointer" : "not-allowed",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                        }}
                    >
                        Submit
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}
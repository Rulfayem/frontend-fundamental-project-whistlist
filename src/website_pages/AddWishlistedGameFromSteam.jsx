import { useContext, useState } from "react";
import { Button, Container, Form, ListGroup, Card } from "react-bootstrap";
import { WishlistedContext } from "../contexts/WishlistedContext";
import { useNavigate } from "react-router-dom";

export default function AddWishlistedGameFromSteam() {
    const { wishedGame, setWishedGame } = useContext(WishlistedContext);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //search bootleg steamAPI thing for games
    async function searchSteamAPI() {
        if (!query) return;

        setLoading(true);
        try {
            const response = await fetch(
                `https://corsproxy.io/?https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(
                    query
                )}&cc=US&l=en`
            );
            const data = await response.json();
            setResults(data.items || []);
            setSelectedGame(null);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setLoading(false);
        }
    }

    function gameChoiceSelection(game) {
        setSelectedGame(game);
    }

    function submitSelectedGame(e) {
        e.preventDefault();
        if (!selectedGame) return;

        if (wishedGame.some((g) => g.gameTitle === selectedGame.name)) {
            navigate("/");
            return;
        }

        const newGame = {
            id: Date.now(),
            gameTitle: selectedGame.name,
            gameDescription: "No tags available",
            owned: false,
        };

        setWishedGame((prevGames) => [...prevGames, newGame]);
        navigate("/");
    }

    return (
        <Container>
            <h1 className="my-3">Add Game From Steam</h1>

            <Button
                onClick={() => navigate("/add-game-manually")}
                className="mb-4 w-100"
                style={{
                    background: "linear-gradient(90deg, #e74e20, #5702e0)",
                    border: "none",
                    color: "#dbe3ec",
                    fontWeight: "bold",
                    padding: "10px",
                    fontSize: "1rem",
                }}
            >
                Add Game Manually
            </Button>

            <Card
                className="p-3 mb-4 no-hover-card"
                style={{
                    backgroundColor: "#2f3348",
                    borderRadius: "10px",
                    border: "2px solid #66c0f4",
                }}
            >
                <Form.Group className="mb-3">
                    <Form.Label
                        style={{
                            color: "#dbe3ec",
                            fontWeight: "bold",
                            fontSize: "1.05rem",
                        }}
                    >
                        Search Steam Game
                    </Form.Label>
                    <div className="d-flex">
                        <Form.Control
                            placeholder="Type a game name"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="input-white"
                        />
                        <Button
                            type="button"
                            variant="primary"
                            className="ms-2"
                            onClick={searchSteamAPI}
                        >
                            Search
                        </Button>
                    </div>
                </Form.Group>

                {loading && (
                    <div
                        style={{
                            backgroundColor: "#3a3f5a",
                            color: "#dbe3ec",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            display: "inline-block",
                            marginBottom: "10px",
                        }}
                    >
                        Searching... ↺67%
                    </div>
                )}

                {results.length > 0 && (
                    <ListGroup className="mb-3">
                        {results.map((game) => (
                            <ListGroup.Item
                                key={game.id}
                                action
                                type="button"
                                active={selectedGame?.id === game.id}
                                onClick={() => gameChoiceSelection(game)}
                                style={{
                                    cursor: "pointer",
                                    backgroundColor:
                                        selectedGame?.id === game.id ? "#69c5fa" : "#1e2533",
                                    color: selectedGame?.id === game.id ? "white" : "#dbe3ec",
                                    borderRadius: "6px",
                                    marginBottom: "4px",
                                }}
                            >
                                {game.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}

                <Form onSubmit={submitSelectedGame}>
                    <Button
                        type="submit"
                        disabled={!selectedGame}
                        className="mt-2 w-100"
                        style={{
                            background: selectedGame ? "linear-gradient(90deg, #478cdb, #357dbb)" : "#4b5064",
                            border: "none",
                            fontWeight: "bold",
                            padding: "10px",
                            color: "#dbe3ec",
                            cursor: selectedGame ? "pointer" : "not-allowed",
                        }}
                    >
                        {selectedGame ? `Add "${selectedGame.name}"` : "Add Selected Game"}
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}
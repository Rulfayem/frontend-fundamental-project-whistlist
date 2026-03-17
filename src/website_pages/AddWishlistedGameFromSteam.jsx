import { useContext, useState } from "react";
import { Button, Container, Form, ListGroup } from "react-bootstrap";
import { WishlistedContext } from "../contexts/WishlistedContext";
import { useNavigate } from "react-router-dom";

export default function AddWishlistedGameFromSteam() {
    const { wishedGame, setWishedGame } = useContext(WishlistedContext);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const navigate = useNavigate();

    //search bootleg steamAPI thing for games
    async function searchSteamAPI() {
        if (!query) return;

        try {
            const response = await fetch(
                `https://corsproxy.io/?https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(
                    query
                )}&cc=US&l=en`
            );
            const data = await response.json();
            setResults(data.items || []);
            setSelectedGame(null); //resets the selection
        } catch (error) {
            console.error("Search error:", error);
        }
    }

    function gameChoiceSelection(game) {
        setSelectedGame(game);
    }

    //adds the selected game when button is clicked
    function submitSelectedGame(e) {
        e.preventDefault();
        if (!selectedGame) return;

        //QOL in case duplicated game is added, just goes back to home page
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
                variant="secondary"
                className="mb-3"
                onClick={() => navigate("/add-game-manually")}
            >
                Add Game Manually
            </Button>

            <Form.Group className="mb-3">
                <Form.Label>Search Steam Game</Form.Label>
                <div className="d-flex">
                    <Form.Control
                        placeholder="Type a game name"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
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

            {results.length > 0 && (
                <ListGroup className="mb-3">
                    {results.map((game) => (
                        <ListGroup.Item
                            key={game.id}
                            action
                            type="button"
                            active={selectedGame?.id === game.id}
                            onClick={() => gameChoiceSelection(game)}
                        >
                            {game.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}

            <Form onSubmit={submitSelectedGame}>
                <Button
                    type="submit"
                    variant={selectedGame ? "success" : "secondary"}
                    disabled={!selectedGame}
                    className="mt-3"
                >
                    {selectedGame ? `Add "${selectedGame.name}"` : "Add Selected Game"}
                </Button>
            </Form>
        </Container>
    );
}
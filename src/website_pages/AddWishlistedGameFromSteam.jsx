import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function AddWishlistedGameFromSteam() {
    const navigate = useNavigate();
    return (
        <Container>
            <h1 className="my-3">Add game from steam: temporary</h1>

            <Button
                variant="secondary"
                className="mb-3"
                onClick={() => navigate("/add-game-manually")}
            >
                Add Game Manually
            </Button>
        </Container>
    );
}
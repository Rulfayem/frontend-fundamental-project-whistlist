import { Card, Button } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { WishlistedContext } from "../contexts/WishlistedContext";


export default function WishlistedGameDisplay({ game }) {
    const owned = game.owned;
    const border = owned ? "success" : "danger";
    const [timer, setTimer] = useState(0);
    const [timerInterval, setTimerInterval] = useState(null);
    const { setWishedGame } = useContext(WishlistedContext);

    //Function related to the timers
    const startTimer = () => {
        if (timerInterval === null) {
            const intervalID = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
            setTimerInterval(intervalID);
        }
    }

    const pauseTimer = () => {
        clearInterval(timerInterval);
        setTimerInterval(null);
    }

    const resetTimer = () => {
        clearInterval(timerInterval);
        setTimerInterval(null);
        setTimer(0);
    }

    const deleteGame = () => {
        setWishedGame((prevGames) =>
            prevGames.filter((prevGame) => prevGame.id !== game.id)
        );
    }

    useEffect(() => {
        return () => {
            clearInterval(timerInterval);
        };
    }, [timerInterval])
    return (
        <>
            <Card border={border} className="my-3">
                <Card.Header>{owned ? "Owned" : "Not Owned"}</Card.Header>
                <Card.Body>
                    <Card.Title>{game.gameTitle}</Card.Title>
                    <Card.Text>{game.gameDescription}</Card.Text>
                    <p>Timer: {timer} seconds</p>
                    <Button onClick={startTimer}>
                        <i className="bi bi-play"></i>
                    </Button>
                    <Button onClick={pauseTimer} className="ms-2">
                        <i className="bi bi-pause-fill"></i>
                    </Button>
                    <Button onClick={resetTimer} className="ms-2">
                        <i className="bi bi-arrow-clockwise"></i>
                    </Button>
                    <Button variant="secondary" href={`game/${game.id}`} className="ms-2">
                        <i className="bi bi-pencil"></i>
                    </Button>
                    <Button variant="danger" onClick={deleteGame} className="ms-2">
                        <i className="bi bi-trash3"></i>
                    </Button>
                </Card.Body>
            </Card>
        </>
    );
}
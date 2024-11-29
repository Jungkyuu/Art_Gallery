import useSWR from "swr";
import { Card, Button } from "react-bootstrap";
import Error from "next/error";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import { addToFavourites, removeFromFavourites } from "../lib/userData";

export default function ArtworkCardDetail({ objectID }) {
    const { data, error } = useSWR(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
    );
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);

    useEffect(() => {
        setShowAdded(favouritesList?.includes(objectID));
    }, [favouritesList, objectID]);

    if (error) return <Error statusCode={404} />;
    if (!data) return null;

    const toggleFavourite = async () => {
        if (showAdded) {
            const updatedList = await removeFromFavourites(objectID);
            setFavouritesList(updatedList);
        } else {
            const updatedList = await addToFavourites(objectID);
            setFavouritesList(updatedList);
        }
        setShowAdded(!showAdded);
    };

    const imageSrc =
        data.primaryImage || "https://via.placeholder.com/375x375.png?text=[+Not+Available+]";
    const title = data.title || "N/A";
    const date = data.objectDate || "N/A";
    const classification = data.classification || "N/A";
    const medium = data.medium || "N/A";
    const artistName = data.artistDisplayName || "N/A";
    const creditLine = data.creditLine || "N/A";
    const dimensions = data.dimensions || "N/A";
    const artistLink = data.artistWikidata_URL;

    return (
        <Card style={{ width: "24rem" }}>
            {data.primaryImage && <Card.Img variant="top" src={imageSrc} />}
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    <strong>Date:</strong> {date} <br />
                    <strong>Classification:</strong> {classification} <br />
                    <strong>Medium:</strong> {medium}
                    <br />
                    <br />
                    <strong>Artist:</strong> {artistName}{" "}
                    {artistLink && (
                        <a href={artistLink} target="_blank" rel="noreferrer">
                            wiki
                        </a>
                    )}
                    <br />
                    <strong>Credit Line:</strong> {creditLine} <br />
                    <strong>Dimensions:</strong> {dimensions} <br /> <br />
                    <Button
                        variant={showAdded ? "primary" : "outline-primary"}
                        onClick={toggleFavourite}
                    >
                        {showAdded ? "+ Favourites (added)" : "+ Favourites"}
                    </Button>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

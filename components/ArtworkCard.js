import useSWR from 'swr';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import Error from 'next/error';

export default function ArtworkCard({ objectID }) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

    if (error) return <Error statusCode={404} />;
    if (!data) return null;

    const imageSrc = data.primaryImageSmall || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]';
    const title = data.title || 'N/A';
    const date = data.objectDate || 'N/A';
    const classification = data.classification || 'N/A';
    const medium = data.medium || 'N/A';

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={imageSrc} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    <strong>Date:</strong> {date} <br />
                    <strong>Classification:</strong> {classification} <br />
                    <strong>Medium:</strong> {medium}
                </Card.Text>
                <Link href={`/artwork/${objectID}`} passHref legacyBehavior>
                    <Button variant="primary"><strong>ID:</strong> {objectID}</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

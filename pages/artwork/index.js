import { useState, useEffect } from "react";
import useSWR from "swr";
import { Row, Col, Card, Pagination, Alert } from "react-bootstrap";
import { useRouter } from "next/router";
import ArtworkCard from "../../components/ArtworkCard";
import Error from "next/error";
import validObjectIDList from "@/public/data/validObjectIDList.json";

const PER_PAGE = 12;

export default function Artwork() {
  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];

  const { data, error } = useSWR(
    finalQuery
      ? `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
      : null
  );

  const [artworkList, setArtworkList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (data?.objectIDs) {
      if (data.objectIDs.length > 0) {
        let filteredObjectIDs = validObjectIDList.objectIDs.filter((id) =>
          data.objectIDs.includes(id)
        );
        const results = [];
        for (let i = 0; i < filteredObjectIDs.length; i += PER_PAGE) {
          const chunk = filteredObjectIDs.slice(i, i + PER_PAGE);
          results.push(chunk);
        }
        setArtworkList(results);
        setPage(1);
      } else {
        setArtworkList([]);
      }
    }
  }, [data]);

  const previousPage = () => setPage((prev) => (prev > 1 ? prev - 1 : prev));
  const nextPage = () =>
    setPage((prev) => (prev < artworkList.length ? prev + 1 : prev));

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  return (
    <>
      <Row className="gy-4">
        {artworkList.length > 0 ? (
          artworkList[page - 1].map((currentObjectID) => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCard objectID={currentObjectID} />
            </Col>
          ))
        ) : (
          <Col>
            <br />
            <div className="alert alert-light" role="alert">
              <h4>Nothing Here</h4>
              <p>Try searching for something else.</p>
            </div>
          </Col>
        )}
      </Row>
      {artworkList.length > 0 && (
        <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      )}
    </>
  );
}

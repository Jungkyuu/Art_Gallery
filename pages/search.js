import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";
import { addToHistory } from "../lib/userData";

function AdvancedSearch() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const submitForm = async (data) => {
    let queryString = "";

    queryString += data.searchBy
      ? `searchBy=${encodeURIComponent(data.searchBy)}`
      : "";
    queryString += data.geoLocation
      ? `&geoLocation=${encodeURIComponent(data.geoLocation)}`
      : "";
    queryString += data.medium
      ? `&medium=${encodeURIComponent(data.medium)}`
      : "";
    queryString += `&isOnView=${data.currentlyOnView ? "true" : "false"}`;
    queryString += `&isHighlighted=${data.highlighted ? "true" : "false"}`;
    queryString += data.q ? `&q=${encodeURIComponent(data.q)}` : "";

    if (queryString) {
      const updatedHistory = await addToHistory(queryString);
      setSearchHistory(updatedHistory);
      router.push(`/artwork?${queryString}`);
    }
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Row className="mb-3">
        <Col>
          <Form.Label>Search By</Form.Label>
          <Form.Control as="select" {...register("searchBy")} defaultValue="">
            <option value="" disabled>
              Select an option
            </option>
            <option value="artist">Artist</option>
            <option value="date">Date</option>
            <option value="classification">Classification</option>
          </Form.Control>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Label>Geo Location</Form.Label>
          <Form.Control
            type="text"
            {...register("geoLocation")}
            placeholder="Enter location"
          />
        </Col>
        <Col>
          <Form.Label>Medium</Form.Label>
          <Form.Control
            type="text"
            {...register("medium")}
            placeholder="Enter medium"
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Check
            type="checkbox"
            label="On View"
            {...register("isOnView")}
          />
        </Col>
        <Col>
          <Form.Check
            type="checkbox"
            label="Highlighted"
            {...register("isHighlight")}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Label>Search Query</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter search term"
            {...register("q", { required: true })}
            className={errors.q ? "is-invalid" : ""}
          />
          {errors.q && (
            <div className="invalid-feedback">This field is required.</div>
          )}
        </Col>
      </Row>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default AdvancedSearch;

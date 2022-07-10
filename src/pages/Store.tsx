import { Col, Row } from "react-bootstrap";
import storeItems from "../data/items.json";
export function Store() {
  return (
    <div>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3}>
        {storeItems.map((item) => (
          <Col key={item.id} xs={12} md={6}>
            {JSON.stringify(item)}
          </Col>
        ))}

      </Row>
    </div>
  )
}
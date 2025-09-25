import { Card, Tag, Row, Col } from "antd";

const connectedModules = [
    {
        name: "common",
        url: "http://localhost:3001/static/mf-manifest.json",
        status: "connected",
        components: ["StorageLocation", "SharedTable", "StatusTag"],
    },
    {
        name: "warehouse",
        url: "http://localhost:3002/static/mf-manifest.json",
        status: "connected",
        components: ["WarehouseList", "WarehouseForm", "WarehouseAnalytics"],
    },
    {
        name: "material",
        url: "http://localhost:3003/static/mf-manifest.json",
        status: "connected",
        components: ["MaterialTable", "MaterialForm", "MaterialStockChart"],
    },
];

export default function HomePage() {
    return (
        <div style={{ padding: 16 }}>
            <h1>Welcome to the Dashboard</h1>
            <p>
                Use the sidebar to explore inventory, shipments, and analytics.
            </p>

            <Row gutter={[16, 16]} wrap>
                {connectedModules.map((mod) => (
                    <Col key={mod.name} xs={24} sm={12} md={8}>
                        <Card
                            title={`Remote: ${mod.name}`}
                            extra={
                                <Tag
                                    color={
                                        mod.status === "connected"
                                            ? "green"
                                            : "red"
                                    }
                                >
                                    {mod.status}
                                </Tag>
                            }
                            bordered
                        >
                            <p>
                                <strong>Manifest URL:</strong>
                                <br />
                                <span style={{ wordBreak: "break-all" }}>
                                    {mod.url}
                                </span>
                            </p>
                            <p>
                                <strong>Federated Components:</strong>
                                <br />
                                {mod.components.join(", ")}
                            </p>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

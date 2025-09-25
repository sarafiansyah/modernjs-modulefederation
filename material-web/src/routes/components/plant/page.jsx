import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Tag, message } from "antd";
import axios from "axios";

const PlantSelector = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlant, setSelectedPlant] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/warehouse/plant");
            if (res.data.status === 200) {
                setData(res.data.body.data || []);
            } else {
                message.error("Failed to fetch plants ❌");
            }
        } catch (err) {
            console.error(err);
            message.error(
                err.response?.data?.error || "Failed to fetch plants ❌"
            );
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "plant_storage_location_id",
            key: "plant_storage_location_id",
            width: 60,
        },
        {
            title: "Company",
            dataIndex: "company_name",
            key: "company_name",
            width: 120,
        },
        {
            title: "Plant",
            dataIndex: "plant_name",
            key: "plant_name",
            width: 120,
        },
        {
            title: "Storage Location",
            dataIndex: "storage_location_name",
            key: "storage_location_name",
            width: 150,
        },
        {
            title: "Status",
            dataIndex: "status_name",
            key: "status_name",
            width: 100,
            render: (status) => (
                <Tag
                    color={
                        status === "Created"
                            ? "green"
                            : status === "Released"
                            ? "blue"
                            : "default"
                    }
                >
                    {status}
                </Tag>
            ),
        },
    ];

    const handleRowClick = (record) => {
        setSelectedPlant(record);
        setIsModalOpen(false);
    };

    return (
        <>
            <Button
                type="primary"
                onClick={() => {
                    setIsModalOpen(true);
                    fetchData();
                }}
            >
                Select Plant
            </Button>

            {selectedPlant && (
                <div style={{ marginTop: 10 }}>
                    <strong>Selected Plant:</strong> {selectedPlant.plant_name}{" "}
                    ({selectedPlant.plant_storage_location_id})
                </div>
            )}

            <Modal
                title="Select a Plant"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={800}
            >
                <Table
                    rowKey="plant_storage_location_id"
                    columns={columns}
                    dataSource={data}
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                    size="small"
                    onRow={(record) => ({
                        onClick: () => handleRowClick(record),
                        style: { cursor: "pointer" },
                    })}
                />
            </Modal>
        </>
    );
};

export default PlantSelector;

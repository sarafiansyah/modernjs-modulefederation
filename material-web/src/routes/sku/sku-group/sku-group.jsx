import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Tag, Space, message } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";

const { confirm } = Modal;

const PageSkuBrand = ({ responsibleUserId }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlant, setEditingPlant] = useState(null);
    const [form] = Form.useForm();

    // 🔹 Fetch Data
    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/material/sku-brand");
            if (res.data.status === 200) {
                setData(res.data.body.data || []);
            } else {
                message.error(res.data.error || "Error fetching plants ❌");
            }
        } catch (err) {
            message.error(
                err.response?.data?.error || "Failed to fetch plant ❌"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // 🔹 Save (Add/Edit)
    const handleAdd = async () => {
        try {
            const values = form.getFieldsValue(true);
            const payload = {
                transaction_type: editingPlant ? "EDIT" : "ADD",
                plant_storage_location_id:
                    editingPlant?.plant_storage_location_id,
                plant_id: values.plantId || 1,
                storage_location_id: values.storageLocationId || 20,
                effective_start_datetime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                effective_finish_datetime: dayjs("2099-12-31 23:59:59").format(
                    "YYYY-MM-DD HH:mm:ss"
                ),
                responsible_user_id: responsibleUserId,
            };

            const res = await axios.post("/api/material/sku-brand", payload, {
                headers: { "Content-Type": "application/json" },
                validateStatus: () => true,
            });

            if (res.data.status === 200) {
                message.success("Plant saved successfully ✅");
                setIsModalOpen(false);
                form.resetFields();
                fetchData();
            } else {
                message.error(
                    res.data.body?.error_message || "Failed to save plant ❌"
                );
            }
        } catch (err) {
            message.error(
                err.response?.data?.error || "Failed to save plant ❌"
            );
        }
    };

    // 🔹 Delete (with confirm)
    const confirmDelete = (record) => {
        confirm({
            title: "Are you sure you want to delete this plant?",
            icon: <ExclamationCircleOutlined />,
            content: `Plant ID: ${record.plant_storage_location_id}`,
            okText: "Yes, Delete",
            okType: "danger",
            cancelText: "Cancel",
            onOk: async () => {
                try {
                    const payload = {
                        transaction_type: "DELETE",
                        plant_storage_location_id:
                            record.plant_storage_location_id,
                        responsible_user_id: responsibleUserId,
                    };

                    await axios.delete("/api/material/sku-brand", {
                        headers: { "Content-Type": "application/json" },
                        data: payload,
                    });

                    message.success("Plant deleted successfully 🗑️");
                    fetchData();
                } catch (err) {
                    message.error(
                        err.response?.data?.error || "Failed to delete plant ❌"
                    );
                }
            },
        });
    };

    // 🔹 Edit handler
    const onEdit = (record) => {
        setEditingPlant(record);
        form.setFieldsValue({
            plantId: record.plant_id,
            storageLocationId: record.storage_location_id,
        });
        setIsModalOpen(true);
    };

    const columns = [
        {
            title: "No.",
            dataIndex: "row_number",
            key: "row_number",
            width: 60,
        },
        {
            title: "Brand Code",
            dataIndex: "sku_brand_code",
            key: "company_name",
            width: 120,
        },
        {
            title: "Brand Name",
            dataIndex: "sku_brand_name",
            key: "plant_name",
            width: 120,
        },
        {
            title: "STATUS",
            dataIndex: "status_name",
            align: "center",
            width: "8%",
            render(text, record) {
                return {
                    props: { style: { textAlign: "center" } },
                    children: (
                        <Tag
                            color={
                                record.status_name === "Created"
                                    ? "orange"
                                    : record.status_name === "Edited" ||
                                      record.status_name === "Revised"
                                    ? "gold"
                                    : record.status_name === "Rejected" ||
                                      record.status_name === "Denied" ||
                                      record.status_name === "Expired"
                                    ? "red"
                                    : record.status_name === "Ask For Revision"
                                    ? "volcano"
                                    : record.status_name === "Submitted"
                                    ? "blue"
                                    : record.status_name === "Approved"
                                    ? "blue"
                                    : record.status_name === "Released"
                                    ? "green"
                                    : "default"
                            }
                        >
                            {text?.toUpperCase()}
                        </Tag>
                    ),
                };
            },
        },
        {
            title: "Created At",
            dataIndex: "created_datetime",
            key: "created_datetime",
            width: 150,
        },
        {
            title: "Action",
            key: "action",
            width: 120,
            render: (_, record) => (
                <Space>
                    <Button
                        color="warning"
                        variant="solid"
                        shape="circle"
                        icon={<EditOutlined />}
                        onClick={() => onEdit(record)}
                    />
                    <Button
                        color="danger"
                        variant="solid"
                        shape="circle"
                        icon={<DeleteOutlined />}
                        onClick={() => confirmDelete(record)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ marginBottom: 16 }}
                onClick={() => {
                    setEditingPlant(null);
                    setIsModalOpen(true);
                }}
            >
                Add Plant
            </Button>

            <Table
                rowKey="plant_storage_location_id"
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={{ pageSize: 10 }}
                size="small"
            />

            <Modal
                title={
                    editingPlant
                        ? "Edit Plant Storage Location"
                        : "Add New Plant Storage Location"
                }
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleAdd}
                okText={editingPlant ? "Update" : "Save"}
                destroyOnClose
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="plantId"
                        label="Plant"
                        rules={[
                            {
                                required: true,
                                message: "Please input plant ID",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="storageLocationId"
                        label="Storage Location"
                        rules={[
                            {
                                required: true,
                                message: "Please input storage location ID",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default PageSkuBrand;

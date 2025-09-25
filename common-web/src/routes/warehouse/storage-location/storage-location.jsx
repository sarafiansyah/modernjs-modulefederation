import React from "react";
import { Table, Button, Modal, Form, Input, Tag, Space } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";

const { confirm } = Modal;

const PageStorageLocation = ({
    data,
    loading,
    isModalOpen,
    form,
    setIsModalOpen,
    onAdd,
    onEdit,
    onDelete,
}) => {
    const confirmDelete = (record) => {
        confirm({
            title: "Are you sure you want to delete this plant?",
            icon: <ExclamationCircleOutlined />,
            content: `Plant ID: ${record.plant_storage_location_id}`,
            okText: "Yes, Delete",
            okType: "danger",
            cancelText: "Cancel",
            onOk: () => onDelete(record),
        });
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
        {
            title: "Created By",
            dataIndex: "created_user_name",
            key: "created_user_name",
            width: 100,
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
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => onEdit(record)}
                    />
                    <Button
                        type="link"
                        danger
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
                onClick={() => setIsModalOpen(true)}
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
                title="Add New Plant Storage Location"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={onAdd}
                okText="Save"
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="company_name"
                        label="Company"
                        rules={[
                            {
                                required: true,
                                message: "Please input company name",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="plant_name"
                        label="Plant"
                        rules={[
                            {
                                required: true,
                                message: "Please input plant name",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="storage_location_name"
                        label="Storage Location"
                        rules={[
                            {
                                required: true,
                                message: "Please input storage location",
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

export default PageStorageLocation;

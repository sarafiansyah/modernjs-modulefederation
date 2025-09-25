import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";

// Remote import (via Module Federation)
import PlantStorageLocationTableRemote from "common/PageStorageLocations";

const PlantStorageLocationContainer = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlant, setEditingPlant] = useState(null);
    const [form] = Form.useForm();

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/warehouse/plant");
            if (res.data.status === 200) setData(res.data.body.data || []);
            else message.error(res.data.error || "Error fetching plants ❌");
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
                responsible_user_id: 1,
            };

            const res = await axios.post("/api/warehouse/plant", payload, {
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
                    res.data.body.error_message || "Failed to save plant ❌"
                );
            }
        } catch (err) {
            message.error(
                err.response?.data?.error || "Failed to save plant ❌"
            );
        }
    };

    const handleDelete = async (record) => {
        try {
            const payload = {
                transaction_type: "DELETE",
                plant_storage_location_id: record.plant_storage_location_id,
                responsible_user_id: 1,
            };

            await axios.delete("/api/warehouse/plant", {
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
    };

    return (
        <PlantStorageLocationTableRemote
            data={data}
            loading={loading}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            form={form}
            onAdd={handleAdd}
            onEdit={setEditingPlant}
            onDelete={handleDelete}
        />
    );
};

export default PlantStorageLocationContainer;

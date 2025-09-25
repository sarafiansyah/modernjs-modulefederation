import axios from "axios";

// --------------------
// GET Handler
// --------------------
export const get = async () => {
    try {
        const res = await axios.get(
            process.env.ENTERPRISE_STRUCTURE_BASE_URL +
                process.env.ENTERPRISE_STRUCTURE_API_VERSION +
                "/inventory/storage-locations",
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        return {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: res.data,
        };
    } catch (err: any) {
        console.error("[BFF] GET failed:", err.response?.data || err.message);
        return {
            status: err.response?.status || 500,
            body: {
                error:
                    err.response?.data || err.message || "Something went wrong",
            },
        };
    }
};

// --------------------
// POST Handler (ADD / EDIT)
// --------------------
type IData = {
    transaction_type: "ADD" | "EDIT";
    plant_id: number;
    storage_location_id: number;
    effective_start_datetime: string;
    effective_finish_datetime: string;
    responsible_user_id: number;
    plant_storage_location_id?: number;
};

export async function post({ data }: { data: IData }) {
    try {
        console.log("[BFF] Received payload:", data);

        const res = await axios.post(
            process.env.ENTERPRISE_STRUCTURE_BASE_URL +
                process.env.ENTERPRISE_STRUCTURE_API_VERSION +
                "/inventory/storage-locations",
            data,
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        return {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: res.data,
        };
    } catch (err: any) {
        console.error("[BFF] POST failed:", err.response?.data || err.message);
        return {
            status: err.response?.status || 500,
            headers: { "Content-Type": "application/json" },
            body: err.response?.data || {
                error: err.message ?? "Something went wrong",
            },
        };
    }
}

// --------------------
// DELETE Handler
// --------------------
type DeletePayload = {
    plant_storage_location_id: string;
    responsible_user_id?: number;
};

export async function del({ data }: { data: DeletePayload }) {
    try {
        const res = await axios.delete(
            process.env.ENTERPRISE_STRUCTURE_BASE_URL +
                process.env.ENTERPRISE_STRUCTURE_API_VERSION +
                "/inventory/storage-locations",
            {
                headers: { "Content-Type": "application/json" },
                data: {
                    transaction_type: "DELETE",
                    plant_storage_location_id: data.plant_storage_location_id,
                    responsible_user_id: data.responsible_user_id ?? 1,
                },
            }
        );

        return {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: res.data,
        };
    } catch (err: any) {
        console.error(
            "[BFF] DELETE failed:",
            err.response?.data || err.message
        );
        return {
            status: err.response?.status || 500,
            headers: { "Content-Type": "application/json" },
            body: err.response?.data || {
                error: err.message ?? "Something went wrong",
            },
        };
    }
}

import React from "react";
import AppLayout from "./layout/page";
import { Outlet } from "@modern-js/runtime/router";

export default function RootLayout() {
    return (
        <AppLayout>
            <Outlet />
        </AppLayout>
    );
}

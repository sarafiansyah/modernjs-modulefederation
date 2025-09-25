import React, { useState } from "react";
import { Layout, Menu, Card, theme, ConfigProvider } from "antd";
import {
    DashboardOutlined,
    UserOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "@modern-js/runtime/router";
import ErrorBoundary from "../../components/ErrorBoundary";
import "../index.css";

const { Sider, Content } = Layout;

const SidebarMenu = ({ collapsed }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine selected key
    let selectedKey = "1";
    if (location.pathname === "/users") selectedKey = "2";
    else if (location.pathname === "/settings") selectedKey = "3";
    else if (location.pathname === "/material") selectedKey = "4";
    else if (location.pathname === "/material/sku") selectedKey = "5";
    else if (location.pathname === "/warehouse") selectedKey = "6";
    else if (location.pathname === "/warehouse/plant") selectedKey = "7";

    return (
        <Menu
            theme="light"
            selectedKeys={[selectedKey]}
            mode="inline"
            inlineCollapsed={collapsed}
            onClick={({ key }) => {
                switch (key) {
                    case "1":
                        navigate("/");
                        break;
                    case "2":
                        navigate("/users");
                        break;
                    case "3":
                        navigate("/settings");
                        break;
                    case "4":
                        navigate("/material");
                        break;
                    case "5":
                        navigate("/material/sku");
                        break;
                    case "6":
                        navigate("/warehouse");
                        break;
                    case "7":
                        navigate("/warehouse/plant");
                        break;
                }
            }}
            items={[
                { key: "1", icon: <DashboardOutlined />, label: "Dashboard" },
                { key: "2", icon: <UserOutlined />, label: "Users" },
                { key: "3", icon: <SettingOutlined />, label: "Settings" },
                {
                    icon: <SettingOutlined />,
                    label: "Material",
                    children: [
                        { key: "4", label: "Overview" },
                        { key: "5", label: "SKU" },
                    ],
                },
                {
                    icon: <SettingOutlined />,
                    label: "Warehouse",
                    children: [
                        { key: "6", label: "Overview" },
                        { key: "7", label: "Plant" },
                    ],
                },
            ]}
        />
    );
};

export default function DashboardLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const location = useLocation();

    // Map paths to titles dynamically
    const pageTitles = {
        "/": "Dashboard",
        "/users": "Users",
        "/settings": "Settings",
        "/material": "Material Overview",
        "/material/sku": "Material SKU",
        "/warehouse": "Overview",
        "/warehouse/plant": "Plant",
    };

    const currentTitle = pageTitles[location.pathname] || "My Dashboard";

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#32bd37ff",
                },
            }}
        >
            <Layout style={{ minHeight: "100vh" }}>
                {/* Sidebar */}
                <Sider
                    collapsed={collapsed}
                    onCollapse={setCollapsed}
                    width={220}
                    style={{
                        background: "#fff",
                        borderRight: "1px solid #f0f0f0",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            height: 48,
                            margin: "16px",
                            background: "#1abf1fff",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "1.2rem",
                            borderRadius: 8,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            userSelect: "none",
                            transition: "all 0.3s ease",
                        }}
                    >
                        {collapsed ? "K" : "KREASIPANGAN"}
                    </div>
                    <SidebarMenu collapsed={collapsed} />
                </Sider>

                {/* Main Layout */}
                <Layout style={{ padding: "12px" }}>
                    {/* Header Card */}
                    <Card
                        bodyStyle={{
                            padding: "18px 22px",
                            fontWeight: 600,
                            fontSize: "26px",
                            color: "#454545ff",
                            lineHeight: "1.2",
                        }}
                        style={{
                            marginBottom: "14px",
                            borderRadius: "6px",
                            flexShrink: 0,
                            fontFamily: "Poppins, sans-serif",
                        }}
                    >
                        {currentTitle}
                    </Card>

                    {/* Content */}
                    <Content
                        style={{
                            background: colorBgContainer,
                            padding: "12px",
                            borderRadius: "8px",
                            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                            overflow: "auto",
                            minHeight: 0,
                        }}
                    >
                        <ErrorBoundary>
                            <Outlet />
                        </ErrorBoundary>
                    </Content>

                    {/* Footer */}
                    <Card
                        bodyStyle={{
                            padding: "8px 22px",
                            fontWeight: 500,
                            fontSize: "12px",
                            lineHeight: "1.2",
                            textAlign: "center",
                        }}
                        style={{
                            marginTop: "14px",
                            borderRadius: "6px",
                            flexShrink: 0,
                            fontFamily: "Poppins, sans-serif",
                        }}
                    >
                        © {new Date().getFullYear()} Kreasi Pangan Samadhi. All
                        Rights Reserved
                    </Card>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
}

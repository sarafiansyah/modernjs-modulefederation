import React, { useState } from "react";
import { ReactComponent as KreasiPanganIcon } from "@/public/kreasipangan02.svg";
import KreasiPanganIconMinimized from "@/public/kedaisayur-app.png";
import {
    Layout,
    Menu,
    Card,
    theme,
    ConfigProvider,
    Spin,
    Avatar,
    Dropdown,
    Image,
    Space,
} from "antd";
import {
    DashboardOutlined,
    UserOutlined,
    SettingOutlined,
    GoldOutlined,
    ShopOutlined,
    DownOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "@modern-js/runtime/router";
import ErrorBoundary from "../components/ErrorBoundary";
import "../index.css";

const { Sider, Content } = Layout;

const SidebarMenu = ({ collapsed, setLoading }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine selected key
    let selectedKey = "1";
    if (location.pathname === "/material/sku-group") selectedKey = "4";
    else if (location.pathname === "/material/sku-brand") selectedKey = "5";
    else if (location.pathname === "/warehouse/plant") selectedKey = "6";
    else if (location.pathname === "/warehouse/storage-location")
        selectedKey = "7";

    const handleClick = (path) => {
        const currentBase = location.pathname.split("/")[1]; // e.g. "warehouse"
        const targetBase = path.split("/")[1]; // e.g. "material"

        if (currentBase && currentBase === targetBase) {
            // same parent → soft navigate
            navigate(path);
        } else {
            // different parent → hard reload
            setLoading(true);
            window.location.href = path;
        }
    };

    return (
        <Menu
            theme="light"
            selectedKeys={[selectedKey]}
            mode="inline"
            inlineCollapsed={collapsed}
            onClick={({ key }) => {
                switch (key) {
                    case "1":
                        handleClick("/");
                        break;
                    case "4":
                        handleClick("/material/sku-group");
                        break;
                    case "5":
                        handleClick("/material/sku-brand");
                        break;
                    case "6":
                        handleClick("/warehouse/plant");
                        break;
                    case "7":
                        handleClick("/warehouse/storage-location");
                        break;
                }
            }}
            items={[
                { key: "1", icon: <DashboardOutlined />, label: "Dashboard" },
                {
                    icon: <GoldOutlined />,
                    label: "Material",
                    children: [
                        { key: "4", label: "SKU Group" },
                        { key: "5", label: "SKU Brand" },
                    ],
                },
                {
                    icon: <ShopOutlined />,
                    label: "Warehouse",
                    children: [
                        { key: "6", label: "Plant" },
                        { key: "7", label: "Storage Location" },
                    ],
                },
            ]}
        />
    );
};

const ProfileItems = [
    {
        key: "profile",
        label: "Profile",
    },
    {
        key: "settings",
        label: "Settings",
    },
    {
        key: "logout",
        label: "Logout",
    },
];

export default function DashboardLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    // Map paths to titles dynamically
    const pageTitles = {
        "/": "Dashboard",
        "/material/sku-group": "SKU Group",
        "/material/sku-brand": "SKU Brand",
        "/warehouse/plant": "Plant",
        "/warehouse/storage-location": "Storage Location",
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
            {loading && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(255,255,255,0.6)",
                        zIndex: 9999,
                    }}
                >
                    <Spin size="large" tip="Loading..." />
                </div>
            )}

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
                            margin: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            userSelect: "none",
                            transition: "all 0.3s ease",
                        }}
                    >
                        {collapsed ? (
                            <img
                                src={KreasiPanganIconMinimized}
                                alt="Kitten"
                                width={30}
                            />
                        ) : (
                            <KreasiPanganIcon width={200} height={200} />
                        )}
                    </div>
                    <div
                        style={{
                            paddingLeft: 0,
                            // marginLeft: "-8px",
                            flex: 1,
                            overflowY: "auto",
                            height: "calc(100vh - 160px)",
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        <SidebarMenu
                            collapsed={collapsed}
                            setLoading={setLoading}
                        />
                    </div>

                    {/* <div
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            height: 24,
                            margin: "16px",
                            background: "#b1b1b1ff",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "16px",
                            borderRadius: 8,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            userSelect: "none",
                            transition: "all 0.3s ease",
                        }}
                    >
                        {collapsed ? "K" : "IT SOLUTION"}
                    </div> */}
                    {!collapsed && (
                        <Card
                            hoverable
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                margin: "16px",
                                backgroundColor: "#b1b1b1ff",
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: "16px",
                                borderRadius: 8,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                userSelect: "none",
                                transition: "all 0.3s ease",
                                height: 40,
                                textAlign: "center",
                            }}
                        >
                            {collapsed ? "K" : "IT SOLUTION"}
                        </Card>
                    )}
                </Sider>

                {/* Main Layout */}
                <Layout style={{ padding: "12px" }}>
                    {/* Header Card */}
                    <Card
                        bodyStyle={{
                            padding: "14px 22px",
                            display: "flex",
                            alignItems: "center",
                        }}
                        style={{
                            marginBottom: "14px",
                            borderRadius: "6px",
                            flexShrink: 0,
                            fontFamily: "Poppins, sans-serif",
                        }}
                    >
                        {/* Title on left */}
                        <span
                            style={{
                                fontWeight: 600,
                                fontSize: "22px",
                                color: "#454545ff",
                                lineHeight: 1.2,
                                flexShrink: 0, // title won’t shrink
                            }}
                        >
                            {currentTitle}
                        </span>

                        {/* Profile on right */}
                        <Dropdown
                            menu={{ items: ProfileItems }}
                            trigger={["click"]}
                        >
                            <Space
                                style={{
                                    cursor: "pointer",
                                    marginLeft: "auto",
                                }}
                            >
                                <Avatar size="large" icon={<UserOutlined />} />
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            lineHeight: 1.1,
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontWeight: 600,
                                                fontSize: "14px",
                                                marginBottom: "2px", // tighter gap
                                            }}
                                        >
                                            Mahesa Rafian Syah
                                        </span>
                                        <span
                                            style={{
                                                fontSize: "12px",
                                                color: "#888",
                                            }}
                                        >
                                            Administrator
                                        </span>
                                    </div>
                                </div>
                            </Space>
                        </Dropdown>
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

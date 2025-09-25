import { createModuleFederationConfig } from "@module-federation/modern-js";

const config: ReturnType<typeof createModuleFederationConfig> =
    createModuleFederationConfig({
        name: "admin-web",
        remotes: {
            common: "common@http://localhost:3001/static/mf-manifest.json",
            material: "material@http://localhost:3002/static/mf-manifest.json",
        },
        shared: {
            react: { eager: true },
            "react-dom": { eager: true },
            antd: { eager: true },
            "@ant-design/icons": { eager: true },
        },
    });

export default config;

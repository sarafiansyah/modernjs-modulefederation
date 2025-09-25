import { createModuleFederationConfig } from "@module-federation/modern-js";

const config: ReturnType<typeof createModuleFederationConfig> =
    createModuleFederationConfig({
        name: "material",
        filename: "remoteEntry.js",
        manifest: {
            filePath: "static",
        },
        exposes: {
            "./MFstatus": "./src/constants/mf-status",
            "./PageSkuBrand": "./src/routes/sku/sku-brand/sku-brand.jsx",
            "./PageSkuGroup": "./src/routes/sku/sku-group/sku-group.jsx",
            "./ComponentSearchPlants": "./src/components/plant/SearchPlant.jsx",
        },
        dts: false,
        shared: {
            react: { eager: true },
            "react-dom": { eager: true },
            antd: { eager: true },
            "@ant-design/icons": { eager: true },
        },
    });

export default config;

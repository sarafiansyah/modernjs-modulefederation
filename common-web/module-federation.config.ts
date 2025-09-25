import { createModuleFederationConfig } from "@module-federation/modern-js";

const config: ReturnType<typeof createModuleFederationConfig> =
    createModuleFederationConfig({
        name: "common", // must match Garfish name
        filename: "remoteEntry.js", // ✅ just the file name
        manifest: {
            filePath: "static", // ✅ served from /static
        },
        exposes: {
            "./MFstatus": "./src/constants/mf-status",
            "./PagePlants": "./src/routes/warehouse/plant/plant.jsx",
            "./PageStorageLocations":
                "./src/routes/warehouse/storage-location/storage-location.jsx",
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

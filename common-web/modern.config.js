import { appTools } from "@modern-js/app-tools";
import { moduleFederationPlugin } from "@module-federation/modern-js";
import { TsCheckerRspackPlugin } from "ts-checker-rspack-plugin";
import { bffPlugin } from "@modern-js/plugin-bff";

/** @type {import('@modern-js/app-tools').UserConfig} */
export default {
    runtime: {
        router: true,
        ssr: true,
    },
    dev: {
        port: 3001,
    },
    server: {
        ssr: true,
    },
    plugins: [
        appTools({
            bundler: "rspack",
            tools: {
                rspack: {
                    plugins: [
                        new TsCheckerRspackPlugin({
                            typescript: {
                                memoryLimit: 8192,
                            },
                        }),
                    ],
                },
            },
        }),
        moduleFederationPlugin({
            name: "common",
            filename: "remoteEntry.js", // ✅ Just the file name
            manifest: {
                filePath: "static", // ✅ Ensures it's served from /static
            },
            exposes: {
                "./PagePlants": "./src/routes/warehouse/plant/plant.jsx",
                "./PageStorageLocations":
                    "./src/routes/warehouse/storage-location/storage-location.jsx",
                "./ComponentSearchPlants":
                    "./src/components/plant/SearchPlant.jsx",
            },
            shared: {
                react: { singleton: true },
                "react-dom": { singleton: true },
                antd: { singleton: true },
            },
        }),
        bffPlugin(),
    ],
};

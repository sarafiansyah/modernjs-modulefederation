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
        port: 3002,
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
            name: "material",
            filename: "remoteEntry.js",
            manifest: {
                filePath: "static",
            },
            exposes: {
                "./PageSkuBrand": "./src/routes/sku/sku-brand/sku-brand.jsx",
                "./PageSkuGroup": "./src/routes/sku/sku-group/sku-group.jsx",
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

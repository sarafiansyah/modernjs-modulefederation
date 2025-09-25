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
    server: {
        port: 3000,
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
                                memoryLimit: 8192, // Increase to 8GB
                            },
                        }),
                    ],
                },
            },
        }),
        moduleFederationPlugin({
            remotes: {
                common: "common@http://localhost:3001/static/mf-manifest.json",
                material:
                    "material@http://localhost:3002/static/mf-manifest.json",
            },
        }),
        bffPlugin(),
    ],
    source: {
        envVars: [
            "ENTERPRISE_STRUCTURE_BASE_URL",
            "ENTERPRISE_STRUCTURE_API_VERSION",
        ],
    },
};

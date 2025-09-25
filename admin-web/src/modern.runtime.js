import { defineRuntimeConfig } from "@modern-js/runtime";

export default defineRuntimeConfig({
    runtime: {
        remotes: {
            common: "common@http://localhost:3001/static/mf-manifest.json",
            material: "material@http://localhost:3002/static/mf-manifest.json",
        },
    },
});

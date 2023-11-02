import { defineConfig } from "svg-sprite-compose-cli";

export default defineConfig({
  input: [
    {
      dir: "svg",
      svgoConfig: {
        // Add your svgo configuration here (optional).
      },
      enableSvgo: true, // Set to `false` to disable svgo optimization (optional).
    },
    // Add more input directories if needed.
  ],
  output: {
    dir: "result",
    spriteName: "sprite.svg", // Set the output sprite file name (optional).
    makeIdsArray: true,
  },
  disabled: false, // Set to `true` to disable the plugin (optional).
  defaultSvgoConfig: {
    // Add your default svgo configuration here (optional).
  },
  idPrefix: "icon-", // Add an optional prefix to the SVG IDs (optional).
});

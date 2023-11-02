import { PluginConfig } from "./types.ts";
import { getFullPath } from "./getFullPath.ts";

export async function getConfig(options: { config: string }) {
  const config: { default: PluginConfig } = await import(
    getFullPath(options.config)
  );

  const {
    input,
    output,
    disabled = false,
    defaultSvgoConfig = {},
    idPrefix = "",
  } = config.default;

  const {
    dir: outputDir,
    spriteName = "sprite.svg",
    makeIdsArray = false,
    idsArrayName = "sprite-ids.json",
  } = output;

  const ids: string[] = [];

  const fullOutputDir = getFullPath(outputDir);

  const spriteConfig = {
    shape: {
      id: {
        generator(fileName: string) {
          const id = fileName.replace(/\.svg$/, "");
          const name = `${idPrefix}${id}`;

          if (makeIdsArray) {
            ids.push(name);
          }

          return name;
        },
      },
    },
    mode: {
      symbol: {
        dest: fullOutputDir,
        sprite: spriteName,
      },
    },
    svg: {
      xmlDeclaration: false,
    },
  };
  return {
    input,
    disabled,
    defaultSvgoConfig,
    spriteName,
    makeIdsArray,
    idsArrayName,
    ids,
    fullOutputDir,
    spriteConfig,
  };
}

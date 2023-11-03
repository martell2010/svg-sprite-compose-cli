import { PluginConfig } from "./types.ts";
import { getFullPath } from "./getFullPath.ts";
import { generateSprite } from "./generateSprite.ts";

export const spriteHandler = async (options: { config: string }) => {
  const config: { default: PluginConfig } = await import(
    getFullPath(options.config)
  );

  await generateSprite(config.default);
};

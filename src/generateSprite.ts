import { InputConfig } from "./types.ts";
import SVGSprite from "svg-sprite";
import fs from "fs";
import path from "path";
import { optimize } from "svgo";
import { getConfig } from "./getConfig.ts";
import { getFullPath } from "./getFullPath.ts";
import { generateResultFiles } from "./generateResultFiles.ts";

export const generateSprite = async (options: { config: string }) => {
  const {
    input,
    disabled,
    defaultSvgoConfig,
    spriteName,
    makeIdsArray,
    idsArrayName,
    ids,
    fullOutputDir,
    spriteConfig,
  } = await getConfig(options);

  if (disabled) return;

  const spriter = new SVGSprite(spriteConfig);

  function processFile(
    fileName: string,
    inputDirConfig: InputConfig,
    fullPathDir: string,
  ) {
    const { svgoConfig, enableSvgo = true } = inputDirConfig;

    if (!/\.svg$/.test(fileName)) return;

    const filePath = path.join(fullPathDir, fileName);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const svg = enableSvgo
      ? optimize(fileContent, svgoConfig ?? defaultSvgoConfig).data
      : fileContent;

    spriter.add(fileName, "", svg);
  }

  function processInput(inputDirConfig: InputConfig) {
    const { dir } = inputDirConfig;

    const fullPathDir = getFullPath(dir);

    const iconFiles = fs.readdirSync(fullPathDir);

    iconFiles.forEach((fileName) =>
      processFile(fileName, inputDirConfig, fullPathDir),
    );
  }

  input.forEach(processInput);

  const { result } = await spriter.compileAsync();

  generateResultFiles(
    fullOutputDir,
    spriteName,
    result,
    makeIdsArray,
    idsArrayName,
    ids,
  );
};

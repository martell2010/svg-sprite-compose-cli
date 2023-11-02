import fs from "fs";

export function generateResultFiles(
  fullOutputDir: string,
  spriteName: string,
  result: any,
  makeIdsArray: boolean,
  idsArrayName: string,
  ids: string[],
) {
  fs.writeFileSync(
    `${fullOutputDir}/${spriteName}`,
    result.symbol.sprite.contents,
  );

  if (makeIdsArray) {
    fs.writeFileSync(`${fullOutputDir}/${idsArrayName}`, JSON.stringify(ids));
  }
}

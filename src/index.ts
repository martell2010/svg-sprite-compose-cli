#!/usr/bin/env node

import { Command } from "commander";
import { PluginConfig } from "./types.ts";
import { spriteHandler } from "./spriteHandler.ts";
const program = new Command();

program
  .option("-c, --config <configPath>", "Path to config file")
  .action(spriteHandler);

program.parse();

export const defineConfig = (config: PluginConfig): PluginConfig => config;
export { generateSprite } from "./generateSprite.ts";

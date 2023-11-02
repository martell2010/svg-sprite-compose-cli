#!/usr/bin/env node

import { Command } from "commander";
import { generateSprite } from "./generateSprite.ts";
import { PluginConfig } from "./types.ts";
const program = new Command();

program
  .option("-c, --config <configPath>", "Path to config file")
  .action(generateSprite);

program.parse();

export const defineConfig = (config: PluginConfig): PluginConfig => config;

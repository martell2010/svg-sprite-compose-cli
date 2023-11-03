#!/usr/bin/env node

import { Command } from "commander";
import { spriteHandler } from "./spriteHandler.ts";
const program = new Command();

program
  .option("-c, --config <configPath>", "Path to config file")
  .action(spriteHandler);

program.parse();

import * as uiConfig from  './packages/ui/vite.config'
import { defineConfig } from "vite";

export default defineConfig(({ command, mode }) => {
  return {
    base: '/freeboard/',
    ...uiConfig,
  }
})

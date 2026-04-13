import { type App } from "@echo-app/server";
import { treaty } from "@elysiajs/eden";

export const client = treaty<App>("http://localhost:3000/");

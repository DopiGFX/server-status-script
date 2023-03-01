import { App } from "./App";
import dayjs from 'dayjs';
import dotenv from 'dotenv';

// Add Timestamp to Console
const fConsole = console.log;
console.log = (...data) => {
  fConsole("[" + dayjs().format("DD.MM.YYYY HH:mm") + "]", ...data)
}

dotenv.config()
new App()
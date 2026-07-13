import SftpClient from "ssh2-sftp-client";

const SFTP_HOST = process.env.SFTP_HOST || "dealerpullftp.blob.core.windows.net";
const SFTP_PORT = parseInt(process.env.SFTP_PORT || "22", 10);
const SFTP_USER = process.env.SFTP_USER || "dealerpullftp.kennedyauto";
const SFTP_PASS = process.env.SFTP_PASS || "XDbLrWMUyKBbFWc7rZmutQfJyPmOdD5R";
const SFTP_FILE = process.env.SFTP_FILE || "/inventory.csv";

let cachedCsv: string | null = null;
let cachedAt = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function fetchInventoryCsv(): Promise<string> {
  if (cachedCsv && Date.now() - cachedAt < CACHE_TTL) {
    return cachedCsv;
  }

  const sftp = new SftpClient();
  try {
    await sftp.connect({
      host: SFTP_HOST,
      port: SFTP_PORT,
      username: SFTP_USER,
      password: SFTP_PASS,
      readyTimeout: 20000,
    });
    const buffer = await sftp.get(SFTP_FILE);
    const text = buffer.toString("utf-8");
    cachedCsv = text;
    cachedAt = Date.now();
    return text;
  } finally {
    await sftp.end();
  }
}

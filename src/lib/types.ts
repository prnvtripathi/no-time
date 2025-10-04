export interface Site {
  name: string;
  url: string;
  owner: string;
  checkMethod?: string;
  timeoutMS?: number;
}

export interface ConfigFile {
  sites: Site[];
}

export interface UptimeResult {
  name: string;
  url: string;
  owner: string | null;
  status: "UP" | "DOWN";
  code: number;
  error?: string | null;
  rtt?: number | null;
  elapsed?: number | null;
  checkedAt: string;
}

export interface Log {
  name: string;
  status: string;
  code: number | string;
  rtt: number;
  url?: string
  checkedAt: string | number | Date;
}

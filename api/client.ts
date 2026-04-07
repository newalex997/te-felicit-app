const BASE_URL = "http://192.168.0.145:9000/api/v1";
//https://mesajedinsuflet-api-y6r9b.ondigitalocean.app/api/v1
let _locale: string | undefined;

export function setApiLocale(locale: string) {
  _locale = locale;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    ...(options?.headers as Record<string, string>),
  };
  if (_locale) {
    headers["Accept-Language"] = _locale;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
};

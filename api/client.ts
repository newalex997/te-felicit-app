const BASE_URL = "http://192.168.0.145:9000/api/v1";

async function request<T>(
  path: string,
  options?: RequestInit & { locale?: string },
): Promise<T> {
  const { locale, ...fetchOptions } = options ?? {};
  const headers: Record<string, string> = {
    ...(fetchOptions.headers as Record<string, string>),
  };
  if (locale) {
    headers["Accept-Language"] = locale;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...fetchOptions,
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
  get: <T>(path: string, locale?: string) =>
    request<T>(path, { locale }),
};

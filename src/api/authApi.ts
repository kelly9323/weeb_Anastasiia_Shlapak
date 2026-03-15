const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface UserInfo {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
}

export interface LoginResponse {
  access: string;
  user: UserInfo;
}

export interface RegisterData {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password_confirm: string;
}

export interface RegisterResponse {
  message: string;
  email: string;
}

export interface TokenRefreshResponse {
  access: string;
}

export class ApiError extends Error {
  status: number;
  data: Record<string, unknown>;

  constructor(status: number, data: Record<string, unknown>) {
    super(JSON.stringify(data));
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    const text = await response.text();
    if (!text) return undefined as T;
    return JSON.parse(text) as T;
  }
  let errorData: Record<string, unknown> = {};
  try {
    errorData = await response.json();
  } catch {
    errorData = { detail: response.statusText };
  }
  throw new ApiError(response.status, errorData);
}

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/users/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  return handleResponse<LoginResponse>(response);
}

export async function registerUser(
  data: RegisterData
): Promise<RegisterResponse> {
  const response = await fetch(`${API_BASE_URL}/users/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<RegisterResponse>(response);
}

export async function logoutUser(accessToken: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/users/logout/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });
  return handleResponse<void>(response);
}

export async function refreshTokens(): Promise<TokenRefreshResponse> {
  const response = await fetch(`${API_BASE_URL}/users/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  return handleResponse<TokenRefreshResponse>(response);
}

export async function requestPasswordReset(email: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/users/password-reset/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return handleResponse<void>(response);
}

export async function confirmPasswordReset(
  uid: string,
  token: string,
  new_password: string,
  new_password_confirm: string
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/users/password-reset/confirm/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid, token, new_password, new_password_confirm }),
  });
  return handleResponse<void>(response);
}

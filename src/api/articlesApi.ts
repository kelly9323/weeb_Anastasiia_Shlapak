const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  author: string;
  author_user: number | null;
}

export interface CreateArticleData {
  title: string;
  content: string;
}

export interface ContactFormData {
  first_name: string;
  last_name: string;
  phone: string | null;
  email: string;
  message: string;
}

// Token refresh injected by AuthProvider to avoid circular imports
type TokenRefresher = () => Promise<string | null>;
let doRefreshToken: TokenRefresher = async () => null;

export function setTokenRefresher(refresher: TokenRefresher) {
  doRefreshToken = refresher;
}

function getAccessToken(): string | null {
  return localStorage.getItem("weeb_access_token");
}

async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getAccessToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  let response = await fetch(url, { ...options, headers });

  if (response.status === 401 && token) {
    // Unauthorized - try refreshing token and retrying once
    const newToken = await doRefreshToken();
    if (newToken) {
      const retryHeaders = { ...headers, Authorization: `Bearer ${newToken}` };
      response = await fetch(url, { ...options, headers: retryHeaders });
    }
  }

  return response;
}

/**
 * Fetch all articles
 */
export const fetchArticles = async (): Promise<Article[]> => {
  const response = await fetch(`${API_BASE_URL}/articles/`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  return Array.isArray(data) ? data : data.results || [];
};

/**
 * Fetch single article by id
 */
export const fetchArticleById = async (id: number): Promise<Article> => {
  const response = await fetch(`${API_BASE_URL}/articles/${id}/`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
};

/**
 * Create new article (requires authentication)
 */
export const createArticle = async (
  data: CreateArticleData
): Promise<Article> => {
  const response = await fetchWithAuth(`${API_BASE_URL}/articles/`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la création");
  }

  return await response.json();
};

/**
 * Update article (requires authentication)
 */
export const updateArticle = async (
  id: number,
  data: CreateArticleData
): Promise<Article> => {
  const response = await fetchWithAuth(`${API_BASE_URL}/articles/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la mise à jour");
  }

  return await response.json();
};

/**
 * Delete article (requires authentication)
 */
export const deleteArticle = async (id: number): Promise<void> => {
  const response = await fetchWithAuth(`${API_BASE_URL}/articles/${id}/`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la suppression");
  }
};

/**
 * Contact form submission
 */
export const submitContactForm = async (
  data: ContactFormData
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/contact/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de l'envoi du formulaire de contact");
  }
  return await response.json();
};

const API_BASE_URL = "http://127.0.0.1:8000/api";

export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  author: string;
}

export interface CreateArticleData {
  title: string;
  content: string;
  author?: string;
}

export interface ContactFormData {
  first_name: string; 
  last_name: string; 
  phone: string | null;
  email: string;
  message: string;
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
 * Create new article
 */
export const createArticle = async (
  data: CreateArticleData
): Promise<Article> => {
  const response = await fetch(`${API_BASE_URL}/articles/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la création");
  }

  return await response.json();
};

/**
 * Update article 
 */
export const updateArticle = async (
  id: number,
  data: CreateArticleData
): Promise<Article> => {
  const response = await fetch(`${API_BASE_URL}/articles/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la mise à jour");
  }

  return await response.json();
};

/**
 * Delete article 
 */
export const deleteArticle = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/articles/${id}/`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la suppression");
  }
};

/**
 * Contact form submission
 */

export const submitContactForm = async (data: ContactFormData): Promise<void> => {
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

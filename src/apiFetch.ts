const API_URL = import.meta.env.VITE_API_URL;

interface FetchOptions extends RequestInit {
  path: string;
}

export async function apiFetch({ path, ...options }: FetchOptions) {
  try {
    console.log('API ', API_URL)
    const response = await fetch(`${API_URL}${path}`, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Erreur API inconnue');
    }

    // Essaye de parser JSON, sinon retourne null
    try {
      return await response.json();
    } catch {
      return null;
    }
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
}
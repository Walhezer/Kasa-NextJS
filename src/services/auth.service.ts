// The Express auth router is mounted at `/auth` (not `/api/auth`).
// Keep this URL separate from NEXT_PUBLIC_API_URL, which is used by the
// property API and includes the `/api` prefix.
const AUTH_API_URL = process.env.AUTH_API_URL || 'http://localhost:3000';
const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';
const MOCK_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJjbGllbnQiLCJpYXQiOjE2OTAwMDAwMDAsImV4cCI6MTk5MDAwMDAwMH0.fake_signature";

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    picture: string | null;
    role: 'client' | 'owner';
  };
}

export const authService = {
  /**
   * Registers a new user by sending their data to the backend API (or mocks it).
   * @param userData - The user's name, email, and password.
   * @returns A promise resolving to the AuthResponse containing the token and user data.
   */
  async register(userData: { name: string; email: string; password: string }): Promise<AuthResponse> {
    if (USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return {
        token: MOCK_TOKEN,
        user: { 
          id: 1, 
          name: userData.name, 
          email: userData.email, 
          picture: null, 
          role: 'client' 
        },
      };
    }

    const response = await fetch(`${AUTH_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Registration failed' }));
      throw new Error(error.message);
    }

    return response.json();
  },

  /**
   * Authenticates an existing user with their credentials (or mocks it).
   * @param credentials - The user's email and password.
   * @returns A promise resolving to the AuthResponse containing the token and user data.
   */
  async login(credentials: { email: string; password: string }): Promise<AuthResponse> {
    if (USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return {
        token: MOCK_TOKEN,
        user: { 
          id: 1, 
          name: 'Utilisateur Kasa', 
          email: credentials.email, 
          picture: null, 
          role: 'client' 
        },
      };
    }

    const response = await fetch(`${AUTH_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'E-mail ou mot de passe incorrect.' }));
      throw new Error(error.message);
    }

    return response.json();
  }
};
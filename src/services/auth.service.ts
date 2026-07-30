const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

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
   * Registers a new user by sending their data to the backend API.
   * @param userData - The user's name, email, and password.
   * @returns A promise resolving to the AuthResponse containing the token and user data.
   */
  async register(userData: { name: string; email: string; password: string }): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
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
   * Authenticates an existing user with their credentials.
   * @param credentials - The user's email and password.
   * @returns A promise resolving to the AuthResponse containing the token and user data.
   */
  async login(credentials: { email: string; password: string }): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Invalid credentials' }));
      throw new Error(error.message);
    }

    return response.json();
  }
};
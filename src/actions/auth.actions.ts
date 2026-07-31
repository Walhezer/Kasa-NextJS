'use server';

import { authService } from '../services/auth.service';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Server action to handle user registration.
 * Processes form data, calls the auth service, and sets a secure cookie upon success.
 * 
 * @param formData - The submitted form data containing lastName, firstName, email, and password.
 * @returns An object with an error message if it fails, otherwise redirects to the home page.
 */
export async function signupAction(formData: FormData) {
  try {
    const lastName = formData.get('lastName') as string;
    const firstName = formData.get('firstName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!lastName || !firstName || !email || !password) {
      return { error: 'Please fill in all fields.' };
    }

    const fullName = `${firstName} ${lastName}`.trim();

    const { token } = await authService.register({
      name: fullName,
      email,
      password,
    });

    const cookieStore = await cookies();
    cookieStore.set('kasa_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

  } catch (error: any) {
    return { error: error.message || 'Email might already be in use.' };
  }

  redirect('/');
}

/**
 * Server action to handle user authentication.
 * Verifies credentials, calls the auth service, and sets a secure cookie upon success.
 * 
 * @param formData - The submitted form data containing email and password.
 * @returns An object with an error message if it fails, otherwise redirects to the home page.
 */
export async function loginAction(formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return { error: 'Please provide both email and password.' };
    }

    const { token } = await authService.login({ email, password });

    const cookieStore = await cookies();
    cookieStore.set('kasa_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

  } catch (error: any) {
    return { error: 'Invalid credentials.' };
  }

  redirect('/');
}

/**
 * Server action to handle user logout.
 * Deletes the authentication cookie and redirects to the home page.
 */
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('kasa_token');
  
  redirect('/');
}
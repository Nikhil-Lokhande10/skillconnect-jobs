// Supabase-backed authentication utilities with local cache adapter for UI compatibility
import { supabase } from "@/lib/supabaseClient";

export interface User {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  location: string;
  userType: 'customer' | 'worker';
  skills?: string;
  experience?: string;
  serviceArea?: string;
  profilePicture?: string;
  idProof?: string;
  createdAt: string;
}

export const AUTH_STORAGE_KEY = 'skillconnect_auth';
export const USERS_STORAGE_KEY = 'skillconnect_users';

// Map Supabase profile row to local UI-friendly User shape
type SupabaseProfile = {
  user_id?: string;
  id?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  location?: string;
  role?: 'worker' | 'client';
  skills?: string[] | string | null;
  experience_years?: number | string | null;
  availability?: { serviceArea?: string } | null;
  created_at?: string;
};

const mapProfileToUser = (profile: SupabaseProfile): User => {
  const userType: 'customer' | 'worker' = profile.role === 'worker' ? 'worker' : 'customer';
  const skillsStr = Array.isArray(profile.skills) ? profile.skills.join(', ') : (profile.skills ?? '');
  const experienceStr = typeof profile.experience_years === 'number' ? String(profile.experience_years) : (profile.experience_years ?? '');
  const serviceArea = profile.availability?.serviceArea ?? '';
  return {
    id: profile.user_id ?? profile.id,
    fullName: profile.full_name ?? profile.email?.split('@')[0] ?? '',
    email: profile.email ?? '',
    mobile: profile.phone ?? '',
    location: profile.location ?? '',
    userType,
    skills: skillsStr,
    experience: experienceStr,
    serviceArea,
    createdAt: profile.created_at ?? new Date().toISOString()
  };
};

export const loginUser = async (email: string, password: string): Promise<User> => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) {
    throw new Error(error?.message || 'Login failed');
  }

  const { data: profileRow, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', data.user.id)
    .single();

  if (profileError || !profileRow) {
    // Create a minimal profile if missing
    const emailLocal = data.user.email ?? email;
    const { data: upserted } = await supabase.from('profiles').upsert({
      user_id: data.user.id,
      email: emailLocal,
      full_name: emailLocal.split('@')[0],
      role: 'client'
    }).select('*').single();
    const user = mapProfileToUser(upserted ?? { user_id: data.user.id, email: emailLocal, role: 'client' });
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  const user = mapProfileToUser(profileRow);
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  return user;
};

export const logoutUser = async (): Promise<void> => {
  await supabase.auth.signOut();
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem(AUTH_STORAGE_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

// Below are legacy helpers kept for backward compatibility in UI flows that still expect them.
// They operate only on localStorage and should be considered deprecated.
export const getUsers = (): User[] => {
  const usersStr = localStorage.getItem(USERS_STORAGE_KEY);
  return usersStr ? JSON.parse(usersStr) : [];
};

export const saveUser = (userData: Omit<User, 'id' | 'createdAt'>): User => {
  const users = getUsers();
  const existingUser = users.find(u => u.email === userData.email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  const newUser: User = {
    ...userData,
    id: 'user_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36),
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  return newUser;
};

export const savePassword = (email: string, password: string): void => {
  const passwords = JSON.parse(localStorage.getItem('skillconnect_passwords') || '{}');
  passwords[email] = password;
  localStorage.setItem('skillconnect_passwords', JSON.stringify(passwords));
};
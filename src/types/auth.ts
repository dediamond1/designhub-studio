
// Basic types that might still be useful for UI demonstrations
// without actual authentication functionality

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'team-member';
  verified: boolean;
}


// Dummy auth API functions for UI demo

// Simulate user data
const dummyUser = {
  id: '1',
  email: 'user@example.com',
  name: 'Demo User',
  role: 'admin',
  verified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  lastLogin: new Date()
};

// User login
export const login = async (email: string, password: string) => {
  console.log('Mock login:', email);
  return dummyUser;
};

// User registration
export const register = async (name: string, email: string, password: string) => {
  console.log('Mock registration:', email);
  return {
    user: { ...dummyUser, name, email },
    success: true
  };
};

// Get current user
export const getUser = async (userId: string) => {
  console.log('Mock get user:', userId);
  return dummyUser;
};

// Request password reset
export const forgotPassword = async (email: string) => {
  console.log('Mock forgot password:', email);
  return true;
};

// Reset password with token
export const changePassword = async (token: string, newPassword: string) => {
  console.log('Mock reset password with token:', token);
  return true;
};

// Verify email address
export const verifyUserEmail = async (token: string) => {
  console.log('Mock verify email:', token);
  return true;
};

// Admin: Get all users
export const getUsers = async () => {
  console.log('Mock get all users');
  return [
    dummyUser,
    { ...dummyUser, id: '2', name: 'Another User', email: 'another@example.com', role: 'user' },
    { ...dummyUser, id: '3', name: 'Team Member', email: 'team@example.com', role: 'team-member' }
  ];
};

// Admin: Update user role
export const updateRole = async (adminId: string, userId: string, role: 'admin' | 'user' | 'team-member') => {
  console.log(`Mock update role: User ${userId} to ${role}`);
  return { ...dummyUser, id: userId, role };
};

// Admin: Delete user
export const removeUser = async (adminId: string, userId: string) => {
  console.log(`Mock delete user: ${userId}`);
  return true;
};

// Admin: Invite team member
export const invite = async (adminId: string, email: string, name: string, role: 'admin' | 'team-member') => {
  console.log(`Mock invite: ${email} as ${role}`);
  return true;
};

// Accept invitation
export const acceptTeamInvitation = async (token: string, password: string) => {
  console.log(`Mock accept invitation with token: ${token}`);
  return {
    user: dummyUser,
    success: true
  };
};

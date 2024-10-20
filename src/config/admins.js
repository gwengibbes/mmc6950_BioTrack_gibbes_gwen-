// An environment variable is used to track which usernames are admins e.g.: user1,user2
export const adminUserNames = (process.env['ADMIN_USERNAMES'] ?? '').split(',');
db.createUser({
  user: 'proshop_admin',
  pwd: 'linuxtips123',
  roles: [
    {
      role: 'dbOwner',
      db: 'proshop',
    },
  ],
});
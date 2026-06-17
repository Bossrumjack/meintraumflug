module.exports = {
  apps: [{
    name: 'meintraumflug',
    script: 'npx',
    args: 'tsx server.ts',
    cwd: '/root/meintraumflug',
    env_file: '/root/meintraumflug/.env',
    max_memory_restart: '200M',
  }],
};

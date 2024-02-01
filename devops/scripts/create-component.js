const { exec } = require('child_process');

exec('node_modules\\.bin\\devops\\scripts\\create-component.sh', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  console.log(stdout);
});

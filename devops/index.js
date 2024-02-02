const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt user for component name
rl.question("Enter the name of the new React component: ", (componentName) => {
  const componentPath = path.join(__dirname, 'src', 'components', componentName);
  const tsxFilePath = path.join(componentPath, `${componentName}.tsx`);
  const scssFilePath = path.join(componentPath, `${componentName}.scss`);

  // Check if the component already exists
  if (fs.existsSync(tsxFilePath) || fs.existsSync(scssFilePath)) {
    console.error(`Error: Component '${componentName}' already exists.`);
    rl.close();
    process.exit(1);
  }

  // Create component directory
  fs.mkdirSync(componentPath, { recursive: true });

  // Copy and replace placeholders in templates
  fs.copyFileSync(path.join(__dirname, 'devops', 'templates', 'component.tsx.template'), tsxFilePath);
  fs.copyFileSync(path.join(__dirname, 'devops', 'templates', 'component.scss.template'), scssFilePath);

  // Replace placeholders with actual component name
  replacePlaceholder(tsxFilePath, '{{ComponentName}}', componentName);
  replacePlaceholder(scssFilePath, '{{ComponentName}}', componentName);

  console.log(`React component '${componentName}' created successfully at '${componentPath}'.`);
  rl.close();
});

function replacePlaceholder(filePath, placeholder, replacement) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const updatedContent = content.replace(new RegExp(placeholder, 'g'), replacement);
  fs.writeFileSync(filePath, updatedContent, 'utf-8');
}

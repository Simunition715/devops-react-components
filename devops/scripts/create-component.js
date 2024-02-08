const readline = require('readline');
const fs = require('fs');
const path = require('path');

function createComponent() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Prompt user for component name
  rl.question("Enter the name of the new React component: ", (componentName) => {
    const componentPath = path.join(process.cwd(), 'src', 'components', componentName); // Modified path to project root
    const tsxFilePath = path.join(componentPath, `${componentName}.tsx`);
    const scssFilePath = path.join(componentPath, `${componentName}.scss`);
    const templateDir = path.join(__dirname, '..', '..', '..', 'devops-react-components', 'devops', 'templates');

    // Check if the component already exists
    if (fs.existsSync(tsxFilePath) || fs.existsSync(scssFilePath)) {
      console.error(`Error: Component '${componentName}' already exists.`);
      rl.close();
      process.exit(1);
    }

    // Create component directory
    fs.mkdirSync(componentPath, { recursive: true });

    // Copy and replace placeholders in templates
    fs.copyFileSync(path.join(templateDir, 'component.tsx.template'), tsxFilePath);
    fs.copyFileSync(path.join(templateDir, 'component.scss.template'), scssFilePath);

    // Replace placeholders with actual component name
    replacePlaceholder(tsxFilePath, "${componentName}", componentName);
    replacePlaceholder(scssFilePath, "${componentName}", componentName);

    console.log(`React component '${componentName}' created successfully at '${componentPath}'.`);
    rl.close();
  });
}

function replacePlaceholder(filePath, placeholder, replacement) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const escapedPlaceholder = placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters
  const updatedContent = content.replace(new RegExp(escapedPlaceholder, 'g'), replacement);
  fs.writeFileSync(filePath, updatedContent, 'utf-8');
}


createComponent();

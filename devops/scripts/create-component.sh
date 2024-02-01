#!/bin/bash

# Prompt user for component name
read -p "Enter the name of the new React component: " componentName

# Define paths
componentPath="./src/components/${componentName}"
tsxFilePath="${componentPath}/${componentName}.tsx"
scssFilePath="${componentPath}/${componentName}.scss"

# Check if the component already exists
if [ -e "$tsxFilePath" ] || [ -e "$scssFilePath" ]; then
    echo "Error: Component '$componentName' already exists."
    exit 1
fi

# Create component directory
mkdir -p "$componentPath"

# Copy and replace placeholders in templates
cp "./devops/templates/component.tsx.template" "$tsxFilePath"
cp "./devops/templates/component.scss.template" "$scssFilePath"

# Replace placeholders with actual component name
sed -i "s/{{ComponentName}}/$componentName/g" "$tsxFilePath"
sed -i "s/{{ComponentName}}/$componentName/g" "$scssFilePath"

echo "React component '$componentName' created successfully at '$componentPath'."

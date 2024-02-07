const createComponentScript = require('./scripts/create-component');

const createReactComponent = (componentName) => {
    console.log(`Creating React component: ${componentName}`);
    createComponentScript();  // Call the script here
};

module.exports = createReactComponent;
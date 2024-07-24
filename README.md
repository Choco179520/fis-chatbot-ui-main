# Chat Bot UI for Student Inscription Management - Installation Guide

Welcome to the installation guide for the Chat Bot UI project that manages the student inscription process for the FIS faculty of the National Polytechnic School. This project is developed in TypeScript and comes with pre-commit hooks using Husky, and a CI (Continuous Integration) workflow that runs before merging into the 'main' branch.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Clone the Repository](#clone-the-repository)
3. [Project Setup](#project-setup)
4. [Integration with Additional Modules](#integration-with-additional-modules)
5. [Usage](#usage)

## Prerequisites

Before you begin, please ensure that you have the following prerequisites installed on your system:

- Node.js: [Download and install Node.js](https://nodejs.org/)
- npm (Node Package Manager): npm is included with Node.js. You can check its version using `npm -v`.

## Clone the Repository

To get started, you'll need to clone the project's repository to your local environment. Open your terminal and run the following command:

```bash
git clone https://github.com/jar-epn/fis-chatbot-ui.git
```

This will create a local copy of the repository on your machine.

## Project Setup

1. Change your working directory to the project folder:

```bash
cd fis-chatbot-ui
```

2. If you are using VS Code Editor you can open it using `code .` from your terminal

3. Install project dependencies using npm:

```bash
npm install
```

4. Configure pre-commit hooks by running:

```bash
npm run prepare
```

5. Install nodemon for a live-server:

```bash
npm install -g nodemon
```

6. Run the web server using:

```bash
npm start
```

**_Note:_** If you make any changes on the server, you should run `npm run pre-deploy`. Additionally, any changes must be made outside the `public` folder.

## Integration with Additional Modules

The Chat Bot UI project integrates with two additional modules. Please refer to the documentation for these modules for more details on their installation and usage.

[Module 1 - Persistence](https://github.com/jar-epn/fis-chatbot-persistence)

[Module 2 - Chatbot API](https://github.com/jar-epn/fis-chatbot-api)

## Usage

You can install the `live server` extension in your VS Code editor to run a local server and test the chat bot UI.

**_Note:_** If you encounter any issues or have questions, please refer to the project's GitHub repository or contact [jonap22](https://github.com/jonap22) for further assistance.

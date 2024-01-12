# softeng23-07 - Instructions
ChatGPT-generated instructions for a Node.js project with Yarn :)

## Prerequisites
- Node.js (recommended using NVM)
- Yarn (Package Manager for JavaScript)

## Managing Dependencies and Lock Files
- **Commit Lock Files:** Ensure to commit the `yarn.lock` files to version control. This helps maintain consistency in dependency versions across collaborators.
- **Check for Changes Before Running:** Before running `yarn install`, check for any changes in the repository using `git status`. If there are no changes, running `yarn install` is unlikely to modify the lock files.
- **Use Specific Versions in `package.json`:** For more control over dependency versions, consider specifying exact versions in the `package.json` file, like `"dependencies": { "package-name": "1.2.3" }`.
- **Use `--frozen-lockfile` Flag:** To prevent unintentional changes to the lock file, collaborators can run `yarn install --frozen-lockfile`.

## Setup
1. Clone the repository: `git clone https://github.com/...`
2. Change into the project directory: `cd softeng23-07`
3. Install dependencies using Yarn: `yarn install`

## Run the Server Logic
- Navigate to the server logic directory: `cd back-end`
- Install server logic dependencies: `yarn install`
- Start the server logic: `node server.js`

## Run the CLI App
- Navigate to the CLI app directory: `cd cli-client`
- Install CLI app dependencies: `yarn install`
- Start the CLI app: (example) `node cli.js newtitles --filename <filepath>`

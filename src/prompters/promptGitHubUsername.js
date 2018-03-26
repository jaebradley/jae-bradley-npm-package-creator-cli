import inquirer from 'inquirer';

const promptGitHubUsername = async () => (
  inquirer.prompt([
    {
      name: 'gitHubUsername',
      message: 'Input your GitHub Username',
      type: 'input',
    },
  ])
);

export default promptGitHubUsername;

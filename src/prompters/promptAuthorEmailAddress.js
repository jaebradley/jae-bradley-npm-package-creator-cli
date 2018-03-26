import inquirer from 'inquirer';

const promptAuthorEmailAddress = async () => (
  inquirer.prompt([
    {
      name: 'authorEmailAddress',
      message: 'Input your email address',
      type: 'input',
    },
  ])
);

export default promptAuthorEmailAddress;

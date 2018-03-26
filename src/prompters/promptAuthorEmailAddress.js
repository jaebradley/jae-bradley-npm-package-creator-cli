import inquirer from 'inquirer';
import { validate } from 'isemail';

const promptAuthorEmailAddress = async () => (
  inquirer.prompt([
    {
      name: 'authorEmailAddress',
      message: 'Input your email address',
      type: 'input',
      validate: email => validate(email),
    },
  ])
);

export default promptAuthorEmailAddress;

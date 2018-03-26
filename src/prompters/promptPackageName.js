import inquirer from 'inquirer';

const promptPackageName = async () => (
  inquirer.prompt([
    {
      name: 'packageName',
      message: 'Name of Package',
      type: 'input',
      validate: answer => answer && answer.length > 0,
    },
  ])
);

export default promptPackageName;

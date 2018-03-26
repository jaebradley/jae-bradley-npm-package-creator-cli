import inquirer from 'inquirer';

const promptPackageDescription = async () => (
  inquirer.prompt([
    {
      name: 'packageDescription',
      message: 'Package description',
      type: 'input',
      validate: answer => answer && answer.length > 0,
    },
  ])
);

export default promptPackageDescription;

import inquirer from 'inquirer';

const promptTargetDirectory = async () => (
  inquirer.prompt([
    {
      name: 'targetDirectory',
      message: 'Where to create the package',
      type: 'input',
      validate: answer => answer && answer.length > 0,
    },
  ])
);

export default promptTargetDirectory;

import fs from 'fs-extra';
import { exec } from 'child-process-promise';
import untildify from 'untildify';

import promptTargetDirectory from './prompters/promptTargetDirectory';
import promptPackageName from './prompters/promptPackageName';
import promptGitHubUsername from './prompters/promptGitHubUsername';
import promptPackageDescription from './prompters/promptPackageDescription';
import promptAuthorEmailAddress from './prompters/promptAuthorEmailAddress';
import generatePackageJSON from './generatePackageJSON';
import {
  babelrc,
  eslintignore,
  eslintrc,
  gitignore,
  npmignore,
  travis,
  commitlint,
} from './constants';

const filesToCopy = Object.freeze([
  {
    targetFilePath: '.babelrc',
    content: babelrc,
  },
  {
    targetFilePath: '.eslintignore',
    content: eslintignore,
  },
  {
    targetFilePath: '.eslintrc',
    content: eslintrc,
  },
  {
    targetFilePath: '.gitignore',
    content: gitignore,
  },
  {
    targetFilePath: '.npmignore',
    content: npmignore,
  },
  {
    targetFilePath: '.travis.yml',
    content: travis,
  },
  {
    targetFilePath: 'commitlint.config.js',
    content: commitlint,
  },
]);

const createPackage = async () => {
  let { targetDirectory } = await promptTargetDirectory();
  const { packageName } = await promptPackageName();
  const { packageDescription } = await promptPackageDescription();
  const { gitHubUsername } = await promptGitHubUsername();
  const { authorEmailAddress: author } = await promptAuthorEmailAddress();

  const generatedPackageJSON = generatePackageJSON({
    name: packageName,
    description: packageDescription,
    gitHubUsername,
    author,
  });

  targetDirectory = untildify(targetDirectory);

  try {
    await fs.ensureDir(targetDirectory);
    console.log(`Found or created directory: ${targetDirectory}!`);
  } catch (error) {
    console.error(`Could not create / verify directory: ${targetDirectory}`);
    throw error;
  }

  try {
    await fs.outputFile(`${targetDirectory}/package.json`, generatedPackageJSON);
    console.log('Created package.json!');
  } catch (error) {
    console.error('Could not create package.json');
    throw error;
  }

  filesToCopy.forEach(async ({ targetFilePath, content }) => {
    const filePath = `${targetDirectory}/${targetFilePath}`;
    try {
      await fs.outputFile(filePath, content);
      console.log(`Copied content to ${filePath}!`);
    } catch (error) {
      console.error(`Could not copy contents to ${filePath}`);
      throw error;
    }
  });

  console.log(`Navigating to ${targetDirectory} and running npm install`);
  try {
    await exec(`cd ${targetDirectory}; npm install`);
    console.log(`Navigated to ${targetDirectory} and ran npm install!`);
  } catch (error) {
    console.error(`Failed to navigate to ${targetDirectory} and run npm install`);
    throw error;
  }
};

export default createPackage;

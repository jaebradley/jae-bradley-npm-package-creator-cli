import { packageJSON } from './constants';

const generatePackageJSON = ({
  name,
  description,
  gitHubUsername,
  author,
}) => (
  JSON.stringify({
    ...packageJSON,
    name,
    description,
    author,
    repository: {
      type: 'git',
      url: `https://github.com/${gitHubUsername}/${name}`,
    },
    bugs: {
      url: `https://github.com/${gitHubUsername}/${name}/issues`,
    },
    homepage: `https://github.com/${gitHubUsername}/${name}/#readme`,
  }, null, 2)
);

export default generatePackageJSON;

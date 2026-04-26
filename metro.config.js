const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('node:path');

const projectRoot = __dirname;
const srcRoot = path.resolve(projectRoot, 'src');

const aliases = {
  '@components': path.resolve(srcRoot, 'components'),
  '@constants': path.resolve(srcRoot, 'constants'),
  '@screens': path.resolve(srcRoot, 'screens'),
  '@hooks': path.resolve(srcRoot, 'hooks'),
  '@utils': path.resolve(srcRoot, 'utils'),
  '@services': path.resolve(srcRoot, 'services'),
  '@contexts': path.resolve(srcRoot, 'contexts'),
  '@i18n': path.resolve(srcRoot, 'i18n'),
  '@theme': path.resolve(srcRoot, 'theme'),
  '@navigation': path.resolve(srcRoot, 'navigation'),
  '@assets': path.resolve(srcRoot, 'assets'),
  '@types': path.resolve(srcRoot, 'types'),
  '@config': path.resolve(srcRoot, 'config'),
};

const extraNodeModules = {};
for (const [alias, target] of Object.entries(aliases)) {
  extraNodeModules[alias] = target;
}

const config = {
  watchFolders: [srcRoot],
  resolver: {
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) => {
        if (typeof name === 'string' && name in target) {
          return target[name];
        }

        // Handle sub-path lookups like @services/storage or @screens/HomeScreen/strings.
        // Metro resolves these as scoped packages and looks up the full package name
        // (e.g. "@services/storage") in extraNodeModules. We strip the first path segment
        // to find the alias prefix, then join the remainder onto the alias target.
        if (typeof name === 'string') {
          const sepIdx = name.indexOf('/');
          if (sepIdx !== -1) {
            const prefix = name.slice(0, sepIdx);
            if (prefix in target) {
              return path.join(target[prefix], name.slice(sepIdx + 1));
            }
          }
        }

        return path.resolve(projectRoot, 'node_modules', String(name));
      },
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);

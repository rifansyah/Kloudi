const path = require('node:path');

const srcRoot = path.resolve(__dirname, 'src');

module.exports = {
  preset: '@react-native/jest-preset',
  moduleNameMapper: {
    '^@components/(.*)$': path.resolve(srcRoot, 'components/$1'),
    '^@constants/(.*)$': path.resolve(srcRoot, 'constants/$1'),
    '^@screens/(.*)$': path.resolve(srcRoot, 'screens/$1'),
    '^@hooks/(.*)$': path.resolve(srcRoot, 'hooks/$1'),
    '^@utils/(.*)$': path.resolve(srcRoot, 'utils/$1'),
    '^@services/(.*)$': path.resolve(srcRoot, 'services/$1'),
    '^@services$': path.resolve(srcRoot, 'services'),
    '^@contexts/(.*)$': path.resolve(srcRoot, 'contexts/$1'),
    '^@contexts$': path.resolve(srcRoot, 'contexts'),
    '^@i18n/(.*)$': path.resolve(srcRoot, 'i18n/$1'),
    '^@i18n$': path.resolve(srcRoot, 'i18n'),
    '^@theme/(.*)$': path.resolve(srcRoot, 'theme/$1'),
    '^@theme$': path.resolve(srcRoot, 'theme'),
    '^@navigation/(.*)$': path.resolve(srcRoot, 'navigation/$1'),
    '^@assets/(.*)$': path.resolve(srcRoot, 'assets/$1'),
    '^@types/(.*)$': path.resolve(srcRoot, 'types/$1'),
    '^@config/(.*)$': path.resolve(srcRoot, 'config/$1'),
  },
};

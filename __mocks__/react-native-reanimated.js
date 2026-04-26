// Get actual react-native components using jest.requireActual for test environment
let View, Text, Image, ScrollView, FlatList;

try {
  const RN = jest.requireActual("react-native");
  View = RN.View;
  Text = RN.Text;
  Image = RN.Image;
  ScrollView = RN.ScrollView;
  FlatList = RN.FlatList;
} catch {
  View = "View";
  Text = "Text";
  Image = "Image";
  ScrollView = "ScrollView";
  FlatList = "FlatList";
}

// Create the mock object
const mock = {
  // Components (for `import Animated from 'react-native-reanimated'` + `<Animated.View>`)
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  createAnimatedComponent: (component) => component,

  // Hooks (for named imports like `import { useSharedValue } from 'react-native-reanimated'`)
  useSharedValue: (initial) => ({ value: initial }),
  useAnimatedStyle: (updater) => (updater ? {} : {}),
  useAnimatedReaction: () => {},
  useAnimatedProps: () => ({}),
  withTiming: (v) => v,
  withSpring: (v) => v,
  withSequence: (..._args) => 0,
  withRepeat: (v) => v,
  withDelay: (_ms, v) => v,
  Easing: {
    out: (e) => e,
    in: (e) => e,
    bezier: (..._args) => ({}),
  },
  runOnJS: (fn) => fn,
  runOnUI: (fn) => fn,
};

// Set both default and named exports
module.exports = mock;
module.exports.default = mock;
module.exports.Animated = mock;

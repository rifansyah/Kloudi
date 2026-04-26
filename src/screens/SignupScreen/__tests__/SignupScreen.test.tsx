import { Text, TextInput } from "react-native";
import ReactTestRenderer, { act } from "react-test-renderer";
import SignupScreen from "../index";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(() => ({ navigate: jest.fn(), goBack: jest.fn() })),
}));

jest.mock("@services/storage", () => ({
  __esModule: true,
  default: {
    getString: jest.fn(),
    setString: jest.fn(),
    getJSON: jest.fn(),
    setJSON: jest.fn(),
    delete: jest.fn(),
    clearAll: jest.fn(),
    contains: jest.fn(),
  },
}));

jest.mock("@theme", () => ({
  useTheme: () => ({
    theme: {
      colors: {
        primary: "#4F46E5",
        background: "#F8FAFC",
        surface: "#FFFFFF",
        text: "#1E293B",
        textSecondary: "#64748B",
        border: "#E2E8F0",
        primarySurface: "#EEF2FF",
      },
      typography: {
        sizes: { xs: 10, sm: 12, md: 14, lg: 16, xl: 20, xxl: 24 },
        weights: {
          regular: "400",
          medium: "500",
          semibold: "600",
          bold: "700",
        },
        families: { regular: "", medium: "", bold: "", heading: "" },
      },
    },
    colors: {
      primary: "#4F46E5",
      background: "#F8FAFC",
      surface: "#FFFFFF",
      text: "#1E293B",
      textSecondary: "#64748B",
      border: "#E2E8F0",
      primarySurface: "#EEF2FF",
    },
    resolvedTheme: "light",
  }),
}));

jest.mock("@contexts/AuthContext", () => ({
  useAuth: () => ({
    user: null,
    isLoading: false,
    isSubmitting: false,
    login: jest.fn(),
    signup: jest.fn(),
    logout: jest.fn(),
  }),
}));

jest.mock("@i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en" }),
}));

jest.mock("@screens/SignupScreen/strings", () => (key: string) => key);

describe("SignupScreen", () => {
  it("renders name, email, and password inputs", () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      renderer = ReactTestRenderer.create(<SignupScreen />);
    });
    const inputs = renderer?.root.findAllByType(TextInput);
    expect(inputs.length).toBe(3);
  });

  it("renders create account button", () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      renderer = ReactTestRenderer.create(<SignupScreen />);
    });
    const texts = renderer?.root.findAllByType(Text);
    expect(texts.some((t) => t.props.children === "signUp")).toBe(true);
  });

  it("renders login navigation link", () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      renderer = ReactTestRenderer.create(<SignupScreen />);
    });
    const texts = renderer?.root.findAllByType(Text);
    expect(texts.some((t) => t.props.children === "login")).toBe(true);
  });
});

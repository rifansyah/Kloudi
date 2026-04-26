import { Text } from "react-native";
import ReactTestRenderer, { act } from "react-test-renderer";
import SettingsScreen from "../index";

jest.mock("@theme", () => ({
  useTheme: () => ({
    theme: {
      colors: {
        primary: "#4F46E5",
        primaryLight: "#EEF2FF",
        surface: "#FFFFFF",
        surfaceVariant: "#F1F5F9",
        text: "#1E293B",
        textSecondary: "#64748B",
        border: "#E2E8F0",
        error: "#EF4444",
        errorLight: "#FEF2F2",
        background: "#F8FAFC",
      },
      typography: {
        sizes: { xs: 11, sm: 12, md: 14, lg: 16, xl: 20, xxl: 24 },
        weights: {
          regular: "400",
          medium: "500",
          semibold: "600",
          bold: "700",
        },
        families: { regular: "System", heading: "Manrope" },
      },
    },
    colors: {
      primary: "#4F46E5",
      primaryLight: "#EEF2FF",
      surface: "#FFFFFF",
      surfaceVariant: "#F1F5F9",
      text: "#1E293B",
      textSecondary: "#64748B",
      border: "#E2E8F0",
      error: "#EF4444",
      errorLight: "#FEF2F2",
      background: "#F8FAFC",
    },
    typography: {
      sizes: { xs: 11, sm: 12, md: 14, lg: 16, xl: 20, xxl: 24 },
      weights: { regular: "400", medium: "500", semibold: "600", bold: "700" },
      families: { regular: "System", heading: "Manrope" },
    },
    mode: "light",
    setMode: jest.fn(),
  }),
}));

jest.mock("@i18n", () => ({
  useI18n: () => ({ language: "en", setLanguage: jest.fn() }),
}));

jest.mock("@contexts/AuthContext", () => ({
  useAuth: () => ({
    user: { id: "1", name: "John Doe", email: "john@example.com" },
    logout: jest.fn(),
  }),
}));

jest.mock("@screens/SettingsScreen/strings", () => (key: string) => key);

describe("SettingsScreen", () => {
  it("renders theme section", () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      renderer = ReactTestRenderer.create(<SettingsScreen />);
    });
    const texts = renderer?.root.findAllByType(Text);
    expect(texts.some((t) => t.props.children === "themeSection")).toBe(true);
  });

  it("renders language section", () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      renderer = ReactTestRenderer.create(<SettingsScreen />);
    });
    const texts = renderer?.root.findAllByType(Text);
    expect(texts.some((t) => t.props.children === "languageSection")).toBe(
      true
    );
  });

  it("renders account section with user email", () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      renderer = ReactTestRenderer.create(<SettingsScreen />);
    });
    const texts = renderer?.root.findAllByType(Text);
    expect(texts.some((t) => t.props.children === "john@example.com")).toBe(
      true
    );
  });

  it("renders logout button", () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      renderer = ReactTestRenderer.create(<SettingsScreen />);
    });
    const texts = renderer?.root.findAllByType(Text);
    expect(texts.some((t) => t.props.children === "logout")).toBe(true);
  });
});

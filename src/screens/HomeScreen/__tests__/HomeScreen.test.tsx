import { Text } from "react-native";
import ReactTestRenderer, { act } from "react-test-renderer";
import HomeScreen from "../index";

jest.mock("@theme", () => ({
  useTheme: () => ({
    theme: {
      colors: {
        primary: "#4F46E5",
        primaryLight: "#818CF8",
        background: "#F8FAFC",
        surface: "#FFFFFF",
        text: "#1E293B",
        textSecondary: "#64748B",
        border: "#E2E8F0",
        borderLight: "#F1F5F9",
        success: "#10B981",
      },
      radii: { xl: 16 },
      shadows: { sm: { shadowOpacity: 0.05 }, md: { shadowOpacity: 0.08 } },
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
      primaryLight: "#818CF8",
      background: "#F8FAFC",
      surface: "#FFFFFF",
      text: "#1E293B",
      textSecondary: "#64748B",
      border: "#E2E8F0",
      borderLight: "#F1F5F9",
      success: "#10B981",
    },
    resolvedTheme: "light",
  }),
}));

jest.mock("@contexts/AuthContext", () => ({
  useAuth: () => ({
    user: { id: "1", name: "John Doe", email: "john@example.com" },
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

jest.mock("@screens/HomeScreen/strings", () => (key: string) => key);

describe("HomeScreen", () => {
  it("renders user name from auth context", () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      renderer = ReactTestRenderer.create(<HomeScreen />);
    });
    const texts = renderer?.root.findAllByType(Text);
    expect(texts.some((t) => t.props.children === "John Doe")).toBe(true);
  });

  it("renders user email from auth context", () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      renderer = ReactTestRenderer.create(<HomeScreen />);
    });
    const texts = renderer?.root.findAllByType(Text);
    expect(texts.some((t) => t.props.children === "john@example.com")).toBe(
      true
    );
  });

  it("renders active session badge", () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      renderer = ReactTestRenderer.create(<HomeScreen />);
    });
    const texts = renderer?.root.findAllByType(Text);
    expect(texts.some((t) => t.props.children === "activeSession")).toBe(true);
  });

  it("does not render logout button", () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      renderer = ReactTestRenderer.create(<HomeScreen />);
    });
    const json = renderer?.toJSON();
    const jsonStr = JSON.stringify(json);
    expect(jsonStr).not.toContain("logout");
  });
});

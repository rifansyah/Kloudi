import { ActivityIndicator, Text } from "react-native";
import ReactTestRenderer, { act } from "react-test-renderer";
import PrimaryButton from "../index";

jest.mock("@theme", () => ({
  useTheme: () => ({
    theme: {
      colors: { primary: "#4F46E5", textDisabled: "#94A3B8", text: "#1E293B" },
      radii: { lg: 12 },
      shadows: { md: { shadowOpacity: 0.08 } },
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
  }),
}));

describe("PrimaryButton", () => {
  it("renders title text", () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      renderer = ReactTestRenderer.create(
        <PrimaryButton title="Sign In" onPress={() => {}} />
      );
    });
    const texts = renderer?.root.findAllByType(Text);
    expect(texts.some((t) => t.props.children === "Sign In")).toBe(true);
  });

  it("shows ActivityIndicator when loading", () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      renderer = ReactTestRenderer.create(
        <PrimaryButton title="Go" onPress={() => {}} loading />
      );
    });
    const spinners = renderer?.root.findAllByType(ActivityIndicator);
    expect(spinners.length).toBe(1);
  });

  it("does not show ActivityIndicator when not loading", () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      renderer = ReactTestRenderer.create(
        <PrimaryButton title="Go" onPress={() => {}} loading={false} />
      );
    });
    const spinners = renderer?.root.findAllByType(ActivityIndicator);
    expect(spinners.length).toBe(0);
  });

  it("renders title text when loading", () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      renderer = ReactTestRenderer.create(
        <PrimaryButton title="Loading" onPress={() => {}} loading />
      );
    });
    const spinners = renderer?.root.findAllByType(ActivityIndicator);
    expect(spinners.length).toBe(1);
  });
});

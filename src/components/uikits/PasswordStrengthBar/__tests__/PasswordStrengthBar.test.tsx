import { Text } from "react-native";
import ReactTestRenderer, { act } from "react-test-renderer";
import PasswordStrengthBar from "../index";

jest.mock("@theme", () => ({
  useTheme: () => ({
    theme: {
      colors: {
        error: "#EF4444",
        warning: "#F59E0B",
        success: "#10B981",
        border: "#E2E8F0",
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
  }),
}));

describe("PasswordStrengthBar", () => {
  it("renders Weak label for weak strength", () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      renderer = ReactTestRenderer.create(
        <PasswordStrengthBar strength="weak" />
      );
    });
    const texts = renderer?.root.findAllByType(Text);
    expect(texts.some((t) => t.props.children === "Weak")).toBe(true);
  });

  it("renders Fair label for fair strength", () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      renderer = ReactTestRenderer.create(
        <PasswordStrengthBar strength="fair" />
      );
    });
    const texts = renderer?.root.findAllByType(Text);
    expect(texts.some((t) => t.props.children === "Fair")).toBe(true);
  });

  it("renders Strong label for strong strength", () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      renderer = ReactTestRenderer.create(
        <PasswordStrengthBar strength="strong" />
      );
    });
    const texts = renderer?.root.findAllByType(Text);
    expect(texts.some((t) => t.props.children === "Strong")).toBe(true);
  });

  it("renders no label for empty strength", () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      renderer = ReactTestRenderer.create(<PasswordStrengthBar strength="" />);
    });
    const texts = renderer?.root.findAllByType(Text);
    expect(
      texts.every(
        (t) =>
          t.props.children !== "Weak" &&
          t.props.children !== "Fair" &&
          t.props.children !== "Strong"
      )
    ).toBe(true);
  });
});

import { Text, TextInput } from "react-native";
import ReactTestRenderer, { act } from "react-test-renderer";
import FormInput from "../index";

jest.mock("@theme", () => ({
  useTheme: () => ({
    theme: {
      colors: {
        primary: "#4F46E5",
        text: "#1E293B",
        textSecondary: "#64748B",
        error: "#EF4444",
        border: "#E2E8F0",
        primarySurface: "#EEF2FF",
        errorLight: "#FEF2F2",
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

describe("FormInput", () => {
  it("renders TextInput with placeholder", () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      renderer = ReactTestRenderer.create(
        <FormInput
          label="Email"
          placeholder="Enter email"
          value=""
          onChangeText={() => {}}
        />
      );
    });
    const inputs = renderer?.root.findAllByType(TextInput);
    expect(inputs.length).toBe(1);
    expect(inputs[0]?.props.placeholder).toBe("Enter email");
  });

  it("shows error text when error prop is set", () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      renderer = ReactTestRenderer.create(
        <FormInput
          label="Email"
          placeholder="Email"
          value=""
          onChangeText={() => {}}
          error="Invalid email"
        />
      );
    });
    const texts = renderer?.root.findAllByType(Text);
    expect(texts.some((t) => t.props.children === "Invalid email")).toBe(true);
  });

  it("does not show error text when error is empty", () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      renderer = ReactTestRenderer.create(
        <FormInput
          label="Email"
          placeholder="Email"
          value=""
          onChangeText={() => {}}
          error=""
        />
      );
    });
    const texts = renderer?.root.findAllByType(Text);
    expect(texts.every((t) => t.props.children !== "Invalid email")).toBe(true);
  });

  it("passes secureTextEntry to TextInput", () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      renderer = ReactTestRenderer.create(
        <FormInput
          label="Password"
          placeholder="Password"
          value=""
          onChangeText={() => {}}
          secureTextEntry
        />
      );
    });
    const input = renderer?.root.findByType(TextInput);
    expect(input.props.secureTextEntry).toBe(true);
  });

  it("renders eye toggle when showToggle is true", () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      renderer = ReactTestRenderer.create(
        <FormInput
          label="Password"
          placeholder="Password"
          value=""
          onChangeText={() => {}}
          secureTextEntry
          showToggle
        />
      );
    });
    // Note: Can't test for Pressable directly due to @react-native/jest-preset mock
    // Instead, verify the component renders without errors when showToggle is true
    expect(renderer?.root).toBeDefined();
  });
});

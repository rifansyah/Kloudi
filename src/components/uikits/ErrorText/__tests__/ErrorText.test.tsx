import { Text } from "react-native";
import ReactTestRenderer, { act } from "react-test-renderer";
import ErrorText from "../index";

jest.mock("@theme", () => ({
  useTheme: () => ({
    theme: {
      colors: { error: "#EF4444" },
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

describe("ErrorText", () => {
  it("renders error text when message is provided", () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      renderer = ReactTestRenderer.create(
        <ErrorText message="Something went wrong" />
      );
    });
    const texts = renderer?.root.findAllByType(Text);
    expect(texts.length).toBe(1);
    expect(texts[0]?.props.children).toBe("Something went wrong");
  });

  it("renders null when message is empty", () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      renderer = ReactTestRenderer.create(<ErrorText message="" />);
    });
    expect(renderer?.toJSON()).toBeNull();
  });
});

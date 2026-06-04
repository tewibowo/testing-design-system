import React from "react";
import { Carousel, Button } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

const slideStyle = { height: 120, display: "flex", alignItems: "center", justifyContent: "center", background: "#EEF6FF", borderRadius: 8 };
const CarouselDemo = () => {
  const [key, setKey] = React.useState(0);
  const slides = [0, 1, 2].map((i) => (<div key={i} style={slideStyle}>Slide {i + 1}</div>));
  return (
    <div style={{ width: 320 }}>
      <Carousel activeKey={key} width={320}>{slides}</Carousel>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        {[0, 1, 2].map((i) => (
          <Button key={i} type={i === key ? "primary" : "secondary"} onClick={() => setKey(i)}>{i + 1}</Button>
        ))}
      </div>
    </div>
  );
};

export default {
  title: "@xfers Design System 6.1.0/Components/Carousel",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Default = { render: () => <CarouselDemo /> };

import React from "react";
import { ErrorResponse } from "./ErrorResponse.jsx";
import { Button } from "../Button/Button.jsx";

export default {
  title: "Components/ErrorResponse",
  component: ErrorResponse,
  parameters: { layout: "fullscreen" },
};

export const NotFound = {
  args: {
    code: "404",
    title: "Page not found",
    body: "The page you're looking for doesn't exist or has been moved.",
    actions: <Button>Go home</Button>,
  },
};

export const ServerError = {
  args: {
    code: "500",
    title: "Something went wrong",
    body: "We're investigating. Please try again in a few minutes.",
    actions: (
      <>
        <Button variant="secondary">Refresh</Button>
        <Button>Contact support</Button>
      </>
    ),
  },
};

export const KycRejected = {
  args: {
    title: "Verification unsuccessful",
    body: "We weren't able to verify your identity with the documents you provided. Please review and resubmit.",
    actions: <Button>Resubmit documents</Button>,
  },
};

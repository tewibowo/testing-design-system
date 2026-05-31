import React from "react";
import { Alert } from "../Alert/Alert.jsx";

/**
 * "Important Notes" is the brand's larger callout style — same visual chrome as Alert,
 * but typographically a touch larger and always shown with an explicit title.
 */
export function ImportantNotes({ tone = "neutral", title = "Important", children, className = "", ...rest }) {
  return (
    <Alert tone={tone} title={title} className={"important-notes " + className} {...rest}>
      {children}
    </Alert>
  );
}

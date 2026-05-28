// Package entry — re-exports every component.
// CSS is NOT auto-imported here; consumers import what they want:
//   import "testing-design-system/global.css";
//   import "testing-design-system/tokens.css";

// Primitives
export { Button } from "./components/Button/Button.jsx";
export { IconButton } from "./components/IconButton/IconButton.jsx";
export { LinkButton } from "./components/LinkButton/LinkButton.jsx";
export { Tag } from "./components/Tag/Tag.jsx";
export { Badge } from "./components/Badge/Badge.jsx";

// Form
export { Input } from "./components/Input/Input.jsx";
export { Textarea } from "./components/Textarea/Textarea.jsx";
export { Select } from "./components/Select/Select.jsx";
export { DateInput } from "./components/DateInput/DateInput.jsx";
export { Copybox } from "./components/Copybox/Copybox.jsx";
export { Checkbox } from "./components/Checkbox/Checkbox.jsx";
export { Radio, RadioGroup } from "./components/Radio/Radio.jsx";
export { Switch } from "./components/Switch/Switch.jsx";

// Layout / data
export { Card } from "./components/Card/Card.jsx";
export { Tabs } from "./components/Tabs/Tabs.jsx";
export { Table } from "./components/Table/Table.jsx";
export { Pagination } from "./components/Pagination/Pagination.jsx";
export { Breadcrumb } from "./components/Breadcrumb/Breadcrumb.jsx";
export { PageTitle } from "./components/PageTitle/PageTitle.jsx";
export { EmptyState } from "./components/EmptyState/EmptyState.jsx";

// Feedback
export { Alert } from "./components/Alert/Alert.jsx";
export { ImportantNotes } from "./components/ImportantNotes/ImportantNotes.jsx";
export { Toast, ToastProvider, useToast } from "./components/Toast/Toast.jsx";
export { Modal } from "./components/Modal/Modal.jsx";
export { Tooltip } from "./components/Tooltip/Tooltip.jsx";
export { Menu } from "./components/Menu/Menu.jsx";

// Composition (dashboard kit)
export { Sidebar, DEFAULT_NAV_ITEMS } from "./components/Sidebar/Sidebar.jsx";
export { TopBar } from "./components/TopBar/TopBar.jsx";
export { OnboardingSteps } from "./components/OnboardingSteps/OnboardingSteps.jsx";
export { TransferPanel } from "./components/TransferPanel/TransferPanel.jsx";
export { OtcBanner } from "./components/OtcBanner/OtcBanner.jsx";

// Brand
export { Logomark } from "./components/Logomark/Logomark.jsx";

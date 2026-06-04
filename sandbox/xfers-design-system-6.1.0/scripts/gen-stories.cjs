/* Generates one Storybook story file per @xfers/design-system@6.1.0 component.
 * Run: node scripts/gen-stories.cjs  (from the sandbox root)
 * Not part of the build; kept for regenerating stories. */
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "src");
const GROUP = "@xfers Design System 6.1.0";

/** @type {Array<{name:string,title:string,layout?:string,imports:string[],pre?:string,body:string}>} */
const entries = [
  {
    name: "Button", title: "Components/Button", layout: "centered", imports: ["Button"],
    body: `
export const Primary = { render: () => <Button type="primary">Continue</Button> };
export const Secondary = { render: () => <Button type="secondary">Cancel</Button> };
export const Tertiary = { render: () => <Button type="tertiary">Learn more</Button> };
export const Disabled = { render: () => <Button type="primary" isDisabled>Submit</Button> };
export const AllTypes = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <Button type="primary">Primary</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="tertiary">Tertiary</Button>
      <Button type="primary" isDisabled>Disabled</Button>
    </div>
  ),
};`,
  },
  {
    name: "ActionButton", title: "Components/ActionButton", layout: "centered", imports: ["ActionButton", "Add"],
    body: `
export const Default = { render: () => <ActionButton icon={<Add />} /> };
export const Disabled = { render: () => <ActionButton icon={<Add />} disabled /> };`,
  },
  {
    name: "ActionCard", title: "Components/ActionCard", layout: "padded", imports: ["ActionCard", "Button"],
    body: `
export const Default = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <ActionCard title="Verify your identity" footer={<Button type="primary">Start</Button>}>
        Complete KYC to unlock higher limits.
      </ActionCard>
    </div>
  ),
};`,
  },
  {
    name: "Accordion", title: "Components/Accordion", layout: "padded", imports: ["Accordion"],
    body: `
export const Default = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Accordion
        header="What is StraitsX?"
        body={<div>StraitsX is a payments infrastructure for the digital economy.</div>}
        toggleText="Show"
        onCloseToggleText="Hide"
        defaultOpen
      />
    </div>
  ),
};`,
  },
  {
    name: "Alert", title: "Components/Alert", layout: "padded", imports: ["Alert"],
    body: `
export const AllTypes = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Alert type="success" title="Success" message="Your changes were saved." showIcon />
      <Alert type="info" title="Information" message="Here is some helpful context." showIcon />
      <Alert type="warning" title="Warning" message="Please double-check your details." showIcon />
      <Alert type="error" title="Error" message="Something went wrong." showIcon />
    </div>
  ),
};`,
  },
  {
    name: "BadgeIcon", title: "Components/BadgeIcon", layout: "centered", imports: ["BadgeIcon", "Bell"],
    body: `
export const Types = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      {["default", "primary", "success", "warning", "error"].map((t) => (
        <BadgeIcon key={t} type={t} icon={<Bell />} />
      ))}
    </div>
  ),
};`,
  },
  {
    name: "Banner", title: "Components/Banner", layout: "padded", imports: ["Banner"],
    body: `
export const Types = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {["primary", "success", "warning", "error", "notification"].map((t) => (
        <Banner key={t} type={t} withIcon>{t} banner message</Banner>
      ))}
    </div>
  ),
};`,
  },
  {
    name: "Card", title: "Components/Card", layout: "padded", imports: ["Card"],
    body: `
export const Default = {
  render: () => (
    <Card title="Account balance" style={{ maxWidth: 360 }}>
      <div>S$ 1,234.56</div>
    </Card>
  ),
};
export const Dark = {
  render: () => (
    <Card type="dark" title="Dark card" style={{ maxWidth: 360 }}>
      <div>Inverted surface</div>
    </Card>
  ),
};`,
  },
  {
    name: "Carousel", title: "Components/Carousel", layout: "padded", imports: ["Carousel", "Button"],
    pre: `
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
};`,
    body: `
export const Default = { render: () => <CarouselDemo /> };`,
  },
  {
    name: "Chart", title: "Components/Chart", layout: "padded", imports: ["Chart"],
    body: `
export const Default = {
  render: () => (
    <Chart
      xValues={["Jan", "Feb", "Mar", "Apr", "May"]}
      yValues={[12, 19, 8, 22, 17]}
      dataPrefix="S$"
      straitsXStyle
      height={240}
    />
  ),
};`,
  },
  {
    name: "Checkbox", title: "Components/Checkbox", layout: "padded", imports: ["Checkbox"],
    body: `
export const Group = {
  render: () => (
    <Checkbox.Group
      options={[
        { label: "Apple", value: "apple" },
        { label: "Pear", value: "pear" },
        { label: "Orange", value: "orange" },
      ]}
      defaultValue={["apple"]}
    />
  ),
};`,
  },
  {
    name: "Coachmark", title: "Components/Coachmark", layout: "centered", imports: ["Coachmark"],
    body: `
export const Default = {
  render: () => (
    <Coachmark
      index={0}
      size={3}
      step={{ title: "New feature", content: "This panel shows your latest activity." }}
      tooltipProps={{ role: "tooltip" }}
      skipProps={{ role: "button", onClick: () => {} }}
      primaryProps={{ role: "button", onClick: () => {} }}
      backProps={{ role: "button", onClick: () => {} }}
    />
  ),
};`,
  },
  {
    name: "ContentBreakdown", title: "Components/ContentBreakdown", layout: "padded", imports: ["ContentBreakdown"],
    body: `
export const Default = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <ContentBreakdown title="Order summary">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Total</span><span>S$ 100.00</span>
        </div>
      </ContentBreakdown>
    </div>
  ),
};`,
  },
  {
    name: "CopyBox", title: "Components/CopyBox", layout: "padded", imports: ["CopyBox"],
    body: `
export const Default = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <CopyBox labelText="Wallet address" value="0xA1B2C3D4E5F6A7B8C9D0" allowCopy showCopyIcon />
    </div>
  ),
};`,
  },
  {
    name: "DatePicker", title: "Components/DatePicker", layout: "padded", imports: ["DatePicker"],
    body: `
export const Default = { render: () => <DatePicker label="Date of birth" placeholder="Select date" /> };`,
  },
  {
    name: "DeprecatedModal", title: "Components/DeprecatedModal", layout: "centered", imports: ["DeprecatedModal", "Button"],
    pre: `
const DeprecatedModalDemo = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>Open deprecated modal</Button>
      <DeprecatedModal
        open={open}
        onClose={() => setOpen(false)}
        icon={false}
        title="Deprecated modal"
        footer={<Button type="primary" onClick={() => setOpen(false)}>Close</Button>}
      >
        Prefer the Modal + ModalProvider API instead.
      </DeprecatedModal>
    </>
  );
};`,
    body: `
export const Default = { render: () => <DeprecatedModalDemo /> };`,
  },
  {
    name: "DialogItems", title: "Components/DialogItems", layout: "padded", imports: ["DialogItems"],
    body: `
export const Default = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <DialogItems items={[
        { label: "Amount", value: "S$ 100.00" },
        { label: "Fee", value: "S$ 0.50" },
        { label: "Reference", value: "INV-00123", variant: "large" },
      ]} />
    </div>
  ),
};`,
  },
  {
    name: "Divider", title: "Components/Divider", layout: "padded", imports: ["Divider"],
    body: `
export const Spacings = {
  render: () => (
    <div>
      {["xs", "sm", "md", "lg", "xl"].map((s) => (
        <div key={s}>
          <div>Above ({s})</div>
          <Divider spacing={s} />
          <div>Below</div>
        </div>
      ))}
    </div>
  ),
};`,
  },
  {
    name: "Dropdown", title: "Components/Dropdown", layout: "centered", imports: ["Dropdown", "Button"],
    body: `
export const Default = {
  render: () => (
    <Dropdown menu={{ items: [
      { key: "1", label: "Profile" },
      { key: "2", label: "Settings" },
      { key: "3", label: "Sign out" },
    ] }}>
      <Button type="secondary">Open menu</Button>
    </Dropdown>
  ),
};`,
  },
  {
    name: "DynamicSelect", title: "Components/DynamicSelect", layout: "padded", imports: ["DynamicSelect"],
    body: `
export const Default = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <DynamicSelect
        label="Select bank"
        placeholder="Choose a bank"
        iconSrc={null}
        extraText="Add new bank"
        isAddItemBarVisible
        extraAction={() => {}}
        options={[
          { value: "dbs", label: "DBS" },
          { value: "ocbc", label: "OCBC" },
          { value: "uob", label: "UOB" },
        ]}
      />
    </div>
  ),
};`,
  },
  {
    name: "EmptyData", title: "Components/EmptyData", layout: "padded", imports: ["EmptyData"],
    body: `
export const Default = { render: () => <EmptyData title="No transactions yet" subtitle="Your activity will appear here." /> };`,
  },
  {
    name: "ErrorPage", title: "Components/ErrorPage", layout: "fullscreen", imports: ["ErrorPage"],
    body: `
export const Default = {
  render: () => (
    <div style={{ height: 480 }}>
      <ErrorPage title="Something went wrong" subtitle="Error 500" content="Please try again later." />
    </div>
  ),
};`,
  },
  {
    name: "Form", title: "Components/Form", layout: "padded", imports: ["Form", "Input", "Button"],
    body: `
export const Default = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <Form layout="vertical">
        <Form.Item label="Email" name="email">
          <Input placeholder="you@example.com" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Button type="primary">Sign in</Button>
      </Form>
    </div>
  ),
};`,
  },
  {
    name: "Hidden", title: "Components/Hidden", layout: "padded", imports: ["Hidden", "Banner", "P1"],
    body: `
export const Default = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Hidden only="sm"><Banner type="primary">Visible on large screens (hidden on sm)</Banner></Hidden>
      <Hidden only="lg"><Banner type="success">Visible on small screens (hidden on lg)</Banner></Hidden>
      <P1>Resize the viewport to see each block toggle.</P1>
    </div>
  ),
};`,
  },
  {
    name: "Input", title: "Components/Input", layout: "padded", imports: ["Input"],
    body: `
export const Variants = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 360 }}>
      <Input label="Default" placeholder="Type here" />
      <Input label="With helper" placeholder="Type here" helperText="Some guidance text." />
      <Input label="Error state" placeholder="Type here" error helperText="This field is required." />
      <Input.Password label="Password" placeholder="Enter password" />
      <Input.Search label="Search" placeholder="Search..." />
    </div>
  ),
};`,
  },
  {
    name: "InputWithButton", title: "Components/InputWithButton", layout: "padded", imports: ["InputWithButton"],
    body: `
export const Default = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <InputWithButton buttonText="Apply" placeholder="Promo code" onButtonClick={() => {}} />
    </div>
  ),
};`,
  },
  {
    name: "Link", title: "Components/Link", layout: "centered", imports: ["Link"],
    body: `
export const Variants = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <Link href="#" textContent="Default link" />
      <Link href="#" isUnderlined textContent="Underlined" />
      <Link href="#" size="sm" textContent="Small" />
    </div>
  ),
};`,
  },
  {
    name: "Modal", title: "Components/Modal", layout: "fullscreen", imports: ["Modal", "Button"],
    body: `
export const Default = {
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 24, background: "#F1F2F4" }}>
      <Modal
        onClose={() => {}}
        title="Confirm transfer"
        footer={(
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <Button type="secondary">Cancel</Button>
            <Button type="primary">Confirm</Button>
          </div>
        )}
      >
        You are about to transfer S$ 100.00 to John Doe.
      </Modal>
    </div>
  ),
};`,
  },
  {
    name: "Note", title: "Components/Note", layout: "padded", imports: ["Note"],
    body: `
export const Default = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <Note title="Good to know">Funds are usually available within minutes.</Note>
    </div>
  ),
};`,
  },
  {
    name: "Pagination", title: "Components/Pagination", layout: "centered", imports: ["Pagination"],
    pre: `
const PaginationDemo = () => {
  const [current, setCurrent] = React.useState(1);
  return <Pagination current={current} pageSize={10} total={120} onChange={setCurrent} showSizeChanger />;
};`,
    body: `
export const Default = { render: () => <PaginationDemo /> };`,
  },
  {
    name: "Radio", title: "Components/Radio", layout: "padded", imports: ["Radio"],
    pre: `
const RadioDemo = () => {
  const [value, setValue] = React.useState("a");
  return (
    <Radio.Group value={value} onChange={(e) => setValue(e.target.value)}>
      <Radio.Button value="a">Option A</Radio.Button>
      <Radio.Button value="b">Option B</Radio.Button>
      <Radio.Button value="c">Option C</Radio.Button>
    </Radio.Group>
  );
};`,
    body: `
export const Default = { render: () => <RadioDemo /> };`,
  },
  {
    name: "RangePicker", title: "Components/RangePicker", layout: "padded", imports: ["RangePicker"],
    body: `
export const Default = { render: () => <RangePicker /> };`,
  },
  {
    name: "Section", title: "Components/Section", layout: "padded", imports: ["Section"],
    body: `
export const Default = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Section.Title>Account</Section.Title>
      <Section.Subtitle>Manage your account details</Section.Subtitle>
      <Section.Row><Section.Left>Email</Section.Left><Section.Right>user@example.com</Section.Right></Section.Row>
      <Section.Row><Section.Left>Phone</Section.Left><Section.Right>+65 9123 4567</Section.Right></Section.Row>
    </div>
  ),
};`,
  },
  {
    name: "Select", title: "Components/Select", layout: "padded", imports: ["Select"],
    body: `
export const Default = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Select label="Country" placeholder="Select a country" options={[
        { value: "sg", label: "Singapore" },
        { value: "id", label: "Indonesia" },
        { value: "my", label: "Malaysia" },
      ]} />
    </div>
  ),
};
export const Multiple = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Select mode="multiple" label="Assets" placeholder="Select assets" options={[
        { value: "xsgd", label: "XSGD" },
        { value: "usdc", label: "USDC" },
        { value: "usdt", label: "USDT" },
      ]} />
    </div>
  ),
};`,
  },
  {
    name: "Spin", title: "Components/Spin", layout: "centered", imports: ["Spin"],
    body: `
export const Sizes = {
  render: () => (
    <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
      <Spin size="small" /><Spin size="default" /><Spin size="large" />
    </div>
  ),
};`,
  },
  {
    name: "Steps", title: "Components/Steps", layout: "padded", imports: ["Steps"],
    body: `
export const Default = { render: () => <Steps current={1} steps={["Details", "Verification", "Confirm", "Done"]} /> };`,
  },
  {
    name: "SummaryCard", title: "Components/SummaryCard", layout: "padded", imports: ["SummaryCard"],
    body: `
export const Default = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <SummaryCard label="Available balance" amount="S$ 12,345.67" />
      <SummaryCard type="dark" label="Pending" amount="S$ 234.00" isInverted />
    </div>
  ),
};`,
  },
  {
    name: "Table", title: "Components/Table", layout: "padded", imports: ["Table"],
    body: `
export const Default = {
  render: () => (
    <Table
      columns={[
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Asset", dataIndex: "asset", key: "asset" },
        { title: "Amount", dataIndex: "amount", key: "amount" },
      ]}
      dataSource={[
        { key: "1", name: "Top up", asset: "XSGD", amount: "100.00" },
        { key: "2", name: "Withdraw", asset: "USDC", amount: "50.00" },
      ]}
      pagination={false}
    />
  ),
};`,
  },
  {
    name: "Tabs", title: "Components/Tabs", layout: "padded", imports: ["Tabs"],
    pre: `
const TabsDemo = () => {
  const [key, setKey] = React.useState("1");
  return (
    <Tabs activeKey={key} onChange={setKey}>
      <Tabs.TabPane tab="Overview" key="1"><div style={{ padding: 16 }}>Overview content</div></Tabs.TabPane>
      <Tabs.TabPane tab="Activity" key="2"><div style={{ padding: 16 }}>Activity content</div></Tabs.TabPane>
      <Tabs.TabPane tab="Settings" key="3"><div style={{ padding: 16 }}>Settings content</div></Tabs.TabPane>
    </Tabs>
  );
};`,
    body: `
export const Default = { render: () => <TabsDemo /> };`,
  },
  {
    name: "Tag", title: "Components/Tag", layout: "padded", imports: ["Tag"],
    body: `
export const AllTypes = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Tag type="positive">Positive</Tag>
      <Tag type="critical">Critical</Tag>
      <Tag type="warning">Warning</Tag>
      <Tag type="info">Info</Tag>
      <Tag type="neutral">Neutral</Tag>
    </div>
  ),
};
export const Variants = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Tag type="positive" variant="outlined">Outlined</Tag>
      <Tag type="positive" variant="filled">Filled</Tag>
      <Tag type="positive" variant="removable">Removable</Tag>
    </div>
  ),
};`,
  },
  {
    name: "Timeline", title: "Components/Timeline", layout: "padded", imports: ["Timeline"],
    body: `
export const Default = {
  render: () => (
    <Timeline>
      <Timeline.Item>Order placed</Timeline.Item>
      <Timeline.Item>Payment received</Timeline.Item>
      <Timeline.Item>Shipped</Timeline.Item>
      <Timeline.Item>Delivered</Timeline.Item>
    </Timeline>
  ),
};`,
  },
  {
    name: "Timer", title: "Components/Timer", layout: "centered", imports: ["Timer", "P1"],
    body: `
export const Default = {
  render: () => (
    <Timer initialSeconds={90} blinkActivationSeconds={10}>
      {(isBlink, remaining) => {
        const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
        const ss = String(remaining % 60).padStart(2, "0");
        return <P1 style={{ color: isBlink ? "#E22726" : undefined }}>{mm + ":" + ss}</P1>;
      }}
    </Timer>
  ),
};`,
  },
  {
    name: "Tooltip", title: "Components/Tooltip", layout: "centered", imports: ["Tooltip", "Button"],
    body: `
export const Default = {
  render: () => (
    <Tooltip content="Helpful hint about this action" placement="top">
      <Button type="secondary">Hover me</Button>
    </Tooltip>
  ),
};`,
  },
  {
    name: "Typography", title: "Theme/Typography", layout: "padded", imports: ["H1", "H2", "H3", "H4", "P1", "P1Bold", "SmallP"],
    body: `
export const Scale = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <H1>H1 - The quick brown fox</H1>
      <H2>H2 - The quick brown fox</H2>
      <H3>H3 - The quick brown fox</H3>
      <H4>H4 - The quick brown fox</H4>
      <P1>P1 - Body text for paragraphs and general content.</P1>
      <P1Bold>P1Bold - Emphasised body text.</P1Bold>
      <SmallP>SmallP - Small supporting text and captions.</SmallP>
    </div>
  ),
};`,
  },
];

let count = 0;
for (const e of entries) {
  const layout = e.layout || "centered";
  const content =
`import React from "react";
import { ${e.imports.join(", ")} } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";
${e.pre ? e.pre + "\n" : ""}
export default {
  title: "${GROUP}/${e.title}",
  decorators: [withDesignSystem],
  parameters: { layout: "${layout}" },
};
${e.body}
`;
  fs.writeFileSync(path.join(OUT, `${e.name}.stories.jsx`), content);
  count++;
}
console.log("Generated", count, "component story files.");

import React, { useState } from "react";
import { Pagination } from "./Pagination.jsx";

export default {
  title: "Components/Pagination",
  component: Pagination,
  parameters: { layout: "padded" },
};

export const Default = {
  render: () => {
    const [p, setP] = useState(6);
    return <Pagination page={p} totalPages={24} onChange={setP} />;
  },
};

export const WithSummary = {
  render: () => {
    const [p, setP] = useState(2);
    return <Pagination page={p} totalPages={12} pageSize={25} total={300} onChange={setP} showSummary />;
  },
};

export const Few = {
  render: () => {
    const [p, setP] = useState(2);
    return <Pagination page={p} totalPages={5} onChange={setP} />;
  },
};

export const Edge = {
  render: () => {
    const [p, setP] = useState(1);
    return <Pagination page={p} totalPages={24} onChange={setP} />;
  },
};

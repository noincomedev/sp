import React from "react";

import { DisplayText } from "@shopify/polaris";
import { Button } from "@shopify/polaris";

export default ({ id, date, status, handleToggle }) => (
  <div className="container justify-space-between align-items-center">
    <DisplayText size="medium">{date}</DisplayText>
    <Button onClick={handleToggle} disabled={status == "disallow"}>
      <i className="fas fa-cog" />
    </Button>
  </div>
);

import React from "react";
import { action } from "@storybook/addon-actions";

import { EditableSpan } from "./EditableSpan";

export default {
  title: "EditableSpan Component",
  component: EditableSpan,
};

const changeCallBack = action("Value changed");

export const EditableSpanBaseExample = (props: any) => {
  return <EditableSpan onChange={changeCallBack} title={"EditableSpan"} />;
};
export const EditableSpanDisabled = (props: any) => {
  return <EditableSpan onChange={changeCallBack} title={"EditableSpan"} />;
};

import React from "react";
import { AddItemForm } from "./AddItemForm";
import { action } from "@storybook/addon-actions";

export default {
  title: "AddItemForm Component",
  component: AddItemForm,
};

const callback = action("Button 'add' was pressed inside form");

export const AddItemFormBaseExample = (props: any) => {
  return <AddItemForm addItem={callback} />;
};
export const AddItemFormDisableAdd = (props: any) => {
  return <AddItemForm disabled={true} addItem={callback} />;
};

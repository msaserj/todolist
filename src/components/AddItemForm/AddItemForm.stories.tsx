import React from "react";
import { AddItemForm } from "./AddItemForm";
import { action } from "@storybook/addon-actions";

export default {
  title: "AddItemForm Component",
  component: AddItemForm,
};

const asyncCallback = async (...params: any[]) => {
  action("Button inside form clicked");
};

export const AddItemFormBaseExample = (props: any) => {
  return <AddItemForm addItem={asyncCallback} />;
};
export const AddItemFormDisableAdd = (props: any) => {
  return <AddItemForm disabled={true} addItem={asyncCallback} />;
};

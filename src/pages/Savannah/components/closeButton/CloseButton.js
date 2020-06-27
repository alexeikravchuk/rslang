import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import {IconButton} from "@material-ui/core";

export default (props) => (
  <IconButton edge={"end"} className={'close-button'} color="secondary" aria-label="close" onClick={props.onClick}>
    <CloseIcon />
  </IconButton>
)

import React from "react";
import { Rule, Eval } from "/home/jcfisher007/xander";
import "/home/jcfisher007/xander/xander.css";
let values = {
  A: 2,
  B: 2
};

let query = `OR( status=false, AND(status = true, country = "Denmark") )`;
let query2 = `OR( a+b=4, ((status=false)), AND(status = true, country = "Denmark"), {a,b,c;1,2,3}, A1:A10, Test!A1 )`;

let config = {
  labelTRUE: <span style={{ color: "green" }}>TRUE</span>,
  labelFALSE: <span style={{ color: "red" }}>TRUE</span>,
  labelEQ: <span style={{ color: "blue" }}> must equal </span>,
  labelNE: <span style={{ color: "blue" }}> must not equal </span>,
  labelAND: "All of the conditions must be true:",
  labelOR: "Any of the conditions must be true:"
};

export default () => (
  <div>
    VALUES:
    <pre>{JSON.stringify(values, null, 2)}</pre>
    <hr />
    <Rule config={config} exp="A + B" values={values} />
    =
    <hr />
    <Eval exp="A + B" values={values} />
    QUERY:
    <pre>{query}</pre>
    <Rule exp={query} />
    <hr />
    <pre>{query2}</pre>
    <Rule exp={query2} config={config} />
  </div>
);

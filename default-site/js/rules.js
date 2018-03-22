import React from 'react'
import { Rule, Eval } from 'xander'

let values = {
  A: 2,
  B: 2
};

let query = `OR( status=false, AND(status = true, country = "Denmark") )`;
let query2 = `OR( +a+b=4, ((status=false)), AND(status = true, country = "Denmark"), {a,b,c;1,2,3}, A1:A10, Test!A1 )`;

export default () => (
  <div>
    VALUES:
    <pre>{JSON.stringify(values, null, 2)}</pre>
    <hr />
    <Rule exp="A + B" values={values} />
    =
    <hr />
    <Eval exp="A + B" values={values} />
    QUERY:
    <pre>{query}</pre>
    <Rule exp={query} />
    <hr />
    <pre>{query2}</pre>
    <Rule exp={query2} />
  </div>
)

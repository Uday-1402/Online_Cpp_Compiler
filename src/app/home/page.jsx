"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import MonacoEditor from "@monaco-editor/react";

const Home = () => {
  const initialCode = `
        #include<iostream>
        using namespace std;

        int main(){
            //Write your code here..
        }
    
    `;
  const [code, setCode] = useState(initialCode);
  const [error, setError] = useState(null);
  const [output, setOutput] = useState(null);
  const handleEditorChange = (value) => {
    setCode(value);
  };
  const handleSubmitCode = async () => {
    try {
      const res = await fetch("/api/execution/cpp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const output = await res.json();
      if (output.error) {
        console.error(error);
        setError(output.error);
      } else {
        console.log(output.output);
        setOutput(output.output);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, [output, error]);
  return (
    <div>
      <h1>Welcome...</h1>
      <h1>Enter your code in the text editor...</h1>
      {/* <textarea name="code" id="code" className="h-[80vh] w-[80vw] focus:outline-none m-5 p-5 text-black"></textarea> */}
      <MonacoEditor
        height="50vh"
        language="cpp"
        onChange={handleEditorChange}
        value={code}
      />
      <div>
        <h1>Output</h1>
        <div style={{backgroundColor:"white",color:'black',minHeight: "20vh"}}>
        {!error && !output && (<p>Output will appear here..</p>)}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {output && (
          <div>
            <pre>{output}</pre>
          </div>
        )}
      </div>
      </div>
      <Button variant="contained" onClick={handleSubmitCode}>
        Compile & Run
      </Button>
    </div>
  );
};

export default Home;

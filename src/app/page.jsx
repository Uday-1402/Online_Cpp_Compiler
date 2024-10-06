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
      console.log(output);
      if (output.error) {
        // console.error(error);
        setError(output.error);
        setOutput(null);
      } else {
        // console.log(output.output);
        setOutput(output.output);
        setError(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, [output, error]);
  return (
    <>
      <div>
        <h1 className="w-[100vw] h-[8vh] flex items-center justify-center bg-headingBackground font-mono font-bold text-3xl">
          Online Cpp Compiler
        </h1>
        <h1 className="p-2">Enter your code in the text editor...</h1>
        {/* <textarea name="code" id="code" className="h-[80vh] w-[80vw] focus:outline-none m-5 p-5 text-black"></textarea> */}
        <MonacoEditor
          height="50vh"
          language="cpp"
          onChange={handleEditorChange}
          value={code}
        />
        <div>
          <h1 className="p-2">Output</h1>
          <div
            style={{
              backgroundColor: "white",
              color: "black",
              minHeight: "20vh",
              whiteSpace: "pre-wrap",
              padding: "5px",
            }}
          >
            {!error && !output && <p>Output will appear here..</p>}
            {error && (
              <div
                className="overflow-auto max-h-[20vh]"
                style={{ color: "red" }}
              >
                <p>{error}</p>
              </div>
            )}
            {output && (
              // can use whiteSpace: "pre-wrap" in the outer div. instead of <pre></pre> tag..
              // <pre>
              //   {output}
              // </pre>
              <div>
                <p>{output}</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex w-[100vw] items-center justify-center p-2">
          <Button variant="contained" onClick={handleSubmitCode}>
            Compile & Run
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;

import { exec } from "child_process";
import { promisify } from "util";
import { writeFile, readFile } from "fs";
import path from "path";

export async function POST(req) {
  try {
    const tempCppCode = path.join(__dirname, "temp.cpp");
    const tempOutputFile = path.join(__dirname, "output");
    const reqJson = await req.json();
    const execAsync = promisify(exec);
    // console.log(reqJson);
    const { code } = reqJson;
    const execResult = {
      output: null,
      error: null,
    };
    // console.log(code);

    writeFile(tempCppCode, code, (err) => {
      if (err) throw err;

      // readFile(tempOutputFile, "utf8", (err, data) => {
      //   if (err) {
      //     return new Response(JSON.stringify({ error: err }));
      //   }

      //   return new Response(JSON.stringify({ output: data }));
      // });
    });
    const { stdout, stderr } = await execAsync(
      `g++ "${tempCppCode}" -o "${tempOutputFile}" && "${tempOutputFile}"`
    );
    if (stderr) {
      execResult.error = stderr;
    } else {
      execResult.output = stdout;
    }
    return new Response(JSON.stringify(execResult));
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({
        error: "Error in server. Cannot run the code at the moment.",
      })
    );
  }
}

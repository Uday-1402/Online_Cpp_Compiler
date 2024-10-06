import { exec } from "child_process";
import { promisify } from "util";
import { writeFile, unlink } from "fs/promises";
import path from "path";

export async function POST(req) {
  const execResult = {
    output: null,
    error: null,
  };
  try {
    const tempCppCode = path.join(__dirname, "temp.cpp");
    const tempOutputFile = path.join(__dirname, "output");
    const reqJson = await req.json();
    const execAsync = promisify(exec);
    // console.log(reqJson);
    const { code } = reqJson;
    // console.log(code);

    await writeFile(tempCppCode, code);
    const { stdout, stderr } = await execAsync(
      `g++ "${tempCppCode}" -o "${tempOutputFile}" && "${tempOutputFile}"`
    );
    if (stderr) {
      execResult.error = stderr;
    } else {
      execResult.output = stdout;
    }

    await unlink(tempCppCode);

    return new Response(JSON.stringify(execResult));
  } catch (err) {
    console.log(err);
    execResult.error = err.stderr;
    return new Response(JSON.stringify(execResult));
  }
}

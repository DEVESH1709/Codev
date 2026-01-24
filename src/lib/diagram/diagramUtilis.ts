export const generateMermaidFromCode = (code:string, language:string):string =>{

    const lang = language.toLowerCase();


    switch(lang){
        case 'javascript':
            case 'typescript':
    case 'typescriptreact':
    case 'javascriptreact':
      return parseJSClassDiagram(code);
    case 'python':
      return parsePythonClassDiagram(code);
    case 'c':
    case 'cpp':
    case 'c++':
      return parseCppClassDiagram(code);
    case 'java':
      return parseJavaClassDiagram(code);
    case 'csharp':
      return parseCSharpClassDiagram(code);
    default:
      return `graph TD\n    A[Visual Code not supported for ${language}]`;
    }
}


const parseJSClassDiagram = (code: string): string => {
  let diagram = "classDiagram\n";
  const classMatches = code.matchAll(/class\s+(\w+)(?:\s+extends\s+(\w+))?\s*/g);
  let found = false;

  for (const match of classMatches) {
    found = true;
    const className = match[1];
    const parentClass = match[2];

    if (parentClass) {
      diagram += `    ${parentClass} <|-- ${className}\n`;
    } else {
      diagram += `    class ${className}\n`;
    }
  }

  if (!found) return "graph TD\n    A[No Classes Found]";
  return diagram;
};

const parsePythonClassDiagram = (code: string): string => {
  let diagram = "classDiagram\n";
  const classMatches = code.matchAll(/class\s+(\w+)(?:\((\w+)\))?:/g);
  let found = false;

  for (const match of classMatches) {
    found = true;
    const className = match[1];
    const parentClass = match[2];

    if (parentClass) {
      diagram += `    ${parentClass} <|-- ${className}\n`;
    } else {
      diagram += `    class ${className}\n`;
    }
  }

  if (!found) return "graph TD\n    A[No Classes Found]";
  return diagram;
};

const parseCppClassDiagram = (code: string): string => {
  // 1. Check for Array/Vector definitions for Data Visualization (Real-time beginner view)
  // Matches: vector<...> or Type var[] or Type var = {...}
  if (code.match(/(vector|int|char|string|float|double)\s*[<\[]/) || code.match(/=\s*\{/)) {
    const dataVis = parseCppDataStructures(code);
    if (dataVis) return dataVis;
  }

  // 2. Fallback to Class Diagram logic
  let diagram = "classDiagram\n";
  const classMatches = code.matchAll(/(class|struct)\s+(\w+)(?:\s*:\s*(?:public|private|protected)\s+(\w+))?\s*\{([\s\S]*?)\};/g);
  let found = false;

  for (const match of classMatches) {
    found = true;
    const type = match[1];
    const className = match[2];
    const parentClass = match[3];
    const body = match[4];

    if (parentClass) {
      diagram += `    ${parentClass} <|-- ${className}\n`;
    } else {
      diagram += `    class ${className}\n`;
    }

    // Extract methods
    const methodMatches = body.matchAll(/([a-zA-Z0-9_<>:&*]+)\s+(\w+)\s*\(([^)]*)\)\s*\{/g);
    for (const method of methodMatches) {
      const returnType = method[1];
      const methodName = method[2];
      const args = method[3];
      if (!['if', 'for', 'while', 'switch', 'catch', 'return'].includes(returnType) &&
        !['if', 'for', 'while', 'switch', 'catch'].includes(methodName)) {
        diagram += `    ${className} : +${methodName}(${args.replace(/\s+/g, ' ')}) ${returnType}\n`;
      }
    }

    if (type === 'struct') {
      diagram += `    <<Struct>> ${className}\n`;
    }
  }

  if (!found) return "graph TD\n    A[No Classes/Structs Found]";
  return diagram;
};

// NEW: Data Structure Visualizer
const parseCppDataStructures = (code: string): string | null => {
  let diagram = "graph LR\n";
  let found = false;

  // 1. Match Vectors: vector<int> nums = {1, 2, 3};
  const vectorMatches = code.matchAll(/vector\s*<\s*(\w+)\s*>\s+(\w+)\s*=\s*\{([^}]+)\}/g);
  for (const match of vectorMatches) {
    found = true;
    const varName = match[2];
    const values = match[3].split(',').map(v => v.trim());

    diagram += `    ${varName}[Vector: ${varName}]\n`;
    diagram += `    class ${varName} varClass\n`;

    values.forEach((val, idx) => {
      if (val) {
        diagram += `    ${varName} --> ${varName}_${idx}["${val}"]\n`;
      }
    });
  }

  // 2. Match Arrays: int arr[] = {1, 2, 3};
  const arrayMatches = code.matchAll(/(\w+)\s+(\w+)\s*\[[^\]]*\]\s*=\s*\{([^}]+)\}/g);
  for (const match of arrayMatches) {
    found = true;
    const varName = match[2];
    const values = match[3].split(',').map(v => v.trim());

    diagram += `    ${varName}[Array: ${varName}]\n`;
    diagram += `    class ${varName} varClass\n`;

    values.forEach((val, idx) => {
      if (val) {
        diagram += `    ${varName} --> ${varName}_${idx}["${val}"]\n`;
      }
    });
  }

  diagram += `    classDef varClass fill:#f96,stroke:#333,stroke-width:2px;\n`;

  if (!found) return null; // Return null to fall back to class diagram if no data structures found
  return diagram;
};

const parseJavaClassDiagram = (code: string): string => {
  let diagram = "classDiagram\n";
  const classMatches = code.matchAll(/class\s+(\w+)(?:\s+extends\s+(\w+))?(?:\s+implements\s+[\w,\s]+)?\s*\{/g);
  let found = false;

  for (const match of classMatches) {
    found = true;
    const className = match[1];
    const parentClass = match[2];

    if (parentClass) {
      diagram += `    ${parentClass} <|-- ${className}\n`;
    } else {
      diagram += `    class ${className}\n`;
    }
  }

  if (!found) return "graph TD\n    A[No Classes Found]";
  return diagram;
};

const parseCSharpClassDiagram = (code: string): string => {
  let diagram = "classDiagram\n";
  const classMatches = code.matchAll(/class\s+(\w+)(?:\s*:\s*(\w+))?\s*/g);
  let found = false;

  for (const match of classMatches) {
    found = true;
    const className = match[1];
    const parentClass = match[2];

    if (parentClass) {
      diagram += `    ${parentClass} <|-- ${className}\n`;
    } else {
      diagram += `    class ${className}\n`;
    }
  }

  if (!found) return "graph TD\n    A[No Classes Found]";
  return diagram;
}

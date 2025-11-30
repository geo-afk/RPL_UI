import { Diagnostics } from "@/models/model";
import type * as monaco from "monaco-editor";

export function retrieveCodeDiagnostics(
    code: string,
    monacoInstance: typeof monaco,
    editor: monaco.editor.IStandaloneCodeEditor
) {
    const model = editor.getModel();
    const diagnostics = analyzeCode(code);

    const markers = diagnostics.map(diag => ({
        severity:
            diag.severity === "error"
                ? monacoInstance.MarkerSeverity.Error
                : monacoInstance.MarkerSeverity.Warning,
        startLineNumber: diag.line,
        startColumn: diag.column ?? 1,
        endLineNumber: diag.line,
        endColumn: diag.endColumn ?? 1000,
        message: diag.message,
        source: "RPL Analyzer"
    }));

    if (!model) return;
    monacoInstance.editor.setModelMarkers(model, "rpl", markers);
}


/* ===========================================================
   SEMANTIC ANALYZER (Updated for new grammar)
   =========================================================== */

function analyzeCode(code: string): Diagnostics[] {
    const diagnostics: Diagnostics[] = [];
    const lines = code.split("\n");

    const roles = new Set<string>();
    const users = new Set<string>();
    const resources = new Set<string>();
    const groups = new Set<string>();

    function error(line: number, msg: string, col?: number, end?: number) {
        diagnostics.push({ severity: "error", line, column: col, endColumn: end, message: msg });
    }

    function warn(line: number, msg: string, col?: number, end?: number) {
        diagnostics.push({ severity: "warning", line, column: col, endColumn: end, message: msg });
    }

    /* ==================== FIRST PASS: DECLARATIONS ==================== */

    lines.forEach((line, i) => {
        const ln = i + 1;
        const t = line.trim();

        /* ---- ROLE ---- */
        const roleMatch = t.match(/^role\s+(\w+)(?:\s+extends\s+(\w+))?/);
        if (roleMatch) {
            const [_, name, parent] = roleMatch;

            if (roles.has(name))
                error(ln, `Role '${name}' already declared`);

            roles.add(name);

            if (parent && !roles.has(parent))
                error(ln, `Role '${name}' extends undefined role '${parent}'`);

        }

        /* ---- USER ---- */
        const userMatch = t.match(/^user\s+(\w+)/);
        if (userMatch) {
            const name = userMatch[1];
            if (users.has(name)) error(ln, `User '${name}' already declared`);
            users.add(name);
        }

        /* ---- RESOURCE ---- */
        const resMatch = t.match(/^resource\s+(\w+)/);
        if (resMatch) {
            const name = resMatch[1];
            if (resources.has(name)) error(ln, `Resource '${name}' already declared`);
            resources.add(name);
        }

        /* ---- GROUP ---- */
        const groupMatch = t.match(/^group\s+(\w+)/);
        if (groupMatch) {
            const name = groupMatch[1];
            if (groups.has(name)) error(ln, `Group '${name}' already declared`);
            groups.add(name);
        }
    });


    /* ==================== SECOND PASS: PROPERTIES ==================== */

    lines.forEach((line, i) => {
        const ln = i + 1;
        const t = line.trim();

        /* ---- ROLE BODY CHECK ---- */

        if (t.startsWith("role ")) {
            if (!findBlock(lines, i))
                warn(ln, "Role declaration missing body '{}'");
        }

        /* ---- PERMISSIONS STRUCTURE ---- */

        if (t.includes("permissions:")) {
            if (!t.includes("["))
                error(ln, "permissions must be a list '[...]'");
        }

        if (t.includes("can:")) {
            if (!t.includes("resources:"))
                error(ln, "`can:` block must include `resources:` list");
        }


        if (t.startsWith("path:")) {
            if (!stringValue(t))
                error(ln, "path must be a string");
        }

        if (t.startsWith("type:")) {
            const typeWithComma = t.split(":")[1]?.trim();
            const type = typeWithComma.split(",")[0]?.trim();

            const normalized = type?.toUpperCase();

            if (!["API", "DATABASE", "FOLDER"].includes(normalized)) {
                error(ln, `Invalid resource type '${type}'`);
            }
        }


        if (t.startsWith("metadata:") && !t.includes("{"))
            error(ln, "metadata must be object '{}'");


        /* ---- USER ROLES ---- */

        if (t.startsWith("role:")) {
            const rolesList = extractList(t);
            rolesList.forEach(r => {
                if (!roles.has(r))
                    error(ln, `User references undefined role '${r}'`);
            });
        }

        /* ---- VALID PERIOD ---- */

        if (t.startsWith("valid_from:") || t.startsWith("valid_until:")) {
            if (!stringValue(t))
                error(ln, "Valid dates must be strings");
        }

        /* ---- GROUP MEMBERS ---- */

        if (t.startsWith("members:")) {
            const list = extractList(t);
            list.forEach(m => {
                if (!users.has(m))
                    error(ln, `Undefined user '${m}' in group`);
            });
        }

        if (t.startsWith("role:") && previousBlock(lines, i) === "group") {
            const list = extractList(t);
            list.forEach(r => {
                if (!roles.has(r))
                    error(ln, `Undefined role '${r}' in group`);
            });
        }

        /* ---- RESOURCE REFERENCE VALIDATION ---- */

        if (t.includes("resources:")) {
            const list = extractList(t);
            list.forEach(res => {
                const base = res.split(".")[0];
                if (res !== "*" && !resources.has(base))
                    warn(ln, `Unknown resource '${res}'`);
            });
        }
    });

    return diagnostics;
}


/* ===========================================================
   HELPERS
   =========================================================== */

function extractList(line: string): string[] {
    const match = line.match(/\[(.*?)\]/);
    if (!match) return [];
    return match[1].split(",").map(x => x.trim()).filter(Boolean);
}

function stringValue(line: string): boolean {
    return /:\s*".*"/.test(line);
}

function findBlock(lines: string[], start: number): boolean {
    for (let i = start; i < Math.min(lines.length, start + 5); i++) {
        if (lines[i].includes("{")) return true;
    }
    return false;
}

function previousBlock(lines: string[], index: number): "group" | "role" | "user" | null {
    for (let i = index; i >= 0; i--) {
        const l = lines[i].trim();
        if (l.startsWith("group ")) return "group";
        if (l.startsWith("role ")) return "role";
        if (l.startsWith("user ")) return "user";
    }
    return null;
}

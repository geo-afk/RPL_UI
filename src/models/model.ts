
export interface TraceStep {
    step: number;
    action: string;
    result: string;
}

export interface EvaluateResult {
    allowed: boolean;
    rule: string;
    riskScore: number;
    trace: TraceStep[];
}

export interface Resource {
    id: number;
    path: string;
    type: string;
    riskLevel: 'low' | 'medium' | 'high';
}

export interface User {
    id: number;
    name: string;
    role: string;
    department: string;
    permissions: string[];
    email: string;
}

export interface Role {
    id: number;
    name: string;
    description: string;
    permissions: string[];
    users: string[];   // user names
    inherits: string[]; // role names
}

export interface FileSystemNode {
    name: string;
    type: string;
    size?: string;
    restricted?: boolean;
    endpoint?: string;
    children?: FileSystemNode[];
}

export interface PolicyRisk {
    id: number;
    severity: 'low' | 'medium' | 'high';
    line: number;
    message: string;
    score: number;
}

export interface PolicyAnalysis {
    totalPolicies: number;
    risks: PolicyRisk[];
    summary: {
        low: number;
        medium: number;
        high: number;
    };
}


export interface AuditLogEntry {
    id: number;
    timestamp: string;
    user: string;
    resource: string;
    action: string;
    result: 'allowed' | 'denied';
    reason: string;
    riskScore: number;
}



export type DatabaseKey = 'DB_Finance' | 'DB_HR';

export interface SimulateAccessResult {
    allowed: boolean;
    rule: string;
    riskScore: number;
    trace: { step: number; action: string; result: string }[];
}

export interface DatabaseViewerProps {
    darkMode: boolean;
    cardClass: string;
    inputClass: string;
}


export interface AdminPanelProps {
    darkMode: boolean;
    cardClass: string;
    inputClass: string;
    showToast: (message: string, type?: string) => void;
    loadData: () => void;
}


export interface Diagnostics {
    severity: string;
    line: number;
    column?: number;
    endColumn?: number;
    message: string;
}


export interface PolicyEditorProps {
    darkMode: boolean;
    cardClass: string;
}





export interface RegisterUserRequest {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
}
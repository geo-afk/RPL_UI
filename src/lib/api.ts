import { PolicyAnalysis, Resource, Role, User } from '@/models/model';
import axios from 'axios';


export const API_BASE = 'http://localhost:8000';




// useEffect(() => {
//   fetch("/routes")
//     .then(res => res.json())
//     .then(data => console.log(data));
// }, []);



export async function get_data() {
    const token = localStorage.getItem('token')

    try {
        const [one, two] = await Promise.all(
            [
                axios.get(API_BASE, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }),

                axios.get(API_BASE, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ]
        )
    } catch (error) {
        console.log(error);

    }

}

export const api = {

    async evaluate_code(code: string) {

        try {
            const response = await axios.post(API_BASE + "/code/analyze", {
                code: code,
                use_llm: false
            })

            console.log(response);


            return response.data

        } catch (error) {
            console.log(error);
            return null

        }

    },
    async evaluate(user: string, resource: string, action: string) {
        await new Promise(r => setTimeout(r, 500));
        const allowed = Math.random() > 0.3;
        return {
            allowed,
            rule: allowed ? 'ALLOW rule #12: Developers can read DB_Finance' : 'DENY rule #8: Guest cannot delete',
            riskScore: Math.floor(Math.random() * 100),
            trace: [
                { step: 1, action: 'Check user role', result: 'Developer' },
                { step: 2, action: 'Check resource permissions', result: allowed ? 'Matched' : 'Denied' },
                { step: 3, action: 'Evaluate conditions', result: 'Time constraint met' }
            ]
        };
    },

    async getResources(): Promise<Resource[]> {
        return [
            { id: 1, path: '/data/financial', type: 'database', riskLevel: 'high' },
            { id: 2, path: '/data/public', type: 'folder', riskLevel: 'low' },
            { id: 3, path: '/api/users', type: 'api', riskLevel: 'medium' },
            { id: 4, path: '/data/hr', type: 'database', riskLevel: 'high' }
        ];
    },

    async getUsers(): Promise<User[]> {
        return [
            {
                id: 1,
                name: 'JaneDoe',
                role: 'Developer',
                department: 'Engineering',
                permissions: ['read:DB_Finance', 'write:DB_Finance', 'read:/data/public'],
                email: 'jane@company.com'
            },
            {
                id: 2,
                name: 'JohnSmith',
                role: 'Admin',
                department: 'IT',
                permissions: ['*:*'],
                email: 'john@company.com'
            },
            {
                id: 3,
                name: 'AliceWang',
                role: 'Guest',
                department: 'Marketing',
                permissions: ['read:/data/public'],
                email: 'alice@company.com'
            },
            {
                id: 4,
                name: 'BobJones',
                role: 'Manager',
                department: 'Finance',
                permissions: ['read:DB_Finance', 'read:DB_HR', 'write:DB_Finance'],
                email: 'bob@company.com'
            }
        ];
    },

    async getRoles(): Promise<Role[]> {
        return [
            {
                id: 1,
                name: 'Admin',
                description: 'Full system access',
                permissions: ['*:*'],
                users: ['JohnSmith'],
                inherits: []
            },
            {
                id: 2,
                name: 'Developer',
                description: 'Development team access',
                permissions: ['read:DB_Finance', 'write:DB_Finance', 'read:/data/public', 'write:/data/public'],
                users: ['JaneDoe'],
                inherits: ['Guest']
            },
            {
                id: 3,
                name: 'Manager',
                description: 'Management level access',
                permissions: ['read:DB_Finance', 'read:DB_HR', 'write:DB_Finance'],
                users: ['BobJones'],
                inherits: ['Guest']
            },
            {
                id: 4,
                name: 'Guest',
                description: 'Limited read-only access',
                permissions: ['read:/data/public'],
                users: ['AliceWang'],
                inherits: []
            }
        ];
    },

    async getPolicyCode() {
        return `// Secure Policy Language (RPL)
// Generated: ${new Date().toISOString()}
role admin {can:  read, write, execute, delete}
ROLE Developer {can: read, write}
ROLE Guest {can: read}

// Define users
USER Alice {role: Admin, Developer}
USER Bob {role: Developer, Admin}
USER Charlie {role: Guest, Developer}

// Define resources
RESOURCE DB_Finance {path: "/data/financial"}
RESOURCE DB_Public {path: "/data/public"}
RESOURCE API_Internal {path: "/api/internal"}

// Policy rules
ALLOW action: read, write ON resource: DB_Finance
IF (time.hour > 9 AND time.hour < 17)

DENY action: delete ON resource: DB_Finance
IF (u_one.role == Guest)

ALLOW action: read ON resource: DB_Public

DENY action: * ON resource: API_Internal
IF (time.hour < 6 OR time.hour > 22)
`;
    },

    async getDatabaseData(dbName: string, table: string) {
        const mockData: Record<string, Record<string, any[]>> = {
            DB_Finance: {
                transactions: [
                    { id: 1, date: '2025-11-01', amount: 15000, type: 'Revenue', department: 'Sales' },
                    { id: 2, date: '2025-11-02', amount: 8500, type: 'Expense', department: 'IT' },
                    { id: 3, date: '2025-11-03', amount: 22000, type: 'Revenue', department: 'Marketing' },
                    { id: 4, date: '2025-11-04', amount: 5200, type: 'Expense', department: 'HR' }
                ],
                budgets: [
                    { id: 1, department: 'Sales', allocated: 100000, spent: 45000, remaining: 55000 },
                    { id: 2, department: 'IT', allocated: 80000, spent: 62000, remaining: 18000 },
                    { id: 3, department: 'Marketing', allocated: 120000, spent: 95000, remaining: 25000 }
                ]
            },
            DB_HR: {
                employees: [
                    { id: 1, name: 'Jane Doe', position: 'Developer', salary: 85000, hired: '2023-01-15' },
                    { id: 2, name: 'John Smith', position: 'Admin', salary: 95000, hired: '2022-06-01' },
                    { id: 3, name: 'Alice Wang', position: 'Analyst', salary: 65000, hired: '2024-03-10' }
                ]
            }
        };

        return mockData[dbName]?.[table] || [];
    },

    async getFileSystem() {
        return {
            name: '/',
            type: 'folder',
            children: [
                {
                    name: 'data',
                    type: 'folder',
                    children: [
                        {
                            name: 'financial',
                            type: 'folder',
                            restricted: true,
                            children: [
                                { name: 'budget_2025.xlsx', type: 'file', size: '2.4 MB', restricted: true },
                                { name: 'transactions.csv', type: 'file', size: '1.8 MB', restricted: true }
                            ]
                        },
                        {
                            name: 'public',
                            type: 'folder',
                            children: [
                                { name: 'announcements.txt', type: 'file', size: '45 KB' },
                                { name: 'handbook.pdf', type: 'file', size: '3.2 MB' }
                            ]
                        },
                        {
                            name: 'hr',
                            type: 'folder',
                            restricted: true,
                            children: [
                                { name: 'employees.db', type: 'file', size: '5.1 MB', restricted: true },
                                { name: 'payroll_nov.xlsx', type: 'file', size: '890 KB', restricted: true }
                            ]
                        }
                    ]
                },
                {
                    name: 'api',
                    type: 'folder',
                    children: [
                        { name: 'users', type: 'api', endpoint: '/api/users' },
                        { name: 'auth', type: 'api', endpoint: '/api/auth' }
                    ]
                }
            ]
        };
    },

    async getPolicyAnalysis(): Promise<PolicyAnalysis | null> {
        return {
            totalPolicies: 24,
            risks: [
                { id: 1, severity: 'medium', line: 42, message: 'Potential over-permissive read access in Developer role', score: 60 },
                { id: 2, severity: 'low', line: 67, message: 'Minor condition overlap in time-based rules', score: 25 },
                { id: 3, severity: 'low', line: 103, message: 'Overly broad wildcard usage', score: 30 }
            ],
            summary: { low: 7, medium: 1, high: 0 }
        };
    }
};
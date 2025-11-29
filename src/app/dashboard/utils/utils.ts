import { Database, Users, Lock, Shield, Zap, BookOpen, Code } from "lucide-react";


export const TutorialSteps = [
    {
        title: "Define Roles",
        code: `ROLE Analyst {
    PERMISSIONS: [
        {
            ACTIONS: [ READ ],
            RESOURCES: [ Finance.records ],
            CONDITIONS: person.level >= 3
        }
    ]
}`,
        explanation: "Roles group permissions together. Each role specifies what actions its members can perform.",
        icon: Users
    },
    {
        title: "Create Users",
        code: `USER Guest {
    ROLE: [ Analyst ]
}`,
        explanation: "Users are assigned to roles. This determines what each user can access.",
        icon: Users
    },
    {
        title: "Define Resources",
        code: `RESOURCE DNS {
    domain: "example.com"
}`,
        explanation: "Resources are the things you want to protect (databases, files, APIs).",
        icon: Database
    },
    {
        title: "Create Group",
        code: `GROUP Mixed {
    MEMBERS: [ X, Y ],
    ROLE: [ A, B ]
}
`,
        explanation: "Groups are a collection of users that you can assign one of more roles to at once",
        icon: Lock
    }
];



export const Features = [
    { icon: BookOpen, title: "Easy to Read", description: "Human-readable syntax that anyone can understand" },
    { icon: Shield, title: "Secure by Default", description: "Built-in security analysis detects risky policies" },
    { icon: Zap, title: "Fast Enforcement", description: "Real-time access control decisions in milliseconds" },
    { icon: Code, title: "Powerful Logic", description: "Support for conditions, time-based rules, and more" },
];



export const Examples = [
    {
        title: "Admin Role with Read and Write Permissions",
        description: "Grants full read/write access to databases and configuration files, but only for senior admins (level 3+) and when the resource is explicitly marked as secure.",
        code: `ROLE ROLE_ADMIN {
  PERMISSIONS: [
    {
      ACTIONS: [ READ, WRITE ],
      RESOURCES: [ RESOURCE_DB, RESOURCE_CONFIG ],
      CONDITIONS: (user.level >= 3 AND resource.tags CONTAINS "secure")
    }
  ]
}`
    },
    {
        title: "Analyst Role with Conditional Read and Modify",
        description: "Allows finance and audit team members to view sensitive financial data, plus lets anyone modify reports that are still in draft stage — perfect for collaborative reviewing.",
        code: `ROLE ROLE_ANALYST {
  PERMISSIONS: [
    {
      ACTIONS: [ READ, MODIFY ],
      RESOURCES: [ RESOURCE_FINANCE, RESOURCE_REPORTS ],
      CONDITIONS: (person.department IN ["finance", "audit"] OR report.status CONTAINS "draft")
    }
  ]
}`
    },
    {
        title: "User Assigned to Two Roles",
        description: "Jordan is both an administrator and an analyst throughout 2025, giving him the combined privileges of both roles during that period.",
        code: `USER USER_JORDAN {
  ROLE: [ ROLE_ADMIN, ROLE_ANALYST ],
  VALID_FROM: "2025-01-01",
  VALID_UNTIL: "2025-12-31"
}`
    },
    {
        title: "Resource with ID, Name, Tags, and Metadata",
        description: "Defines a production server with rich metadata (owner, location, capacity) and tags that can later be used in policy conditions.",
        code: `RESOURCE RESOURCE_SERVER {
  id: 101,
  name: "MainServer",
  tags: [ "critical", "prod" ],
  metadata: {
    owner: "OpsTeam",
    location: "DataCenter1",
    capacity: 4096
  }
}`
    },
    {
        title: "Group with Members and Roles",
        description: "The DevOps group bundles three engineers and automatically assigns them both admin and analyst capabilities, plus tags for easier policy targeting.",
        code: `GROUP GROUP_DEVOPS {
  MEMBERS: [ USER_JORDAN, USER_ALICE, USER_BOB ],
  ROLE: [ ROLE_ADMIN, ROLE_ANALYST ],
  TAGS: [ "team", "ops" ]
}`
    },
    {
        title: "Metrics Role with Conditional Permissions",
        description: "A specialized role for the monitoring system: it can read metrics and call APIs under high load (with a safety margin), unless the resource is deprecated. Admins always bypass the condition.",
        code: `ROLE ROLE_METRICS {
  PERMISSIONS: [
    {
      ACTIONS: [ READ, EXECUTE ],
      RESOURCES: [ RESOURCE_METRICS, RESOURCE_API ],
      CONDITIONS: ((load + 10) > 50 AND NOT resource.tags CONTAINS "deprecated") OR user.role == "Admin"
    }
  ]
}`
    },
    {
        title: "Superuser Role with Wildcard Permissions",
        description: "The ultimate escape hatch: full unrestricted access to everything in the system — use sparingly and usually only for service accounts or emergency break-glass scenarios.",
        code: `ROLE ROLE_SUPERUSER {
  CAN: [ STAR ],
  RESOURCES: [ SYSTEM.STAR ]
}`
    },
    {
        title: "Nested Group and Users",
        description: "Shows how group-level roles (TEAM_ALPHA gets both admin and analyst) combine with individual overrides: Alice keeps full admin rights, while Bob is limited to analyst only.",
        code: `GROUP TEAM_ALPHA {
  MEMBERS: [ USER_JORDAN, USER_ALICE ],
  ROLE: [ ROLE_ADMIN, ROLE_ANALYST ]
}
USER USER_ALICE {
  ROLE: [ ROLE_ADMIN ]
}
USER USER_BOB {
  ROLE: [ ROLE_ANALYST ]
}`
    }
];



export function getThemeClasses(dark: boolean) {
    return {
        accent: dark ? "indigo-400" : "indigo-600",
        accentBg: dark ? "bg-indigo-900/30" : "bg-indigo-100",
        accentHover: dark ? "hover:bg-indigo-900/50" : "hover:bg-indigo-200",
        accentText: dark ? "text-indigo-300" : "text-indigo-700",
        primaryButton: dark
            ? "bg-indigo-600 hover:bg-indigo-700"
            : "bg-indigo-600 hover:bg-indigo-700",

        bgClass: dark ? "bg-gray-900" : "bg-gray-50",
        textClass: dark ? "text-gray-300" : "text-gray-600",
        borderClass: dark ? "border-gray-700" : "border-gray-200",
        mutedBg: dark ? "bg-gray-800" : "bg-gray-100",
    };
}



export function getTemplateString(): string {

    return `
/* ======================================================
RPL MASTER TEMPLATE (REAL KEYS, PLACEHOLDER VALUES)
====================================================== */


// ----------- ROLES -----------

ROLE ROLE_A {
    PERMISSIONS: [
        {
            ACTIONS: [ ACTION_1, ACTION_2 ],
            RESOURCES: [ RESOURCE_A, RESOURCE_B ],
            CONDITIONS: (CONDITION_EXPRESSION)
        }
    ]
}

ROLE ROLE_B {
    CAN: [ ACTION_1, ACTION_2, ACTION_3 ]
    RESOURCES: [ RESOURCE_X, RESOURCE_Y ]
}

ROLE ROLE_CHILD EXTENDS ROLE_PARENT {
    PERMISSIONS: [
        {
            ACTIONS: [ ACTION_4 ],
            RESOURCES: [ RESOURCE_Z ]
        }
    ]
}


// ----------- USERS -----------

USER USER_A {
    ROLE: [ ROLE_A, ROLE_B ]
    VALID_FROM: "YYYY-MM-DD"
    VALID_UNTIL: "YYYY-MM-DD"
}

USER USER_B {
    ROLE: [ ROLE_C ]
    ATTRIBUTES: {
        department: GENERIC_DEPARTMENT,
        active: GENERIC_BOOLEAN
    }
}


// ----------- GROUPS -----------

GROUP GROUP_A {
    MEMBERS: [ USER_A, USER_B, USER_C ]
    ROLE: [ ROLE_A ]
}

GROUP GROUP_B {
    MEMBERS: [ USER_X ]
}


// ----------- RESOURCES -----------

RESOURCE RESOURCE_A {
    id: GENERIC_ID,
    type: "GENERIC_TYPE",
    tags: [ TAG_1, TAG_2 ],
    metadata: {
        owner: GENERIC_OWNER,
        version: GENERIC_VERSION
    }
}

RESOURCE RESOURCE_B {
    path: "GENERIC_PATH",
    value: GENERIC_VALUE
}

    `
}



export function getKeywords() {
    return [
        'ROLE',
        'USER',
        'RESOURCE',
        'GROUP',
        'MEMBERS',
        'PERMISSIONS',
        'ACTIONS',
        'RESOURCES',
        'CONDITIONS',
        'CAN',
        'EXTENDS',
        'VALID_FROM',
        'VALID_UNTIL',

        // Logical
        'AND',
        'OR',
        'NOT',

        // Actions
        'READ',
        'WRITE',
        'MODIFY',
        'START',
        'STOP',
        'DEPLOY',
        'DELETE',
        'EXECUTE',

        // Other operators-as-keywords
        'IN',
        'CONTAINS',
    ]
}


export function getOperatorsAndExpressions() {

    return [
        { op: '==', desc: 'Equals comparison' },
        { op: '!=', desc: 'Not equals comparison' },
        { op: '< > <= >=', desc: 'Comparison operators' },
        { op: '+ - * /', desc: 'Arithmetic operators' },
        { op: 'AND OR NOT', desc: 'Logical operators' },
        { op: 'IN', desc: 'Set membership operator' },
        { op: 'CONTAINS', desc: 'Substring or field containment check' },
        { op: '.', desc: 'Namespace / field access operator' }
    ]


}
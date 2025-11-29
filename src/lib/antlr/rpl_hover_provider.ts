function roleDocs() {
    return {
        'ROLE': 'Declares a role with specific permissions.\n\nExample: `ROLE Admin {can: *}`',
        'role': 'Declares a role with specific permissions.\n\nExample: `role Admin {can: *}`',

    };
}



function userDocs() {

    return {
        'USER': 'Declares a user and assigns them to a role.\n\nExample: `USER JaneDoe {role: Developer}`',
        'user': 'Declares a user and assigns them to a role.\n\nExample: `USER JaneDoe {role: Developer}`',
    }

}


function resourceDocs() {

    return {
        'RESOURCE': 'Declares a resource with attributes.\n\nExample: `RESOURCE DB_Finance {path: "/data/financial"}`',
        'resource': 'Declares a resource with attributes.\n\nExample: `resource DB_Finance {path: "/data/financial"}`',
    }

}


function allowDocs() {

    return {
        'ALLOW': 'Creates a policy rule that permits actions.\n\nExample: `ALLOW ACTION: READ ON RESOURCE: DB_Finance`',
        'allow': 'Creates a policy rule that permits actions.\n\nExample: `ALLOW ACTION: READ ON RESOURCE: DB_Finance`',
    }
}



function denyDocs() {

    return {
        'DENY': 'Creates a policy rule that forbids actions.\n\nExample: `DENY ACTION: DELETE ON RESOURCE: DB_Finance`',
        'deny': 'Creates a policy rule that forbids actions.\n\nExample: `DENY ACTION: DELETE ON RESOURCE: DB_Finance`',
    }
}


function actionDocs() {

    return {
        'ACTION': 'Specifies actions in a policy rule.\n\nExample: `ACTION: READ, WRITE`',
        'action': 'Specifies actions in a policy rule.\n\nExample: `ACTION: READ, WRITE`',
    }

}

function canDocs() {
    return {
        'CAN': 'Specifies permissions that a role can perform.\n\nExample: `can: READ, WRITE, MODIFY`',
        'can': 'Specifies permissions that a role can perform.\n\nExample: `can: READ, WRITE, MODIFY`',
    }

}

function onDocs() {

    return {
        'ON': 'Specifies the resource target in a policy rule.\n\nExample: `ON RESOURCE: DB_Finance`',
        'on': 'Specifies the resource target in a policy rule.\n\nExample: `ON RESOURCE: DB_Finance`',
    }
}


function ifDocs() {

    return {
        'IF': 'Introduces a conditional expression for policy rules.\n\nExample: `IF (user.department == "Finance")`',
        'if': 'Introduces a conditional expression for policy rules.\n\nExample: `IF (user.department == "Finance")`',
    }
}

function andDocs() {

    return {
        'AND': 'Logical AND operator for combining conditions.\n\nExample: `IF (a > 5 AND b < 10)`',
        'and': 'Logical AND operator for combining conditions.\n\nExample: `IF (a > 5 AND b < 10)`',
    }
}

function orDocs() {

    return {
        'OR': 'Logical OR operator for combining conditions.\n\nExample: `IF (a > 5 OR b < 10)`',
        'or': 'Logical OR operator for combining conditions.\n\nExample: `IF (a > 5 OR b < 10)`',
    }
}

function notDocs() {

    return {

        'NOT': 'Logical NOT operator for negating conditions.\n\nExample: `IF (NOT user.isExternal)`',
        'not': 'Logical NOT operator for negating conditions.\n\nExample: `IF (NOT user.isExternal)`',
    }
}


function readDocs() {

    return {
        'READ': 'Permission to read or view a resource.',
        'read': 'Permission to read or view a resource.',
    }
}


function writeDocs() {

    return {
        'WRITE': 'Permission to write or create data in a resource.',
        'write': 'Permission to write or create data in a resource.',
    }
}


function modifyDocs() {

    return {
        'MODIFY': 'Permission to modify or update existing data.',
        'modify': 'Permission to modify or update existing data.',
    }
}


function startDocs() {

    return {
        'START': 'Permission to start or activate a resource.',
        'start': 'Permission to start or activate a resource.',
    }
}


function stopDocs() {

    return {
        'STOP': 'Permission to stop or deactivate a resource.',
        'stop': 'Permission to stop or deactivate a resource.',
    }
}


function deployDocs() {

    return {
        'DEPLOY': 'Permission to deploy a resource.',
        'deploy': 'Permission to deploy a resource.',
    }
}


function deleteDocs() {

    return {
        'DELETE': 'Permission to delete a resource.',
        'delete': 'Permission to delete a resource.',
    }
}


function executeDocs() {

    return {
        'EXECUTE': 'Permission to execute operations on a resource.',
        'execute': 'Permission to execute operations on a resource.',
    }
}

function appendToDocs(keywordDocs: Record<string, string>) {

    const docProviders = [
        roleDocs,
        userDocs,
        resourceDocs,
        allowDocs,
        actionDocs,
        denyDocs,
        canDocs,
        onDocs,
        ifDocs,
        andDocs,
        orDocs,
        notDocs,
        readDocs,
        writeDocs,
        modifyDocs,
        startDocs,
        stopDocs,
        deployDocs,
        deleteDocs,
        executeDocs
    ];

    for (const provider of docProviders) {
        Object.assign(keywordDocs, provider());
    }
}


export function hoverDocs(): Record<string, string> {
    const keywordDocs: Record<string, string> = {};
    appendToDocs(keywordDocs)

    return keywordDocs;
}

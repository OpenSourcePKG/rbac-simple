import {Rbac} from '../src/rbac.js';
import {Rights} from '../src/rbac/rights.js';
import {Roles} from '../src/rbac/roles.js';

const enum Role {
  root = 'root',
  user = 'user'
}

const enum Right {
  contracts = 'contracts',
  contracts_delete = 'contracts_delete',
  contracts_read = 'contracts_read',
  contracts_write = 'contracts_write',
  invoices = 'invoices',
  invoices_write = 'invoices_write',
  read = 'read',
  users = 'users'
}

const roles = new Roles([
  Role.root,
  Role.user
]);

const rights = new Rights({
  [Right.contracts]: {
    [Right.contracts_delete]: {},
    [Right.contracts_read]: {},
    [Right.contracts_write]: {}
  },
  [Right.invoices]: {
    [Right.read]: {},
    [Right.invoices_write]: {}
  },
  [Right.users]: {
    [Right.read]: {}
  }
});

const rbac = new Rbac(roles, rights, {
  [Role.root]: [
    Right.contracts,
    Right.invoices_write,
    Right.read
  ],
  [Role.user]: [
    Right.users
  ]
});

const checks: [Role, Right, boolean][] = [
  [
    Role.root,
    Right.contracts,
    true
  ],
  [
    Role.root,
    Right.invoices_write,
    true
  ],
  [
    Role.root,
    Right.invoices,
    false
  ],
  [
    Role.root,
    Right.read,
    true
  ],
  [
    Role.user,
    Right.contracts,
    false
  ],
  [
    Role.user,
    Right.invoices_write,
    false
  ],
  [
    Role.user,
    Right.invoices,
    false
  ],
  [
    Role.user,
    Right.read,
    false
  ],
  [
    Role.user,
    Right.users,
    true
  ]
];

for (const [key, [role, right, expectedResult]] of Object.entries(checks)) {
  if (rbac.check(role, right) === expectedResult) {
    console.log(`check ${key}: OK`);
  } else {
    console.error(`check ${key}: FAIL`);
  }
}
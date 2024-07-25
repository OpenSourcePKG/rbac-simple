import {Rbac} from '../src/rbac.js';

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
  invoices_read = 'invoices_read',
  users = 'users',
  users_read = 'users_read'
}

const rbac = new Rbac<Role, Right>([
  Role.root,
  Role.user
], {
  [Right.contracts]: {
    [Right.contracts_delete]: {},
    [Right.contracts_read]: {},
    [Right.contracts_write]: {}
  },
  [Right.invoices]: {
    [Right.invoices_read]: {},
    [Right.invoices_write]: {}
  },
  [Right.users]: {
    [Right.users_read]: {}
  }
}, {
  [Role.root]: [
    Right.contracts,
    Right.invoices_write,
    Right.invoices_read
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
    Right.contracts_delete,
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
    Right.invoices_read,
    true
  ],
  [
    Role.root,
    Right.users_read,
    false
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
    Right.invoices_read,
    false
  ],
  [
    Role.user,
    Right.users,
    true
  ],
  [
    Role.user,
    Right.users_read,
    true
  ]
];

for (const [key, [role, right, expectedResult]] of Object.entries(checks)) {
  if (rbac.checkAccess(role, right) === expectedResult) {
    console.log(`check ${key}: OK`);
  } else {
    console.error(`check ${key}: FAIL`);
  }
}
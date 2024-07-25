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
  read = 'read'
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
  anotherRight: {
    subResource: {
      delete: {},
      [Right.read]: {}
    }
  },
  resource4: {}
});

const associations = {
  root: [
    Right.contracts,
    Right.invoices_write,
    Right.read
  ],
  [Role.user]: [
    'subResource'
  ]
};

const rbac = new Rbac(roles, rights, associations);

if (rbac.check(Role.root, Right.contracts)) {
  console.log('OK');
}
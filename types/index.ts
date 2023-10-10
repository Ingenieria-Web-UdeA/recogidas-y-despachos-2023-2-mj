export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date;
  image: string;
  roleId: string;
}

export interface UsersQuery {
  users: User[];
}

export interface Role {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RolesQuery {
  roles: Role[];
}

export interface Lot {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LotsQuery {
  lots: Lot[];
}

export interface Collection {
  id: string;
  bunches: number;
  collectionDate: Date;
  lotId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CollectionsQuery {
  collections: Collection[];
}

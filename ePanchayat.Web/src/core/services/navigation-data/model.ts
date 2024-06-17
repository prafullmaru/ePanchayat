export interface UserGroup {
  groupId?: number;
  groupName?: string;
}

export interface GroupAccess {
  AccessControlId?: number;
  ObjectTypeName?: string;
  ObjectTypeId?: number;
  ObjectName?: string;
  ViewPrivilege?: number;
  UpdatePrivilege?: number;
  AddPrivilege?: number;
  ISGrant?: boolean;
  PrivilegeMask?: number;
  OperatorObjectTypeId?: number;
  OperatorId?: number;
  ObjectId?: number;
}

export interface UserContext {
  CoreId?: number;
  Id?: string;
  FirstName?: string;
  LastName?: string;
  SessionId?: string;
  NavItems?: NavItem[];
  Groups?: UserGroup[];
  Modules?: ModuleInfo[];
  DisplayName?: string;
  UserName?: string;
}

export interface ModuleInfo {
  moduleId?: string;
  moduleName?: string;
  direction?: string;
  icon?: string;
}

export interface NavItem {
  location?: string;
  description?: string;
  parentLocation?: string;
  hasChildren?: boolean;
  hidden?: boolean;
  isDisabled?: boolean;
  isSplitMenu?: boolean;
  appName?: string;
  moduleId?: string;
}

export interface ObjectType {
  ObjectTypeId: number;
  ObjectTypeName: number;
}

export interface TopMenu {
  TopMenuId?: number;
  Location?: string;
  Name?: string;
  Icon?: string;
  Direction?: string;
  Description?: string;
  SortOrder?: number;
  SubMenus?: SubMenu[];
}

export interface SubMenu {
  SubMenuId?: number;
  TopMenuId?: number;
  ObjectTypeName?: string;
  Location?: string;
  Description?: string;
  IsDisabled?: boolean;
  SortOrder?: number;
  Icon?: string;
}

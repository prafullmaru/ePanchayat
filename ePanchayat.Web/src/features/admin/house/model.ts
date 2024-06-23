export interface House {
  houseId?: number;
  houseNumber: string;
  ownerId: number;
  ownerFullName: string;
  landmark: string;
  lastModifiedOn: Date;
  lastModifiedBy: number;
  lastModifiedByFullName: string;
  isActive: boolean;
}

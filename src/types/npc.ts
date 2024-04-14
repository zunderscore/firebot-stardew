export enum NPCType {
    Unknown,
    Villager,
    Pet,
    Horse,
    Child,
    Junimo
}

export enum FriendshipStatus
    {
    Friendly,
    Dating,
    Engaged,
    Married,
    Divorced
}

export type NPCStub = {
    name: string;
    type: NPCType;
};

export type NPCInfo = {
    name: string;
    displayName: string;
    age: number;
    currentLocation: string;
    type: NPCType;
};

export type VillagerInfo = NPCInfo & {
    type: NPCType.Villager;
    id: string;
    birthdaySeason: string;
    birthdayDay: number;
    gender: string;
    friendshipStatus?: FriendshipStatus
};

export type PetInfo = NPCInfo & {
    type: NPCType.Villager;
    petId: string;
    petType: string;
    timesPet: number;
};
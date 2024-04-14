import { Date } from "./info";
import { BasicItem } from "./item";
import { NPCStub } from "./npc";

export type BasicSkill = {
    id: number;
    name: string;
    level: number;
    professions: {
        id: number;
        name: string;
        description: string;
    }[]
};

export type Relationship = {
    npc: NPCStub;
    points: number;
    hearts: number;
    hasBeenGivenGiftToday: boolean;
    giftsGivenToday: number;
    giftsGivenThisWeek: number;
    lastGiftDate: Date;
    isDating: boolean;
    isEngaged: boolean;
    isMarried: boolean;
    isRoommate: boolean;
    isDivorced: boolean;
};

export type PlayerInfo = {
    name: string;
    displayName: string;
    farmName: string;
    money: number;
    stamina: number;
    maxStamina: number;
    health: number;
    maxHealth: number;
    location: string;
    dailyLuck: number;
    dailyLuckFriendlyValue: string;
    dailyLuckDescription: string;
    clothing: {
        hat: BasicItem;
        shirt: BasicItem;
        pants: BasicItem;
        boots: BasicItem;
        rightRing: BasicItem;
        leftRing: BasicItem;
    };
    skills: BasicSkill[];
    relationships: Relationship[]
};
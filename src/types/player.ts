import { BasicItem } from "./item";
import { NPCStub } from "./npc";
import { Achievement } from "./raw-data";
import { Date } from "./world";

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

export type Quest = {
    title: string;
    description: string;
    hasReward: boolean;
    rewardDescription?: string | undefined;
    hasMoneyReward: boolean;
    moneyReward?: number | undefined;
    currentObjective: string;
    isTimedQuest: boolean;
    daysLeft?: number | undefined;
};

export type PlayerAchievement = Achievement & {
    hasPlayerUnlocked: boolean;
    canPlayerSeeDetails: boolean;
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
    quests: Quest[];
    achievements: PlayerAchievement[];
    relationships: Relationship[];
};
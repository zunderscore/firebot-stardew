import { BasicItem } from "./item";

export type Achievement = {
    id: number;
    rawAchievementData: string;
    name: string;
    description: string;
    showIfPrerequisiteMet: boolean;
    hasPrerequisiteAchievement: boolean;
    prerequisiteAchievement?: number | undefined;
    reward?: BasicItem | undefined;
}
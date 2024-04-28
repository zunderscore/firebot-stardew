import { NPCStub } from "./npc";

export type Date = {
    season: string;
    day: number;
    year: number;
    dayOfWeek: string;
    shortDayOfWeek: string;
};

export type DayInfo = {
    date: Date;
    weather: string;
    festival?: string | undefined;
    birthdays: NPCStub[];
};

export type WorldInfo = Partial<{
    today: DayInfo;
    farmName: string;
    currentMusicTrack?: string | undefined;
}>;
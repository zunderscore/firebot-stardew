import { BasicItem } from "./item";
import { NPCStub } from "./npc";
import { DayInfo } from "./world";

export interface SaveLoadedEvent {
    event: "SaveLoaded";
    data: {
        farmName: string;
        playerName: string;
    };
}

export interface SavedEvent {
    event: "Saved";
    data: {
        farmName: string;
        playerName: string;
    }
}

export interface ReturnedToTitleEvent {
    event: "ReturnedToTitle";
    data: never;
}

export interface DayStartedEvent {
    event: "DayStarted";
    data: DayInfo;
}

export interface DayEndingEvent{
    event: "DayEnding";
    data: DayInfo;
}

export interface TimeChangedEvent {
    event: "TimeChanged";
    data: {
        oldTime: number;
        newTime: number;
    }
}

export type PlayerInventoryStackSizeChange = {
    item: BasicItem;
    oldSize: number;
    newSize: number;
};

export interface PlayerInventoryChangedEvent {
    event: "PlayerInventoryChanged";
    data: {
        playerName: string;
        added: BasicItem[];
        removed: BasicItem[];
        quantityChanged: PlayerInventoryStackSizeChange[]
    }
}

export interface PlayerLevelChangedEvent {
    event: "PlayerLevelChanged";
    data: {
        playerName: string;
        skill: string;
        oldLevel: number;
        newLevel: number;
    }
}

export interface PlayerWarpedEvent {
    event: "PlayerWarped",
    data: {
        playerName: string;
        oldLocation: string;
        newLocation: string;
    }
}

export interface FestivalStartedEvent {
    event: "FestivalStarted";
    data: {
        festivalName: string;
    }
}

export interface FestivalEndedEvent {
    event: "FestivalEnded";
    data: {
        festivalName: string;
    }
}

export type RelationshipChangedEventData = {
    npc: NPCStub;
    previousPoints: number;
    newPoints: number;
    previousHearts: number;
    newHearts: number;
};

export interface FriendshipIncreasedEvent {
    event: "FriendshipIncreased";
    data: RelationshipChangedEventData;
}

export interface MultipleFriendshipsIncreasedEvent {
    event: "MultipleFriendshipsIncreased";
    data: RelationshipChangedEventData[];
}

export interface FriendshipDecreasedEvent {
    event: "FriendshipDecreased";
    data: RelationshipChangedEventData;
}

export interface MultipleFriendshipsDecreasedEvent {
    event: "MultipleFriendshipsDecreased";
    data: RelationshipChangedEventData[];
}

export interface PlayerStartedDatingEvent {
    event: "PlayerStartedDating",
    data: {
        npc: NPCStub;
    }
}

export interface PlayerEngagedEvent {
    event: "PlayerEngaged",
    data: {
        npc: NPCStub;
    }
}

export interface PlayerMarriedEvent {
    event: "PlayerMarried",
    data: {
        npc: NPCStub;
        isRoommate: boolean;
    }
}

export interface PlayerDivorcedEvent {
    event: "PlayerDivorced",
    data: {
        npc: NPCStub;
        wasRoommate: boolean;
    }
}

export interface UnknownGameEvent {
    event: string;
    data?: unknown;
}

export type GameEvent =
| SaveLoadedEvent
| SavedEvent
| ReturnedToTitleEvent
| DayStartedEvent
| DayEndingEvent
| TimeChangedEvent
| PlayerInventoryChangedEvent
| PlayerLevelChangedEvent
| PlayerWarpedEvent
| FestivalStartedEvent
| FestivalEndedEvent
| FriendshipIncreasedEvent
| MultipleFriendshipsIncreasedEvent
| FriendshipDecreasedEvent
| MultipleFriendshipsDecreasedEvent
| PlayerStartedDatingEvent
| PlayerEngagedEvent
| PlayerMarriedEvent
| PlayerDivorcedEvent;

export type ActionResult = {
    success: boolean;
    data?: unknown;
};
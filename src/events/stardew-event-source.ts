import { EventSource } from "@crowbartools/firebot-custom-scripts-types/types/modules/event-manager";
import {
    STARDEW_EVENT_SOURCE_ID,
    STARDEW_SAVE_LOADED_EVENT_ID,
    STARDEW_SAVED_EVENT_ID,
    STARDEW_RETURNED_TO_TITLE_EVENT_ID,
    STARDEW_DAY_STARTED_EVENT_ID,
    STARDEW_TIME_CHANGED_EVENT_ID,
    STARDEW_DAY_ENDING_EVENT_ID,
    STARDEW_PLAYER_INVENTORY_CHANGED_EVENT_ID,
    STARDEW_PLAYER_LEVEL_CHANGED_EVENT_ID,
    STARDEW_PLAYER_WARPED_EVENT_ID,
    STARDEW_FESTIVAL_STARTED_EVENT_ID,
    STARDEW_FESTIVAL_ENDED_EVENT_ID,
    STARDEW_FRIENDSHIP_INCREASED_EVENT_ID,
    STARDEW_MULTIPLE_FRIENDSHIPS_INCREASED_EVENT_ID,
    STARDEW_FRIENDSHIP_DECREASED_EVENT_ID,
    STARDEW_MULTIPLE_FRIENDSHIPS_DECREASED_EVENT_ID,
    STARDEW_PLAYER_STARTED_DATING_EVENT_ID,
    STARDEW_PLAYER_ENGAGED_EVENT_ID,
    STARDEW_PLAYER_MARRIED_EVENT_ID,
    STARDEW_PLAYER_DIVORCED_EVENT_ID
} from "../constants";

export const StardewEventSource: EventSource = {
    id: STARDEW_EVENT_SOURCE_ID,
    name: "Stardew Valley",
    events: [
        {
            id: STARDEW_SAVE_LOADED_EVENT_ID,
            name: "Save Loaded",
            description: "When a Stardew Valley save file is loaded"
        },
        {
            id: STARDEW_SAVED_EVENT_ID,
            name: "Saved",
            description: "When the game is saved"
        },
        {
            id: STARDEW_RETURNED_TO_TITLE_EVENT_ID,
            name: "Returned to Title Screen",
            description: "When the player returns to the title screen"
        },
        {
            id: STARDEW_DAY_STARTED_EVENT_ID,
            name: "Day Started",
            description: "When a new day starts"
        },
        {
            id: STARDEW_TIME_CHANGED_EVENT_ID,
            name: "Time Changed",
            description: "When the in-game clock advances by 10 minutes"
        },
        {
            id: STARDEW_DAY_ENDING_EVENT_ID,
            name: "Day Ending",
            description: "When the current day is ending, like after the player goes to bed"
        },
        {
            id: STARDEW_PLAYER_INVENTORY_CHANGED_EVENT_ID,
            name: "Player Inventory Changed",
            description: "When the player's inventory changes in any way"
        },
        {
            id: STARDEW_PLAYER_LEVEL_CHANGED_EVENT_ID,
            name: "Player Level Changed",
            description: "When one of the player's skill levels change"
        },
        {
            id: STARDEW_PLAYER_WARPED_EVENT_ID,
            name: "Player Warped",
            description: "When the player enters or is warped to a different map location"
        },
        {
            id: STARDEW_FESTIVAL_STARTED_EVENT_ID,
            name: "Festival Started",
            description: "When a festival event starts"
        },
        {
            id: STARDEW_FESTIVAL_ENDED_EVENT_ID,
            name: "Festival Ended",
            description: "When a festival event ends"
        },
        {
            id: STARDEW_FRIENDSHIP_INCREASED_EVENT_ID,
            name: "Friendship Increased",
            description: "When the player's friendship with an NPC increases"
        },
        {
            id: STARDEW_MULTIPLE_FRIENDSHIPS_INCREASED_EVENT_ID,
            name: "Multiple Friendships Increased",
            description: "When the player's friendship with multiple NPCs increases"
        },
        {
            id: STARDEW_FRIENDSHIP_DECREASED_EVENT_ID,
            name: "Friendship Decreased",
            description: "When the player's friendship with an NPC decreases"
        },
        {
            id: STARDEW_MULTIPLE_FRIENDSHIPS_DECREASED_EVENT_ID,
            name: "Multiple Friendships Decreased",
            description: "When the player's friendship with multiple NPCs decreases"
        },
        {
            id: STARDEW_PLAYER_STARTED_DATING_EVENT_ID,
            name: "Player Started Dating",
            description: "When the player starts dating an NPC"
        },
        {
            id: STARDEW_PLAYER_ENGAGED_EVENT_ID,
            name: "Player Engaged",
            description: "When the player gets engaged to an NPC"
        },
        {
            id: STARDEW_PLAYER_MARRIED_EVENT_ID,
            name: "Player Married",
            description: "When the player gets married to an NPC"
        },
        {
            id: STARDEW_PLAYER_DIVORCED_EVENT_ID,
            name: "Player Divorced",
            description: "When the player divorces an NPC"
        }
    ]
};
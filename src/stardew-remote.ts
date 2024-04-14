import { ScriptModules } from "@crowbartools/firebot-custom-scripts-types/types";
import axios from "axios";
import { WebSocket } from "ws";

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
} from "./constants";

import { GameEvent, ActionResult } from "./types/events";
import { WorldInfo } from "./types/info";
import { NPCStub, NPCInfo, PetInfo } from "./types/npc";
import { PlayerInfo } from "./types/player";


let logger: ScriptModules["logger"];
let eventManager: ScriptModules["eventManager"];

let ipAddress: string;
let port: number;
const logging = true;
let socket: WebSocket;

function setupRemoteListeners() {
    socket.on("message", (data) => {
        const message = JSON.parse(data.toString()) as GameEvent;

        if (message.event != null) {
            switch (message.event) {
                case "SaveLoaded":
                    eventManager.triggerEvent(
                        STARDEW_EVENT_SOURCE_ID,
                        STARDEW_SAVE_LOADED_EVENT_ID,
                        {
                            farmName: message.data.farmName,
                            playerName: message.data.playerName
                        }
                    );
                    break;

                case "Saved":
                    eventManager.triggerEvent(
                        STARDEW_EVENT_SOURCE_ID,
                        STARDEW_SAVED_EVENT_ID,
                        {
                            farmName: message.data.farmName,
                            playerName: message.data.playerName
                        }
                    );
                    break;

                case "ReturnedToTitle":
                    eventManager.triggerEvent(
                        STARDEW_EVENT_SOURCE_ID,
                        STARDEW_RETURNED_TO_TITLE_EVENT_ID,
                        { }
                    );
                    break;

                case "DayStarted":
                    eventManager.triggerEvent(
                        STARDEW_EVENT_SOURCE_ID,
                        STARDEW_DAY_STARTED_EVENT_ID,
                        {
                            season: message.data.date.season,
                            day: message.data.date.day,
                            year: message.data.date.year,
                            dayOfWeek: message.data.date.dayOfWeek,
                            shortDayOfWeek: message.data.date.shortDayOfWeek,
                            weather: message.data.weather
                        }
                    );
                    break;

                case "DayEnding":
                    eventManager.triggerEvent(
                        STARDEW_EVENT_SOURCE_ID,
                        STARDEW_DAY_ENDING_EVENT_ID,
                        {
                            season: message.data.date.season,
                            day: message.data.date.day,
                            year: message.data.date.year,
                            dayOfWeek: message.data.date.dayOfWeek,
                            shortDayOfWeek: message.data.date.shortDayOfWeek,
                            weather: message.data.weather
                        }
                    );
                    break;

                case "TimeChanged":
                    eventManager.triggerEvent(
                        STARDEW_EVENT_SOURCE_ID,
                        STARDEW_TIME_CHANGED_EVENT_ID,
                        {
                            oldTime: message.data.oldTime,
                            newTime: message.data.newTime
                        }
                    );
                    break;

                case "PlayerInventoryChanged":
                    eventManager.triggerEvent(
                        STARDEW_EVENT_SOURCE_ID,
                        STARDEW_PLAYER_INVENTORY_CHANGED_EVENT_ID,
                        {
                            playerName: message.data.playerName,
                            added: message.data.added,
                            removed: message.data.removed,
                            quantityChanged: message.data.quantityChanged
                        }
                    );
                    break;

                case "PlayerLevelChanged":
                    eventManager.triggerEvent(
                        STARDEW_EVENT_SOURCE_ID,
                        STARDEW_PLAYER_LEVEL_CHANGED_EVENT_ID,
                        {
                            playerName: message.data.playerName,
                            skill: message.data.skill,
                            oldLevel: message.data.oldLevel,
                            newLevel: message.data.newLevel
                        }
                    );
                    break;

                case "PlayerWarped":
                    eventManager.triggerEvent(
                        STARDEW_EVENT_SOURCE_ID,
                        STARDEW_PLAYER_WARPED_EVENT_ID,
                        {
                            playerName: message.data.playerName,
                            oldLocation: message.data.oldLocation,
                            newLocation: message.data.newLocation
                        }
                    );
                    break;

                case "FestivalStarted":
                    eventManager.triggerEvent(
                        STARDEW_EVENT_SOURCE_ID,
                        STARDEW_FESTIVAL_STARTED_EVENT_ID,
                        {
                            festivalName: message.data.festivalName
                        }
                    );
                    break;

                case "FestivalEnded":
                    eventManager.triggerEvent(
                        STARDEW_EVENT_SOURCE_ID,
                        STARDEW_FESTIVAL_ENDED_EVENT_ID,
                        {
                            festivalName: message.data.festivalName
                        }
                    );
                    break;

                case "FriendshipIncreased":
                    eventManager.triggerEvent(
                        STARDEW_EVENT_SOURCE_ID,
                        STARDEW_FRIENDSHIP_INCREASED_EVENT_ID,
                        {
                            npcName: message.data.npc.name,
                            previousPoints: message.data.previousPoints,
                            newPoints: message.data.newPoints,
                            previousHearts: message.data.previousHearts,
                            newHearts: message.data.newHearts
                        }
                    );
                    break;

                case "MultipleFriendshipsIncreased":
                    eventManager.triggerEvent(
                        STARDEW_EVENT_SOURCE_ID,
                        STARDEW_MULTIPLE_FRIENDSHIPS_INCREASED_EVENT_ID,
                        {
                            friendships: message.data.map((f) => {
                                return {
                                    npcName: f.npc.name,
                                    previousPoints: f.previousPoints,
                                    newPoints: f.newPoints,
                                    previousHearts: f.previousHearts,
                                    newHearts: f.newHearts
                                };
                            })
                        }
                    );
                    break;

                case "FriendshipDecreased":
                    eventManager.triggerEvent(
                        STARDEW_EVENT_SOURCE_ID,
                        STARDEW_FRIENDSHIP_DECREASED_EVENT_ID,
                        {
                            npcName: message.data.npc.name,
                            previousPoints: message.data.previousPoints,
                            newPoints: message.data.newPoints,
                            previousHearts: message.data.previousHearts,
                            newHearts: message.data.newHearts
                        }
                    );
                    break;

                case "MultipleFriendshipsDecreased":
                    eventManager.triggerEvent(
                        STARDEW_EVENT_SOURCE_ID,
                        STARDEW_MULTIPLE_FRIENDSHIPS_DECREASED_EVENT_ID,
                        {
                            friendships: message.data.map((f) => {
                                return {
                                    npcName: f.npc.name,
                                    previousPoints: f.previousPoints,
                                    newPoints: f.newPoints,
                                    previousHearts: f.previousHearts,
                                    newHearts: f.newHearts
                                };
                            })
                        }
                    );
                    break;

                case "PlayerStartedDating":
                    eventManager.triggerEvent(
                        STARDEW_EVENT_SOURCE_ID,
                        STARDEW_PLAYER_STARTED_DATING_EVENT_ID,
                        {
                            npcName: message.data.npc.name
                        }
                    );
                    break;

                case "PlayerEngaged":
                    eventManager.triggerEvent(
                        STARDEW_EVENT_SOURCE_ID,
                        STARDEW_PLAYER_ENGAGED_EVENT_ID,
                        {
                            npcName: message.data.npc.name
                        }
                    );
                    break;

                case "PlayerMarried":
                    eventManager.triggerEvent(
                        STARDEW_EVENT_SOURCE_ID,
                        STARDEW_PLAYER_MARRIED_EVENT_ID,
                        {
                            npcName: message.data.npc.name,
                            isRoommate: message.data.isRoommate
                        }
                    );
                    break;

                case "PlayerDivorced":
                    eventManager.triggerEvent(
                        STARDEW_EVENT_SOURCE_ID,
                        STARDEW_PLAYER_DIVORCED_EVENT_ID,
                        {
                            npcName: message.data.npc.name,
                            wasRoommate: message.data.wasRoommate
                        }
                    );
                    break;

                default:
                    break;
            }
        }
    });
}

let connected = false;
let isForceClosing = false;
let reconnectTimeout: NodeJS.Timeout | null = null;

function maintainConnection(forceClose = false) {
    if (forceClose && connected) {
        isForceClosing = true;
        socket.close();
        connected = false;
        isForceClosing = false;
    }

    if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
        reconnectTimeout = null;
    }

    if (!connected) {
        try {
            if (logging) {
                logger.debug("Trying to connect to Stardew event monitor...");
            }

            socket = new WebSocket(`ws://${ipAddress}:${port}/events`);

            socket.on("error", (err) => {
                if (logging) {
                    logger.debug("Error with Stardew WebSocket connection", err.message);
                }

                reconnectTimeout = setTimeout(
                    () => maintainConnection(),
                    10000
                );
            });

            socket.on("open", () => {
                logger.info("Successfully connected to Stardew event monitor.");

                connected = true;

                setupRemoteListeners();

                socket.on("close", () => {
                    if (!connected) {
                        return;
                    }
                    connected = false;
                    if (isForceClosing) {
                        return;
                    }
                    try {
                        logger.info("Stardew event monitor connection lost, attempting again in 10 secs.");
                        reconnectTimeout = setTimeout(
                            () => maintainConnection(),
                            10000
                        );
                    } catch (err) {
                        // silently fail
                    }
                });
            });
        } catch (error) {
            if (logging) {
                logger.debug("Failed to connect to Stardew event monitor, attempting again in 10 secs.");
                logger.debug(error);
            }

            reconnectTimeout = setTimeout(
                () => maintainConnection(),
                10000
            );
        }
    }
}

export function initRemote(config: {
    ipAddress: string,
    port: number,
    forceConnect?: boolean
}, modules: {
    logger: ScriptModules["logger"],
    eventManager: ScriptModules["eventManager"]
}) {
    ipAddress = config.ipAddress;
    port = config.port;
    logger = modules.logger;
    eventManager = modules.eventManager;

    maintainConnection(config.forceConnect);
}

function getUrl(path: string): string {
    return `http://${ipAddress}:${port}${path}`;
}

export async function getPlayerInfo(): Promise<PlayerInfo> {
    try {
        return (await axios.get<PlayerInfo>(getUrl("/info/player"))).data;
    } catch (error) {
        logger.error("Error getting Stardew player info", error.message);
    }

    return null;
}

export async function getWorldInfo(): Promise<WorldInfo> {
    try {
        return (await axios.get<WorldInfo>(getUrl("/info/world"))).data;
    } catch (error) {
        logger.error("Error getting Stardew world info", error.message);
    }

    return null;
}

export async function showHUDMessage(message: string, type = 0): Promise<ActionResult> {
    try {
        return (await axios.get<ActionResult>(getUrl(`/ui/showHudMessage?message=${message}&type=${type}`))).data;
    } catch (error) {
        logger.error("Error showing Stardew HUD message", error.message);
    }
}

export async function showHUDMessageForItemName(message: string, itemName: string): Promise<ActionResult> {
    try {
        return (await axios.get<ActionResult>(getUrl(`/ui/showHudMessage/item?message=${message}&itemName=${itemName}`))).data;
    } catch (error) {
        logger.error("Error showing Stardew HUD item message", error.message);
    }
}

export async function showLargeHUDMessage(message: string): Promise<ActionResult> {
    try {
        return (await axios.get<ActionResult>(getUrl(`/ui/showHudMessage/large?message=${message}`))).data;
    } catch (error) {
        logger.error("Error showing Stardew large HUD message", error.message);
    }
}

export async function showChatMessage(message: string, type = 0): Promise<ActionResult> {
    try {
        return (await axios.get<ActionResult>(getUrl(`/ui/showChatMessage?message=${message}&type=${type}`))).data;
    } catch (error) {
        logger.error("Error showing Stardew chat message", error.message);
    }
}


export async function refillEnergy(): Promise<ActionResult> {
    try {
        return (await axios.get<ActionResult>(getUrl(`/action/refillEnergy`))).data;
    } catch (error) {
        logger.error("Error refilling Stardew player energy", error.message);
    }
}

export async function passOut(): Promise<ActionResult> {
    try {
        return (await axios.get<ActionResult>(getUrl(`/action/passOut`))).data;
    } catch (error) {
        logger.error("Error causing Stardew player to pass out", error.message);
    }
}

export async function fullyHeal(): Promise<ActionResult> {
    try {
        return (await axios.get<ActionResult>(getUrl(`/action/fullyHeal`))).data;
    } catch (error) {
        logger.error("Error refilling Stardew player health", error.message);
    }
}

export async function knockOut(): Promise<ActionResult> {
    try {
        return (await axios.get<ActionResult>(getUrl(`/action/knockOut`))).data;
    } catch (error) {
        logger.error("Error knocking Stardew player out", error.message);
    }
}

export async function giveMoney(amount: number): Promise<ActionResult> {
    try {
        return (await axios.get<ActionResult>(getUrl(`/action/giveMoney?amount=${amount}`))).data;
    } catch (error) {
        logger.error("Error giving/taking Stardew player money", error.message);
    }
}

export async function giveItem(itemName: string, amount: number, quality: number): Promise<ActionResult> {
    try {
        return (await axios.get<ActionResult>(getUrl(`/action/giveMoney?itemName=${itemName}&amount=${amount}&quality=${quality}`))).data;
    } catch (error) {
        logger.error("Error giving Stardew player item", error.message);
    }
}

export async function warpPlayer(location: string): Promise<ActionResult> {
    try {
        return (await axios.get<ActionResult>(getUrl(`/action/warpPlayer?location=${location}`))).data;
    } catch (error) {
        logger.error("Error warping Stardew player", error.message);
    }
}

export async function petFarmAnimal(name: string): Promise<ActionResult> {
    try {
        return (await axios.get<ActionResult>(getUrl(`/action/petFarmAnimal?name=${name}`))).data;
    } catch (error) {
        logger.error("Error petting Stardew farm animal", error.message);
    }
}

export async function getAllNPCs(): Promise<NPCStub[]> {
    try {
        return (await axios.get<NPCStub[]>(getUrl("/npcs"))).data;
    } catch (error) {
        logger.error("Error getting list of Stardew NPCs", error.message);
    }
}

export async function getNPCByName(name: string): Promise<NPCInfo> {
    try {
        return (await axios.get<NPCInfo>(getUrl(`/npcs/name?name=${name}`))).data;
    } catch (error) {
        logger.error("Error getting Stardew NPC by name", error.message);
    }
}

export async function getAllPets(): Promise<PetInfo[]> {
    try {
        return (await axios.get<PetInfo[]>(getUrl("/npcs/pets"))).data;
    } catch (error) {
        logger.error("Error getting list of Stardew pets", error.message);
    }
}
import {
    Firebot,
    Integration,
    IntegrationController,
    IntegrationData,
    IntegrationEvents,
    ScriptModules
} from "@crowbartools/firebot-custom-scripts-types";
import { TypedEmitter } from "tiny-typed-emitter";

import { STARDEW_EVENT_SOURCE_ID } from "./constants";
import { initRemote } from "./stardew-remote";

import { StardewEventSource } from "./events/stardew-event-source";

import { SeasonVariable } from "./variables/season";
import { DayVariable } from "./variables/day";
import { DayOfWeekVariable } from "./variables/day-of-week";
import { ShortDayOfWeekVariable } from "./variables/short-day-of-week";
import { YearVariable } from "./variables/year";
import { PreviousTimeVariable } from "./variables/previous-time";
import { PreviousTimeNumericVariable } from "./variables/previous-time-numeric";
import { NewTimeVariable } from "./variables/new-time";
import { NewTimeNumericVariable } from "./variables/new-time-numeric";
import { WeatherVariable } from "./variables/weather";
import { FarmNameVariable } from "./variables/farm-name";
import { PlayerNameVariable } from "./variables/player-name";
import { PlayerSkillLevelVariable } from "./variables/skill-level";
import { PlayerPreviousSkillLevelVariable } from "./variables/previous-skill-level";
import { PlayerLocationVariable } from "./variables/location";
import { PlayerPreviousLocationVariable } from "./variables/previous-location";
import { NpcNameVariable } from "./variables/npc-name";
import { FestivalNameVariable } from "./variables/festival-name";
import { HeartsVariable } from "./variables/hearts";
import { FriendshipPointsVariable } from "./variables/friendship-points";
import { PreviousHeartsVariable } from "./variables/previous-hearts";
import { PreviousFriendshipPointsVariable } from "./variables/previous-friendship-points";

import { ShowUiMessageEffectType } from "./effects/show-ui-message";
import { RefillEnergyEffectType } from "./effects/refill-energy";
import { PassOutEffectType } from "./effects/pass-out";
import { FullyHealEffectType } from "./effects/fully-heal";
import { KnockOutEffectType } from "./effects/knock-out";
import { GiveMoneyEffectType } from "./effects/give-money";
import { GiveItemEffectType } from "./effects/give-item";
import { WarpPlayerEffectType } from "./effects/warp-player";
import { PetFarmAnimalEffectType } from "./effects/pet-farm-animal";
import { PlaySoundEffectType } from "./effects/play-sound";
import { PlayMusicTrackEffectType } from "./effects/play-music-track";
import { StopMusicTrackEffectType } from "./effects/stop-music-track";

const packageInfo = require("../package.json");

let logger: ScriptModules["logger"];
let eventManager: ScriptModules["eventManager"];

type StardewApiSettings = {
    connectionSettings: {
        ipAddress: string;
        port: number;
    }
}

class IntegrationEventEmitter extends TypedEmitter<IntegrationEvents> {}

class StardewValleyIntegration
    extends IntegrationEventEmitter
    implements IntegrationController<StardewApiSettings> {
    connected = false;

    constructor() {
        super();
        this.connected = false;

    }

    private setupConnection(settings?: StardewApiSettings) {
        if (!settings) {
            return;
        }
        const { connectionSettings: { ipAddress, port } } = settings;
        initRemote(
            {
                ipAddress,
                port,
                forceConnect: true
            }, {
                logger,
                eventManager
            }
        );
    }

    init(linked: boolean, integrationData: IntegrationData<StardewApiSettings>): void | PromiseLike<void> {
        this.setupConnection(integrationData.userSettings);
    }

    onUserSettingsUpdate(integrationData: IntegrationData<StardewApiSettings>): void | PromiseLike<void> {
        this.setupConnection(integrationData.userSettings);
    }
}

const integrationConfig: Integration<StardewApiSettings> = {
    definition: {
        id: STARDEW_EVENT_SOURCE_ID,
        name: "Stardew Valley",
        description: "Connect to Stardew Valley to get game data, receive events, and perform actions. Requires Stardew Valley 1.6+ with the Stardew Web API mod.",
        linkType: "none",
        configurable: true,
        connectionToggle: false,
        settingCategories: {
            connectionSettings: {
                title: "Connection Settings",
                sortRank: 1,
                settings: {
                    ipAddress: {
                        title: "IP Address",
                        description: "The IP address of the computer running Stardew Valley. Use 'localhost' for the same computer.",
                        type: "string",
                        default: "localhost"
                    },
                    port: {
                        title: "Port",
                        description: "Port the Stardew Web API mod is running on. Default is 7882.",
                        type: "number",
                        default: 7882
                    }
                }
            }
        }
    },
    integration: new StardewValleyIntegration()
};

const script: Firebot.CustomScript = {
    getScriptManifest: () => {
        return {
            name: "Stardew Valley Interaction",
            description: packageInfo.description,
            author: packageInfo.author,
            version: packageInfo.version,
            firebotVersion: "5"
        };
    },
    getDefaultParameters: () => ({ }),
    run: ({ modules }) => {
        ({ logger, eventManager } = modules);
        const { replaceVariableManager, effectManager, integrationManager } = modules;

        logger.info(`Loading Stardew Valley integration...`);

        integrationManager.registerIntegration(integrationConfig);

        eventManager.registerEventSource(StardewEventSource);

        replaceVariableManager.registerReplaceVariable(SeasonVariable);
        replaceVariableManager.registerReplaceVariable(DayVariable);
        replaceVariableManager.registerReplaceVariable(DayOfWeekVariable);
        replaceVariableManager.registerReplaceVariable(ShortDayOfWeekVariable);
        replaceVariableManager.registerReplaceVariable(YearVariable);
        replaceVariableManager.registerReplaceVariable(PreviousTimeVariable);
        replaceVariableManager.registerReplaceVariable(PreviousTimeNumericVariable);
        replaceVariableManager.registerReplaceVariable(NewTimeVariable);
        replaceVariableManager.registerReplaceVariable(NewTimeNumericVariable);
        replaceVariableManager.registerReplaceVariable(WeatherVariable);
        replaceVariableManager.registerReplaceVariable(FarmNameVariable);
        replaceVariableManager.registerReplaceVariable(PlayerNameVariable);
        replaceVariableManager.registerReplaceVariable(PlayerSkillLevelVariable);
        replaceVariableManager.registerReplaceVariable(PlayerPreviousSkillLevelVariable);
        replaceVariableManager.registerReplaceVariable(PlayerLocationVariable);
        replaceVariableManager.registerReplaceVariable(PlayerPreviousLocationVariable);
        replaceVariableManager.registerReplaceVariable(NpcNameVariable);
        replaceVariableManager.registerReplaceVariable(FestivalNameVariable);
        replaceVariableManager.registerReplaceVariable(HeartsVariable);
        replaceVariableManager.registerReplaceVariable(FriendshipPointsVariable);
        replaceVariableManager.registerReplaceVariable(PreviousHeartsVariable);
        replaceVariableManager.registerReplaceVariable(PreviousFriendshipPointsVariable);

        effectManager.registerEffect(ShowUiMessageEffectType);
        effectManager.registerEffect(RefillEnergyEffectType);
        effectManager.registerEffect(PassOutEffectType);
        effectManager.registerEffect(FullyHealEffectType);
        effectManager.registerEffect(KnockOutEffectType);
        effectManager.registerEffect(GiveMoneyEffectType);
        effectManager.registerEffect(GiveItemEffectType);
        effectManager.registerEffect(WarpPlayerEffectType);
        effectManager.registerEffect(PetFarmAnimalEffectType);
        effectManager.registerEffect(PlaySoundEffectType);
        effectManager.registerEffect(PlayMusicTrackEffectType);
        effectManager.registerEffect(StopMusicTrackEffectType);

        logger.info("Stardew Valley integration loaded");
    },
    stop: () => {
        logger.info("Unloading Stardew Valley integration...");

        logger.info("Stardew Valley integration unloaded");
    }
};

export default script;

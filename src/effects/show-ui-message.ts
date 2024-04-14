import { Effects } from "@crowbartools/firebot-custom-scripts-types/types/effects";
import {
    showChatMessage,
    showHUDMessage,
    showHUDMessageForItemName,
    showLargeHUDMessage
} from "../stardew-remote";
import { ActionResult } from "../types/events";

export const ShowUiMessageEffectType: Effects.EffectType<{
    messageType: string,
    message: string,
    hudMessageType: number,
    itemName: string,
    chatMessageType: number
}> = {
    definition: {
        id: "stardew:show-ui-message",
        name: "Stardew Valley: Show UI Message",
        description: "Displays a message in game.",
        icon: "fad fa-comment-alt-exclamation",
        categories: ["fun", "integrations"]
    },
    optionsTemplate: `
        <eos-container header="Type">
            <firebot-select
                placeholder="Select a message type"
                options="{ hudMessage: 'HUD Message', largeHudMessage: 'Large HUD Message', itemHudMessage: 'Item Message', chatMessage: 'Chat Message' }"
                selected="effect.messageType"
            />
        </eos-container>

        <eos-container header="Message" pad-top="true">
            <firebot-input
                model="effect.message"
                placeholder-text="Enter message"
            />
        </eos-container>

        <eos-container header="HUD Message Icon" pad-top="true" ng-if="effect.messageType == 'hudMessage'">
            <firebot-select
                placeholder="Select a HUD message icon type"
                options="{ 1: 'Achievement', 2: 'New Quest', 3: 'Error', 4: 'Stamina', 5: 'Health', 6: 'Screenshot' }"
                selected="effect.hudMessageType"
            />
        </eos-container>

        <eos-container header="Item" pad-top="true" ng-if="effect.messageType == 'itemHudMessage'">
            <firebot-input
                model="effect.itemName"
                input-title="Item Name"
                placeholder-text="Enter item name"
            />
        </eos-container>

        <eos-container header="Chat Message Type" pad-top="true" ng-if="effect.messageType == 'chatMessage'">
            <firebot-select
                placeholder="Select a HUD message icon type"
                options="{ 0: 'None', 1: 'Info', 2: 'Error' }"
                selected="effect.chatMessageType"
            />
        </eos-container>

        <eos-container>
            <div class="effect-info alert alert-warning">
                <b>Warning!</b> This will only work if Stardew Valley is running with the Stardew Web API mod.
            </div>
        </eos-container>
    `,
    optionsController: () => {},
    optionsValidator: (effect) => {
        const errors: string[] = [];

        if (!effect.message?.length) {
            errors.push("You must enter a message");
        }

        return errors;
    },
    onTriggerEvent: async (event) => {
        let result: ActionResult;
        switch (event.effect.messageType) {
            case "largeHudMessage":
                result = await showLargeHUDMessage(event.effect.message);
                break;

            case "itemHudMessage":
                result = await showHUDMessageForItemName(event.effect.message, event.effect.itemName);
                break;

            case "chatMessage":
                result = await showChatMessage(event.effect.message, event.effect.chatMessageType);
                break;

            case "hudMessage":
            default:
                result = await showHUDMessage(event.effect.message, event.effect.hudMessageType ?? 0);
                break;
        }
        return result.success ?? false;
    }
};

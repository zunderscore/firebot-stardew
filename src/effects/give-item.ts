import { Effects } from "@crowbartools/firebot-custom-scripts-types/types/effects";
import { giveItem } from "../stardew-remote";

export const GiveItemEffectType: Effects.EffectType<{
    itemName: string,
    amount: string,
    quality: string
}> = {
    definition: {
        id: "stardew:give-item",
        name: "Stardew Valley: Give Item",
        description: "Gives the player an item in Stardew Valley",
        icon: "fad fa-gift",
        categories: ["fun", "integrations"]
    },
    optionsTemplate: `
        <eos-container header="Item">
            <firebot-input
                model="effect.itemName"
                input-title="Item Name"
                placeholder-text="Enter item name"
            />
            <firebot-input
                model="effect.amount"
                input-title="Amount"
                placeholder-text="Enter amount"
            />
            <firebot-select
                placeholder="Select a quality"
                options="{ 0: 'Regular', 1: 'Silver', 2: 'Gold', 2: 'Iridium' }"
                selected="effect.quality"
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

        if (!effect.itemName?.length) {
            errors.push("You must specify an item name");
        }

        if (!effect.amount?.length) {
            errors.push("You must specify an amount");
        }

        if (!effect.quality?.length) {
            errors.push("You must select a quality");
        }

        return errors;
    },
    onTriggerEvent: async (event) => {
        const amount = parseInt(event.effect.amount);
        const quality = parseInt(event.effect.quality);

        if (Number.isNaN(amount) || amount === 0 || Number.isNaN(quality)) {
            return false;
        }

        return (await giveItem(event.effect.itemName, amount, quality)).success ?? false;
    }
};

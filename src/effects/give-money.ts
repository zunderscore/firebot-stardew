import { Effects } from "@crowbartools/firebot-custom-scripts-types/types/effects";
import { giveMoney } from "../stardew-remote";

export const GiveMoneyEffectType: Effects.EffectType<{
    amount: string
}> = {
    definition: {
        id: "stardew:give-money",
        name: "Stardew Valley: Give/Take Money",
        description: "Gives the player money in Stardew Valley. Use a negative value to take money away.",
        icon: "fad fa-coins",
        categories: ["fun", "integrations"]
    },
    optionsTemplate: `
        <eos-container header="Amount">
            <firebot-input
                model="effect.amount"
                placeholder-text="Enter amount"
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

        if (!effect.amount?.length) {
            errors.push("You must specify an amount");
        }

        return errors;
    },
    onTriggerEvent: async (event) => {
        const amount = parseInt(event.effect.amount);

        if (Number.isNaN(amount) || amount === 0) {
            return false;
        }

        return (await giveMoney(amount)).success ?? false;
    }
};

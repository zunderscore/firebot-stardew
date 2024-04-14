import { Effects } from "@crowbartools/firebot-custom-scripts-types/types/effects";
import { petFarmAnimal } from "../stardew-remote";

export const PetFarmAnimalEffectType: Effects.EffectType<{
    name: string
}> = {
    definition: {
        id: "stardew:pet-farm-animal",
        name: "Stardew Valley: Pet Farm Animal",
        description: "Pets a farm animal in Stardew Valley. This does NOT work for pets (dogs, cats, etc.).",
        icon: "fad fa-cow",
        categories: ["fun", "integrations"]
    },
    optionsTemplate: `
        <eos-container header="Animal">
            <firebot-input
                model="effect.name"
                placeholder-text="Enter farm animal name"
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

        if (!effect.name?.length) {
            errors.push("You must specify a farm animal name");
        }

        return errors;
    },
    onTriggerEvent: async (event) => {
        return (await petFarmAnimal(event.effect.name)).success ?? false;
    }
};

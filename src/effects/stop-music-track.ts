import { Effects } from "@crowbartools/firebot-custom-scripts-types/types/effects";
import { stopMusicTrack } from "../stardew-remote";

export const StopMusicTrackEffectType: Effects.EffectType<undefined> = {
    definition: {
        id: "stardew:stop-music-track",
        name: "Stardew Valley: Stop Music Track",
        description: "Stops the currently playing music track in Stardew Valley",
        icon: "fad fa-music-slash",
        categories: ["fun", "integrations"]
    },
    optionsTemplate: `
        <eos-container>
            <div class="effect-info alert alert-warning">
                <b>Warning!</b> This will only work if Stardew Valley is running with the Stardew Web API mod.
            </div>
        </eos-container>
    `,
    optionsController: () => {},
    optionsValidator: () => [],
    onTriggerEvent: async () => {
        return (await stopMusicTrack()).success ?? false;
    }
};

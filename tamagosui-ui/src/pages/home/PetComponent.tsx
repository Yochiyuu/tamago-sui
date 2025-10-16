import { useEffect, useState } from "react";
import {
  HeartIcon,
  Loader2Icon,
  BatteryIcon,
  DrumstickIcon,
  PlayIcon,
  BedIcon,
  BriefcaseIcon,
  ZapIcon,
  ChevronUpIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";

import { StatDisplay } from "./components/StatDisplay";
import { ActionButton } from "./components/ActionButton";
import { WardrobeManager } from "./components/Wardrobe";

import { useMutateCheckAndLevelUp } from "@/hooks/useMutateCheckLevel";
import { useMutateFeedPet } from "@/hooks/useMutateFeedPet";
import { useMutateLetPetSleep } from "@/hooks/useMutateLetPetSleep";
import { useMutatePlayWithPet } from "@/hooks/useMutatePlayWithPet";
import { useMutateWakeUpPet } from "@/hooks/useMutateWakeUpPet";
import { useMutateWorkForCoins } from "@/hooks/useMutateWorkForCoins";
import { useQueryGameBalance } from "@/hooks/useQueryGameBalance";

import type { PetStruct } from "@/types/Pet";

type PetDashboardProps = {
  pet: PetStruct;
};

// ✅ Komponen GlassPanel ditambahkan di sini
function GlassPanel({ className, children }: React.ComponentProps<"div">) {
  return (
    <div
      className={`
         backdrop-blur-sm rounded-2xl border border-blue-500/50
        shadow-lg shadow-blue-500/20
        relative overflow-hidden
        ${className}
      `}
      style={{
        boxShadow:
          "0 0 15px rgba(59, 130, 246, 0.4), inset 0 0 5px rgba(59, 130, 246, 0.2)",
      }}
    >
      {children}
    </div>
  );
}

export default function PetComponent({ pet }: PetDashboardProps) {
  const { data: gameBalance, isLoading: isLoadingGameBalance } =
    useQueryGameBalance();

  const [displayStats, setDisplayStats] = useState(pet.stats);

  const { mutate: mutateFeedPet, isPending: isFeeding } = useMutateFeedPet();
  const { mutate: mutatePlayWithPet, isPending: isPlaying } =
    useMutatePlayWithPet();
  const { mutate: mutateWorkForCoins, isPending: isWorking } =
    useMutateWorkForCoins();

  const { mutate: mutateLetPetSleep, isPending: isSleeping } =
    useMutateLetPetSleep();
  const { mutate: mutateWakeUpPet, isPending: isWakingUp } =
    useMutateWakeUpPet();
  const { mutate: mutateLevelUp, isPending: isLevelingUp } =
    useMutateCheckAndLevelUp();

  useEffect(() => {
    setDisplayStats(pet.stats);
  }, [pet.stats]);

  useEffect(() => {
    if (pet.isSleeping && !isWakingUp && gameBalance) {
      const intervalId = setInterval(() => {
        setDisplayStats((prev) => {
          const energyPerSecond =
            1000 / Number(gameBalance.sleep_energy_gain_ms);
          const hungerLossPerSecond =
            1000 / Number(gameBalance.sleep_hunger_loss_ms);
          const happinessLossPerSecond =
            1000 / Number(gameBalance.sleep_happiness_loss_ms);

          return {
            energy: Math.min(
              gameBalance.max_stat,
              prev.energy + energyPerSecond
            ),
            hunger: Math.max(0, prev.hunger - hungerLossPerSecond),
            happiness: Math.max(0, prev.happiness - happinessLossPerSecond),
          };
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [pet.isSleeping, isWakingUp, gameBalance]);

  if (isLoadingGameBalance || !gameBalance)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <h1 className="text-2xl text-white">Loading Game Rules...</h1>
      </div>
    );

  const isAnyActionPending = isFeeding || isPlaying || isWorking || isSleeping || isWakingUp || isLevelingUp;

  const canFeed =
    !pet.isSleeping &&
    pet.stats.hunger < gameBalance.max_stat &&
    pet.game_data.coins >= Number(gameBalance.feed_coins_cost);
  const canPlay =
    !pet.isSleeping &&
    pet.stats.energy >= gameBalance.play_energy_loss &&
    pet.stats.hunger >= gameBalance.play_hunger_loss;
  const canWork =
    !pet.isSleeping &&
    pet.stats.energy >= gameBalance.work_energy_loss &&
    pet.stats.happiness >= gameBalance.work_happiness_loss &&
    pet.stats.hunger >= gameBalance.work_hunger_loss;
  const canLevelUp =
    !pet.isSleeping &&
    pet.game_data.experience >=
      pet.game_data.level * Number(gameBalance.exp_per_level);

  return (
    <TooltipProvider>
      <div className="flex justify-center items-center min-h-screen p-8 space-x-20">
        {/* Panel Kiri: Profile */}
        <GlassPanel className="w-96 p-8 flex flex-col items-center text-center">
          <img
            src={pet.image_url}
            alt={pet.name}
            className="w-60 h-60 rounded-full border-4 border-purple-500/50 object-cover glow-effect mb-6"
            style={{ boxShadow: "0 0 25px rgba(168, 85, 247, 0.8)" }}
          />
          <h2 className="text-white text-4xl font-extrabold mb-2">
            {pet.name}
          </h2>
          <p className="text-gray-300 text-xl mb-4">
            Level {pet.game_data.level}
          </p>
          <p className="text-gray-400 text-lg leading-relaxed max-w-xs">
            A loyal companion that grows with you on your journey. Take care of{" "}
            <span className="font-semibold text-purple-400">{pet.name}</span> to
            unlock new levels, abilities, and adventures!
          </p>
        </GlassPanel>

        {/* Panel Kanan: Stats dan Actions */}
        <GlassPanel className="w-80 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-center gap-10 text-gray-300 text-sm font-semibold mb-4">
              <span>Energy</span>
              <span>Happiness</span>
              <span>Hunger</span>
            </div>

            <div className="space-y-4 mb-8">
              {/* ✅ Prop 'max' ditambahkan */}
              <StatDisplay
                icon={<BatteryIcon className="text-green-500" />}
                label="Energy"
                value={displayStats.energy}
                max={gameBalance.max_stat}
              />
              <StatDisplay
                icon={<HeartIcon className="text-pink-500" />}
                label="Happiness"
                value={displayStats.happiness}
                max={gameBalance.max_stat}
              />
              <StatDisplay
                icon={<DrumstickIcon className="text-orange-500" />}
                label="Hunger"
                value={displayStats.hunger}
                max={gameBalance.max_stat}
              />
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => mutateLevelUp({ petId: pet.id })}
                disabled={!canLevelUp || isAnyActionPending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg flex items-center justify-center transition-all duration-200"
              >
                {isLevelingUp ? (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ChevronUpIcon className="mr-2 h-4 w-4" />
                )}
                Level Up!
              </Button>

              <ActionButton
                onClick={() => mutateFeedPet({ petId: pet.id })}
                disabled={!canFeed || isAnyActionPending}
                isPending={isFeeding}
                label="Feed"
                icon={<DrumstickIcon className="w-5 h-5" />}
                className="w-full"
              />
              <ActionButton
                onClick={() => mutatePlayWithPet({ petId: pet.id })}
                disabled={!canPlay || isAnyActionPending}
                isPending={isPlaying}
                label="Play"
                icon={<PlayIcon className="w-5 h-5" />}
                className="w-full"
              />
              <ActionButton
                onClick={() => mutateWorkForCoins({ petId: pet.id })}
                disabled={!canWork || isAnyActionPending}
                isPending={isWorking}
                label="Work"
                icon={<BriefcaseIcon className="w-5 h-5" />}
                className="w-full"
              />

              {pet.isSleeping ? (
                <Button
                  onClick={() => mutateWakeUpPet({ petId: pet.id })}
                  disabled={isAnyActionPending}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 rounded-lg flex items-center justify-center transition-all duration-200"
                >
                  {isWakingUp ? (
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ZapIcon className="mr-2 h-4 w-4" />
                  )}{" "}
                  Wake Up!
                </Button>
              ) : (
                <Button
                  onClick={() => mutateLetPetSleep({ petId: pet.id })}
                  disabled={isAnyActionPending}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg flex items-center justify-center transition-all duration-200"
                >
                  {isSleeping ? (
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <BedIcon className="h-4 w-4" />
                  )}{" "}
                  Sleep
                </Button>
              )}
            </div>
          </div>

          <div className="mt-4">
            <WardrobeManager
              pet={pet}
              isAnyActionPending={isAnyActionPending}
            />
          </div>
        </GlassPanel>
      </div>
    </TooltipProvider>
  );
}
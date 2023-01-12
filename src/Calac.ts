import type { Attack } from "./SkillData"
import type { Status } from "./Status"

export const calcDamage = (attack: Attack, status: Status, monster: any): number => {
    return attack.type === "physics" ? calcDamagePhysical(attack, status, monster) : calcDamageMagical(attack, status, monster);
}

export const calcDamagePhysical = (attack: Attack, status: Status, monster: any): number => {
    const leverage = attack.power / 100;

    return Math.floor(status.offensivePower * 0.1 * leverage);
}

export const calcDamageMagical = (attack: Attack, status: Status, monster: any): number => {
    const leverage = attack.power / 100;
    return Math.floor((status.brains + 250) * 5 * leverage / 25.5) + Math.floor((status.magicalPower + 250) * leverage / 25.5)
}
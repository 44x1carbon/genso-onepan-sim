import type { Attack } from "./SkillData"
import type { Status } from "./Status"

const ELEMENT_LEVERAGE: { [key: string]: number } = {
    "": 1,
    "×": 0.54,
    "○": 1.18,
    "◎": 1.5,
    "▲": 0.75
}

const PHYSICS_LEVERAGE: { [key: string]: number } = {
    "": 1,
    "▲": 0.96
}

export const calcDamage = (attack: Attack, status: Status, monster: any): number => {
    return attack.type === "physics" ? calcDamagePhysical(attack, status, monster) : calcDamageMagical(attack, status, monster);
}

export const calcDamagePhysical = (attack: Attack, status: Status, monster: any): number => {
    const leverage = attack.power / 100;
    const elementLeverage = ELEMENT_LEVERAGE[monster[attack.element] as string] ?? 1
    const physicsLeverage = PHYSICS_LEVERAGE[monster.physics as string] ?? 1


    return Math.floor(status.offensivePower * 0.1 * leverage * elementLeverage * physicsLeverage);
}

export const calcDamageMagical = (attack: Attack, status: Status, monster: any): number => {
    const leverage = attack.power / 100;
    const elementLeverage = ELEMENT_LEVERAGE[monster[attack.element] as string] ?? 1

    return Math.floor((status.brains + 250) * 5 * leverage * elementLeverage / 25.5) + Math.floor((status.magicalPower + 250) * leverage * elementLeverage / 25.5)
}
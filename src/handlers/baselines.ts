import {AttackSpeed, Class, Rarity} from '../interfaces';

// Declare multipliers for each item rarity, using a level interval of 5
export const rarityMultipliers: {[key in Rarity]: number[]} = {
  normal: [
    1.0, 1.0, 1.0, 0.95, 0.9, 0.85, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8,
    0.8, 0.8, 0.8, 0.8, 0.8, 0.8,
  ],
  unique: [
    1.4, 1.35, 1.3, 1.25, 1.2, 1.15, 1.1, 1.05, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
  ],
  set: [
    1.6, 1.55, 1.5, 1.45, 1.4, 1.325, 1.275, 1.225, 1.15, 1.125, 1.1, 1.1, 1.1,
    1.1, 1.1, 1.1, 1.075, 1.075, 1.05, 1.05, 1.05,
  ],
  rare: [
    1.8, 1.75, 1.7, 1.65, 1.6, 1.5, 1.4, 1.325, 1.25, 1.2, 1.15, 1.15, 1.15,
    1.15, 1.15, 1.15, 1.125, 1.125, 1.1, 1.1, 1.1,
  ],
  legendary: [
    2.1, 2.05, 2.0, 1.95, 1.9, 1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.3, 1.3, 1.3, 1.3,
    1.3, 1.25, 1.25, 1.2, 1.2, 1.2,
  ],
  fabled: [
    2.3, 2.25, 2.2, 2.15, 2.1, 2.0, 1.9, 1.8, 1.7, 1.6, 1.5, 1.5, 1.5, 1.5, 1.5,
    1.5, 1.45, 1.45, 1.4, 1.4, 1.4,
  ],
  mythic: [
    2.5, 2.45, 2.4, 2.35, 2.3, 2.2, 2.1, 2.0, 1.9, 1.8, 1.7, 1.7, 1.7, 1.7, 1.7,
    1.7, 1.65, 1.65, 1.6, 1.6, 1.6,
  ],
};

// Declare base values for each core base stat, using a level interval of 5
export const classBaseDamage: {[key in Class]: number[]} = {
  mage: [
    1.7, 5.1, 6.8, 10.2, 14.28, 18.36, 24.48, 30.6, 36.72, 44.48, 53.04, 63.24,
    75.48, 87.72, 99.96, 112.2, 126.48, 140.76, 157.08, 173.4, 189.72,
  ],
  warrior: [
    3.4, 6.8, 10.2, 13.6, 19.04, 24.48, 32.64, 40.8, 48.96, 59.84, 70.72, 84.32,
    100.64, 116.96, 133.28, 149.6, 168.64, 187.68, 209.44, 231.2, 252.96,
  ],
  assassin: [
    5.1, 8.5, 13.6, 18.7, 23.8, 30.6, 40.8, 51, 61.2, 74.8, 88.4, 105.4, 125.8,
    146.2, 166.6, 187, 210.8, 234.6, 261.8, 289, 316.2,
  ],
  archer: [
    6.8, 10.2, 17, 22.1, 28.56, 36.72, 48.96, 61.2, 73.44, 89.76, 106.08,
    126.48, 150.96, 175.44, 199.92, 224.4, 252.96, 281.52, 314.16, 346.8,
    379.44,
  ],
  shaman: [
    6.8, 10.2, 17, 22.1, 28.56, 36.72, 48.96, 61.2, 73.44, 89.76, 106.08,
    126.48, 150.96, 175.44, 199.92, 224.4, 252.96, 281.52, 314.16, 346.8,
    379.44,
  ],
};

export const otherBaseStats = {
  totalHealth: [
    24, 53, 115, 196, 299, 442, 646, 901, 1246, 1690, 2224, 2958, 3868, 4619,
    5464, 6410, 7465, 8637, 9935, 11368, 12946,
  ],
  itemHealth: [
    3, 11, 26, 46, 72, 108, 159, 223, 309, 420, 554, 737, 964, 1152, 1363, 1600,
    1864, 2157, 2481, 2839, 3234,
  ],
};

export const atkSpeedMult: {[key in AttackSpeed]: number} = {
  SuperFast: 0.4767,
  VeryFast: 0.6613,
  Fast: 0.82,
  Normal: 1,
  Slow: 1.367,
  VerySlow: 2.4699,
  SuperSlow: 4.0196,
};

export function calcRarityMult(level: number, rarity: Rarity) {
  return rarityMultipliers[rarity][Math.round(level / 5)];
}

export function calcBaseDam(
  level: number,
  rarity: Rarity,
  type: Class,
  speed: AttackSpeed
) {
  const floor = classBaseDamage[type][Math.floor(level / 5)], // Lower damage bound (based on level interval eg. 74 -> 70)
    ceil = classBaseDamage[type][Math.ceil(level / 5)], // Higher damage bound (based on level interval eg 74 -> 75)
    diff = (level % 5) * 0.2, // Level difference, to grab fractional damage difference (eg. 74's 4 levels above 70)
    rarityMult = calcRarityMult(level, rarity); // Rarity multiplier, per rarity and level interval

  return ((ceil - floor) * diff + floor) * rarityMult * atkSpeedMult[speed];
}

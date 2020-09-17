// Weapon - <prefix> <weapon type> <rarity>( of <effect>)
// Armour - <prefix> <armour type> <rarity>
import produce from 'immer'

export type Attribute = 'floatation' | 'power' | 'speed' | 'morale' | 'intimidation'

interface Rarity {
	name: string,
	value: number
}

interface Prefix {
	name: string,
	attrs: { [key in Attribute]?: number }
}

interface ArmourItem {
	name: string
	slot: 'Head' | 'Chest' | 'Legs' | 'Feet' | 'Face' | 'Arms'
	attrs: { [key in Attribute]: number }
}

interface WeaponItem {
	name: string
	slot: 'Hand'
	numSlots: number
	attrs: { [key in Attribute]: number }
}

export interface ArmourType {
	rarity: Rarity
	prefix: Prefix
	item: ArmourItem
}

export interface WeaponType {
	rarity: Rarity
	prefix: Prefix
	item: WeaponItem
}

export function createArmour(): ArmourType {
	return {
		rarity: getRandomRarity(),
		prefix: getRandomElement(prefixes),
		item: getRandomElement(armourItems)
	}
}

export function createWeapon(): WeaponType {
	return {
		rarity: getRandomRarity(),
		prefix: getRandomElement(prefixes),
		item: getRandomElement(weaponItems),
	}
}


function romanize(num: number): string {
	if (isNaN(num))
		return 'Error'
	var digits = String(+num).split(""),
		key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
			"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
			"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
		roman = "",
		i = 3
	while (i--) {
		const popped = digits.pop()
		if (popped)
			roman = (key[+popped + (i * 10)] || "") + roman
	}

	return Array(+digits.join("") + 1).join("M") + roman
}

function getRandomRarity(base = 0, cap = 1): Rarity {
	let randomNum = base + (Math.random() * (1 - base))
	if (cap && randomNum > cap) {
		randomNum = cap
	}
	const rarity = Math.floor(Math.tan(randomNum * Math.PI / 2)) + 1

	return {
		name: romanize(rarity),
		value: rarity
	}
}

function getRandomElement<T>(arr: T[]) {
	const arrayItem = arr[Math.floor(Math.random() * arr.length)]
	return produce(arrayItem, () => { })
}

const prefixes: Prefix[] = [
	{ name: 'Awkward', attrs: { speed: -2 } },
	{ name: 'Buoyant', attrs: { floatation: 2 } },
	{ name: 'Bumpy', attrs: { power: -2 } },
	{ name: 'Boring', attrs: { morale: -1 } },
	{ name: 'Cumbersome', attrs: { speed: -2 } },
	{ name: 'Creepy', attrs: { intimidation: 2, morale: -2 } },
	{ name: 'Disgusting', attrs: { morale: -2 } },
	{ name: 'Dimpled', attrs: { morale: 1 } },
	{ name: 'Edible', attrs: { intimidation: -2, morale: 2 } },
	{ name: 'Exotic', attrs: { morale: 2 } },
	{ name: 'Extra-small', attrs: { power: -2 } },
	{ name: 'Fabulous', attrs: { morale: 2, power: -2 } },
	{ name: 'Fussy', attrs: { speed: -1 } },
	{ name: 'Good', attrs: { power: 1 } },
	{ name: 'Handmade', attrs: { morale: 2, power: -1, speed: -1 } },
	{ name: 'Heavy', attrs: { speed: -3, power: 1 } },
	{ name: 'Illegal', attrs: { intimidation: 2, morale: -1 } },
	{ name: 'Jagged', attrs: { power: 1, speed: -1 } },
	{ name: 'Kooky', attrs: { intimidation: -2, speed: 1 } },
	{ name: 'Large', attrs: { speed: -2, power: 1 } },
	{ name: 'Massive', attrs: { speed: -4, power: 4 } },
	{ name: 'Magnificent', attrs: { morale: 2 } },
	{ name: 'Naughty', attrs: { power: 2, speed: -2 } },
	{ name: 'Oily', attrs: { speed: -1 } },
	{ name: 'Odd', attrs: { morale: -1 } },
	{ name: 'Plain', attrs: {} },
	{ name: 'Quirky', attrs: { intimidation: -1, morale: 1 } },
	{ name: 'Raw', attrs: { intimidation: -2 } },
	{ name: 'Roasted', attrs: { morale: -1 } },
	{ name: 'Svelte', attrs: { morale: 2, power: -1, intimidation: -2 } },
	{ name: 'Scary', attrs: { morale: -2, intimidation: 3 } },
	{ name: 'Shiny', attrs: { morale: 1, speed: 1, intimidation: -1 } },
	{ name: 'Stained', attrs: { morale: -1 } },
	{ name: 'Safe', attrs: { power: -3, speed: 1 } },
	{ name: 'Trusty', attrs: { morale: 2 } },
	{ name: 'Thin', attrs: { power: -2, speed: 2, intimidation: -1 } },
	{ name: 'Usable', attrs: { morale: -1 } },
	{ name: 'Ugly', attrs: { intimidation: -2, morale: -2 } },
	{ name: 'Valuable', attrs: { morale: 2, power: -2, speed: -1, intimidation: -1 } },
	{ name: 'Wet', attrs: { morale: -2, floatation: 1 } },
	{ name: 'Wicked', attrs: { morale: -1, intimidation: 2 } },
	{ name: 'Zesty', attrs: { morale: 1, speed: 1 } },
]

const armourItems: ArmourItem[] = [
	{
		name: 'Helmet', slot: 'Head',
		attrs: {
			floatation: 0,
			power: 1,
			speed: 0,
			morale: 2,
			intimidation: 3
		}
	},
	{
		name: 'Boots', slot: 'Feet',
		attrs: {
			floatation: 0,
			power: 1,
			speed: 1,
			morale: 1,
			intimidation: 1
		}
	},
	{
		name: 'Life Vest', slot: 'Chest',
		attrs: {
			floatation: 3,
			power: 0,
			speed: 0,
			morale: 1,
			intimidation: 0
		}
	},
	{
		name: 'Dress Pants', slot: 'Legs',
		attrs: {
			floatation: 0,
			power: 0,
			speed: 1,
			morale: 3,
			intimidation: 0
		}
	},
	{
		name: 'Chest Plate', slot: 'Chest',
		attrs: {
			floatation: 0,
			power: 2,
			speed: 0,
			morale: 3,
			intimidation: 3
		}
	},
	{
		name: 'Blazer', slot: 'Chest',
		attrs: {
			floatation: 0,
			power: 0,
			speed: 2,
			morale: 3,
			intimidation: 0
		}
	},
	{
		name: 'Jacket', slot: 'Chest',
		attrs: {
			floatation: 0,
			power: 0,
			speed: 3,
			morale: 2,
			intimidation: 0
		}
	},
	{
		name: 'Floaties', slot: 'Arms',
		attrs: {
			floatation: 3,
			power: 0,
			speed: 0,
			morale: 0,
			intimidation: 0
		}
	},
]

const weaponItems: WeaponItem[] = [
	{
		name: 'Sword', slot: 'Hand', numSlots: 1,
		attrs: {
			floatation: 0,
			power: 2,
			speed: 3,
			morale: 2,
			intimidation: 3
		}
	},
	{
		name: 'Longsword', slot: 'Hand', numSlots: 2,
		attrs: {
			floatation: 0,
			power: 4,
			speed: 2,
			morale: 2,
			intimidation: 5
		}
	},
	{
		name: 'Pool Floatie', slot: 'Hand', numSlots: 1,
		attrs: {
			floatation: 3,
			power: 0,
			speed: 3,
			morale: 1,
			intimidation: 0
		}
	},
	{
		name: 'Axe', slot: 'Hand', numSlots: 2,
		attrs: {
			floatation: 0,
			power: 5,
			speed: 1,
			morale: 2,
			intimidation: 5
		}
	},
	{
		name: 'Shortbow', slot: 'Hand', numSlots: 2,
		attrs: {
			floatation: 0,
			power: 3,
			speed: 3,
			morale: 2,
			intimidation: 3
		}
	},
	{
		name: 'Log', slot: 'Hand', numSlots: 2,
		attrs: {
			floatation: 1,
			power: 2,
			speed: 1,
			morale: 0,
			intimidation: 1
		}
	},
]

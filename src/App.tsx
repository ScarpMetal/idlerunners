import React, { useState } from 'react'
import logo from './logo.svg'
import './App.scss'
import { createArmour, Attribute } from './Loot'

function App() {
	const [armour, setArmour] = useState(() => {
		const items = []
		for (let i = 0; i < 10; i++) {
			items.push(createArmour())
		}
		return items
	})

	return (
		<div className="App">
			{armour.map(({ prefix, item, rarity }) => {
				const base = {
					power: 0,
					speed: 0,
					morale: 0,
					intimidation: 0,
					floatation: 0
				}
				const red = {
					power: 0,
					speed: 0,
					morale: 0,
					intimidation: 0,
					floatation: 0
				}
				const green = {
					power: 0,
					speed: 0,
					morale: 0,
					intimidation: 0,
					floatation: 0
				}

				for (let attr in item.attrs) {
					if (attr === 'floatation' || attr === 'power' || attr === 'speed' || attr === 'morale' || attr === 'intimidation') {
						const prefixAmount = prefix.attrs[attr] || 0
						const itemAmount = item.attrs[attr]
						let possibleBase = itemAmount
						if (prefixAmount < 0) {
							possibleBase += prefixAmount
							red[attr] -= prefixAmount
						} else {
							green[attr] = prefixAmount
						}

						if (possibleBase > 0) {
							base[attr] = possibleBase
						} else {
							base[attr] = 0
						}

					}
				}

				console.log(base, red, green)
				return <div className='armour-stats'>
					{/* <p>{prefix.name} {item.name} ({rarity.name})</p> */}
					<table className='stats-table'>
						<thead>
							<tr>
								<td colSpan={6}>{prefix.name} {item.name} ({rarity.name})</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className='attr-label'>Power</td>
								{Array(base.power).fill(<td className='stat-bar-item base'></td>)}
								{Array(red.power).fill(<td className='stat-bar-item red'></td>)}
								{Array(green.power).fill(<td className='stat-bar-item green'></td>)}
							</tr>
							<tr>
								<td className='attr-label'>Speed</td>
								{Array(base.speed).fill(<td className='stat-bar-item base'></td>)}
								{Array(red.speed).fill(<td className='stat-bar-item red'></td>)}
								{Array(green.speed).fill(<td className='stat-bar-item green'></td>)}
							</tr>
							<tr>
								<td className='attr-label'>Morale</td>
								{Array(base.morale).fill(<td className='stat-bar-item base'></td>)}
								{Array(red.morale).fill(<td className='stat-bar-item red'></td>)}
								{Array(green.morale).fill(<td className='stat-bar-item green'></td>)}
							</tr>
							<tr>
								<td className='attr-label'>Intimidation</td>
								{Array(base.intimidation).fill(<td className='stat-bar-item base'></td>)}
								{Array(red.intimidation).fill(<td className='stat-bar-item red'></td>)}
								{Array(green.intimidation).fill(<td className='stat-bar-item green'></td>)}
							</tr>
							{(item.attrs.floatation || prefix.attrs.floatation) &&
								<tr>
									<td className='attr-label'>Floatation</td>
									{Array(base.floatation).fill(<td className='stat-bar-item base'></td>)}
									{Array(red.floatation).fill(<td className='stat-bar-item red'></td>)}
									{Array(green.floatation).fill(<td className='stat-bar-item green'></td>)}
								</tr>
							}

						</tbody>
					</table>
					<p>{JSON.stringify(prefix.attrs)}</p>
					<br />
				</div>
			})}
		</div>
	)
}

export default App

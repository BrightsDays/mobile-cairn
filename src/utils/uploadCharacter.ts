import { abilities, coins, inventory, name, stats } from "../store/characterStore"
import getCharacter from "./getCharacter"

export default (event: Event) => {
  if (event.target) {
    const reader = new FileReader()

    reader.onload = () => {
      if (reader.result) {
        const testCharacter = getCharacter()
        const character = JSON.parse(reader.result as string)
        let isValid = true
        
        Object.keys(character).forEach((key: string) => {
          if (!Object.keys(testCharacter).includes(key)) {
            isValid = false
          }
        })

        if (isValid) {
          name.set(character.name)
          abilities.set(character.abilities)
          stats.set(character.stats)
          coins.set(character.coins)
          inventory.set(character.inventory)
        }
      }
    }
    
    const result = (event.target as HTMLInputElement).files
    if (result) reader.readAsText(result[0])
  }
}
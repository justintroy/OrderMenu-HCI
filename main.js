class MealItem {
    constructor(name, quantity, unit, calories, protein, fat, vitaminA, calcium) {
        Object.assign(this, { name, quantity, unit, calories, protein, fat, vitaminA, calcium })
    }
}


let items = [
    new MealItem('spinach', 1, 'cup', 23, 3, 0.3, 8100, 93),
    new MealItem('sweetPotato', 1, ' med', 160, 2, 1, 9230, 46),
    new MealItem('yogurt', 8, 'oz', 230, 10, 3, 120, 343)
]



function computeTotal(arrayValues) {
    return arrayValues.reduce((total, value) => total + value, 0)
}

items.forEach(item => console.log(item.name))
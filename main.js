class MealItem {
    constructor(name, quantity, unit, calories, protein, fat, vitaminA, calcium) {
        Object.assign(this, { name, quantity, unit, calories, protein, fat, vitaminA, calcium })
    }
}

function createItem() {
    return new MealItem(...arguments)
}

let items = [
    createItem('Spinach', 1, 'cup', 23, 3, 0.3, 8100, 93),
    createItem('SweetPotato', 1, ' med', 160, 2, 1, 9230, 46),
    createItem('Yogurt', 8, 'oz', 230, 10, 3, 120, 343),
    createItem('Skim Milk', 1, 'cup', 85, 8, 0, 500, 302),
    createItem('Whole Wheat Bread', 1, 'slice', 65, 3, 1, 0, 24),
    createItem('Brown Rice', 1, 'cup', 178, 3.8, 0.9, 0, 18),
    createItem('Watermelon', 1, 'wedge', 110, 2, 1, 2510, 30),
    createItem('Papaya', 1, 'g', 156, 2.4, 0.4, 7000, 80),
    createItem('Tuna in Water', 1, 'lb', 575, 126.8, 3.6, 0, 73),
    createItem('Lobster', 1, 'med', 405, 28.8, 26.6, 984, 190)

]



function computeTotal(arrayValues) {
    return arrayValues.reduce((total, value) => total + value, 0)
}

items.forEach(item => console.log(item.name))
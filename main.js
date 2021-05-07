class MealItem {
    constructor(name, quantity, unit, calories, protein, fat, vitaminA, calcium) {
        Object.assign(this, { name, quantity, unit, calories, protein, fat, vitaminA, calcium })
    }
}


let items = [
    new MealItem('Spinach', 1, 'cup', 23, 3, 0.3, 8100, 93),
    new MealItem('SweetPotato', 1, ' med', 160, 2, 1, 9230, 46),
    new MealItem('Yogurt', 8, 'oz', 230, 10, 3, 120, 343),
    new MealItem('Skim Milk', 1, 'cup', 85, 8, 0, 500, 302),
    new MealItem('Whole Wheat Bread', 1, 'slice', 65, 3, 1, 0, 24),
    new MealItem('Brown Rice', 1, 'cup', 178, 3.8, 0.9, 0, 18),
    new MealItem('Watermelon', 1, 'wedge', 110, 2, 1, 2510, 30),
    new MealItem('Papaya', 1, 'g', 156, 2.4, 0.4, 7000, 80),
    new MealItem('Tuna in Water', 1, 'lb', 575, 126.8, 3.6, 0, 73),
    new MealItem('Lobster', 1, 'med', 405, 28.8, 26.6, 984, 190)

]



function computeTotal(arrayValues) {
    return arrayValues.reduce((total, value) => total + value, 0)
}

items.forEach(item => console.log(item.name))
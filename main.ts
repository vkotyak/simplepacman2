let hero: game.LedSprite = null
let food: game.LedSprite = null
let ghost: game.LedSprite = null
let life = 0
let started = 0
let score = 0
input.onButtonPressed(Button.A, function () {
    hero = game.createSprite(2, 2)
    food = game.createSprite(4, 4)
    ghost = game.createSprite(0, 0)
    ghost.change(LedSpriteProperty.Blink, 100)
    food.set(LedSpriteProperty.Brightness, 8)
    life = 5
    started = 1
    score = 0
})
basic.forever(function () {
    if (started == 1) {
        basic.pause(200)
        if (input.acceleration(Dimension.X) > 200) {
            hero.change(LedSpriteProperty.X, 1)
        }
        if (input.acceleration(Dimension.X) < -200) {
            hero.change(LedSpriteProperty.X, -1)
        }
        if (input.acceleration(Dimension.Y) > 200) {
            hero.change(LedSpriteProperty.Y, 1)
        }
        if (input.acceleration(Dimension.Y) < -200) {
            hero.change(LedSpriteProperty.Y, -1)
        }
        if (hero.isTouching(food)) {
            food.set(LedSpriteProperty.X, randint(0, 5))
            food.set(LedSpriteProperty.Y, randint(0, 5))
            score += 1
        }
    }
})
basic.forever(function () {
    basic.pause(500)
    if (started == 1) {
        if (ghost.get(LedSpriteProperty.X) < hero.get(LedSpriteProperty.X)) {
            ghost.change(LedSpriteProperty.X, 1)
        }
        if (ghost.get(LedSpriteProperty.X) > hero.get(LedSpriteProperty.X)) {
            ghost.change(LedSpriteProperty.X, -1)
        }
        if (ghost.get(LedSpriteProperty.Y) < hero.get(LedSpriteProperty.Y)) {
            ghost.change(LedSpriteProperty.Y, 1)
        }
        if (ghost.get(LedSpriteProperty.Y) > hero.get(LedSpriteProperty.Y)) {
            ghost.change(LedSpriteProperty.Y, -1)
        }
        if (hero.isTouching(ghost)) {
            life += -1
            if (life < 0) {
                basic.showString("Geme over")
                basic.showString("" + (score))
                started = 0
                food.delete()
                ghost.delete()
                hero.delete()
            }
        }
    }
})

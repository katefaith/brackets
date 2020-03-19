module.exports = function check(str, bracketsConfig) {
    let stack = []
    const config = configToStr(bracketsConfig)

    for (let i = 0; i < str.length; i++) {
        let char = str[i]
        let index = config.indexOf(char) // ищем индекс скобки в конфиге
        if (stack.includes(char) && char === config[index + 1]) { // если открывающая и закрывающая скобки одинаковые
            index += 1;
        }

        // если скобка в кофиге найдена
        if (index >= 0) {
            // если это открывающая скобка
            if (index % 2 === 0) {
                // кладем ее в стек
                stack.push(char)
            } else { // если скобка закрывающая
                if (stack.length === 0) { // если стек пустой - скобки не сбалансированы
                    return false
                }
                let lastBracket = stack.pop()
                if (lastBracket !== config[index - 1]) { // если последня скобка в стеке не соотвествует своей закрывающей - скобки не сбалансированы
                    return false
                }
            }
        }
    }

    return (stack.length === 0) ? true : false
}


function configToStr(arr) {
    let res = ''
    arr.forEach(elem => {
        if (Array.isArray(elem)) {
            res += elem.join('')
        } else {
            res = arr.join('')
        }
    })
    return res
}

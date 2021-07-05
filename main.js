
// function init() {
//    const el = document.createElement('div')
//     el.className = 'cursor'
//     el.style.position = "absolute"
  
//     document.body.append(el) 
// }

// onmousemove = function(e) {
//     console.log("mouse location:", e.clientX, e.clientY)

//     const el = document.querySelector('.cursor')

//     el.style.left = (e.clientX - 12) + 'px';
//     el.style.top = (e.clientY - 12)+ 'px';
// }

// init()

function hover(element) {
    //console.log(element)

    const button = element.querySelector('button')
    const span = element.querySelector('span')

    button.classList.toggle('hide')
    span.classList.toggle('hide')
}

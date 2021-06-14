let accepted = [-3, 00, 02, 4, 7, 10, 12]
let schoolColors = ['danger', 'info', 'info', 'link']

let school = ''
let schoolId = null

let grades

let AGrades = []
let BGrades = []
let CGrades = []


function schoolSelect(selected) {
	school = selected

	switch(school) {
		case 'stx':
			schoolId = 0
			break;

		case 'hf':
			schoolId = 1
			break;

		case 'hhx':
			schoolId = 2
			break;

		case 'htx':
			schoolId = 3
			break;
	}
	dynPage1('A')
}

function remove(page) {
	if(page === 'all') {
		let front = document.querySelector('#page1')

		front.scrollIntoView()

		const sections = document.querySelectorAll('section')
		setTimeout(function(){ 
				for(let i = 2; i < 9; i++) {

				sections[i].remove()
			} 
		}, 1000);
		
	} else {

		const el = document.querySelector('#' + page + '')

		setTimeout(function(){ el.remove(); }, 500);
	}
}

function dynPage1(fag) {
	let title= fag.toUpperCase()

	if(title === 'DONE') {
		dynPage3(school)

		return
	}

	let body = document.body

	let AOptions = [3, 4, 5, 6]
	let BOptions = [2, 3, 4, 5]
	let COptions = [1, 2, 3, 4]
	let options = []

	switch(title) {
		case 'A':
		 options = AOptions
		 break;

		case 'B':
		 options = BOptions
		 break;

		case 'C':
		 options = COptions
		 break;
	}
	
	const el = document.createElement('section')
	el.innerHTML = `
<div class="hero-body">
  	<div class="floating-back">
  		<a href="#page2" onclick="remove('page1${fag}')">
	  		<span class="icon-text">
			  <span class="icon">
			    <i class="fas fa-arrow-left"></i>
			  </span>
			  <span>Tilbage</span>
			</span>
		</a>
  	</div>
    <div class="">
     	<h1 class="title">${school.toUpperCase()}</h1>
		<p class="subtitle">Hvor mange ${title}-fag har du?</p>

		<div class="select" id="select${fag}" is-rounded">
		  <select id="${title}GradesSelect">
		    <option disabled selected>Antal ${title}-fag</option>
		    <option>${options[0]}</option>
		    <option>${options[1]}</option>
		    <option>${options[2]}</option>
		    <option>${options[3]}</option>
		  </select>
		</div>

		<a href="#4" onclick="page1Check('${title}')" class="button is-medium is-success">Fortsæt</a>
    </div>
  </div>
  `;
  el.className = `hero is-${schoolColors[schoolId]} is-fullheight`
  el.id = "page1" + fag

  body.appendChild(el);

  setTimeout(function(){ el.scrollIntoView(); }, 50);
}

function page1Check(fag) {
	if(isNaN(document.querySelector('#' + fag + 'GradesSelect').value)) {

		if(!document.querySelector('#errorSelect' + fag)) {
			const error = document.createElement('span')
			error.className = `errorMessage`
			error.id = `errorSelect${fag}`
			error.innerHTML = `
				<i class="fas fa-exclamation-triangle"></i>
				Vælg et gyldigt antal fag
			`

			document.querySelector('#select' + fag).append(error)
		}
		
	} else {

		if(document.querySelector('#errorSelect' + fag)) {

			document.querySelector('#errorSelect' + fag).remove()
			
		}

		dynPage2(fag)
	}
}
function dynPage2(fag) {
	let body = document.body
	let next 

	switch(fag) {
		case 'A': 
			next = 'B'
			break;

		case 'B': 
			next = 'C'
			break;

		case 'C': 
			next = 'DONE'
			break;
	}

	grades = document.querySelector('#' + fag + 'GradesSelect').value

	const el = document.createElement('section')
	el.innerHTML = `
  <div class="hero-body">
  	<div class="floating-back">
  		<a href="#3" onclick="remove('page2${fag}')">
	  		<span class="icon-text">
			  <span class="icon">
			    <i class="fas fa-arrow-left"></i>
			  </span>
			  <span>Tilbage</span>
			</span>
		</a>
  	</div>
    <div class="">
     	<h1 class="title">${school.toUpperCase()} - ${grades} ${fag}-fag</h1>
		<p class="subtitle">Hvilke karakterer fik du i de fag? <br>Indtast den samlede karakter, medmindre du markerer andet i afkrydsningsfeltet</p>

		<div id="grades${fag}" class="columns"></div>

		<a href="#5" onclick="getGrades('${fag}', '${grades}', '${next}')" class="button is-medium is-primary">Fortsæt</a>
    </div>
  </div>
  `;
  el.className = `hero is-${schoolColors[schoolId]} is-fullheight`
  el.id = "page2" + fag

  body.appendChild(el);
  setTimeout(function(){

	  for (var i = 0; i < grades; i++) {
	  	//console.log('created input')
		  	let column = document.querySelector('#grades' + fag)
		  	const detail = document.createElement('div')
			detail.innerHTML = `
				  	<label class="checkbox">
						  <input id="samlet${i+1}" class="samlet" onclick="handleSamlet(${i+1}, '${fag}')" type="checkbox">
						  Både skriftligt og mundtligt?
						</label>

				   <input class="input grades" id="samlet${i+1 + fag}Input" placeholder="Samlet karakter" required>
				 </div>  `;
		  detail.className = `column${i+1 + fag}`

		  column.appendChild(detail)
		}
	}, 150);
  setTimeout(function(){ el.scrollIntoView(); }, 50);
}

function dynPage3(school) {
	let body = document.body
	let snit = Math.round(calcSnit()[0] * 10) / 10

	const el = document.createElement('section')
	el.innerHTML = `
  <div class="hero-body">
  	<div class="floating-back">
  		<a href="#1" onclick="remove('all')">
	  		<span class="icon-text">
			  <span class="icon">
			    <i class="fas fa-home"></i>
			  </span>
			  <span>Hjem</span>
			</span>
		</a>
  	</div>
    <div class="">

     	<h1 class="title">${school.toUpperCase()}</h1>
		<p class="subtitle">Dit vægtede snit er  
		<h1 class="snit has-text-success"> ${snit} </h1>
		<p> Med <br> 
		${calcSnit()[1]} A-fag <br> 
		${calcSnit()[2]} B-fag <br> 
		${calcSnit()[3]} C-fag </p>
    </div>
  </div>
  `;
  el.className = `hero is-${schoolColors[schoolId]} is-fullheight`
  el.id = 'final'

  body.appendChild(el);
  setTimeout(function(){ el.scrollIntoView(); }, 50);
}

function handleSamlet(index, fag) {
	const element = document.querySelector('#samlet' + index)
	const column = document.querySelector('.column' + index + fag)


		if(element.checked) {
			document.querySelector('#samlet' + index  + fag + 'Input').setAttribute('placeholder', 'Skriftlig karakter')

			const input = document.createElement('input')

		  	input.className = `input grades ekstra`
		  	input.id = `ekstra${index + fag}Input`
		  	input.placeholder = `Mundtlig karakter`
		  	input.required = true

			column.appendChild(input)

			//console.log('checked')
		} else {
			//console.log('not cheked')

			const ekstra = document.querySelector('#ekstra' + index + fag + 'Input')

			if(ekstra) {

				ekstra.remove()
				document.querySelector('#samlet' + index + fag + 'Input').setAttribute('placeholder', 'Samlet karakter')
			} else {

				//console.log('no ekstra input')
			}	
		}		  
}

function getGrades(fag, number, next) {
	let temp = []
	let ekstra
	let success = true

	for (var i = 1; i <= number; i++) {
		let grade = document.querySelector('#samlet' + i + fag + 'Input').value

		if(accepted.includes(parseInt(grade))) {

			temp.push(parseInt(grade))

			if(document.querySelector('#error' + i + fag)) {

					document.querySelector('#error' + i + fag).remove()
			}
		} else {

			console.error('Din indtastning er ikke en karakter på 7-tals skalaen')
			success = false

			if(!document.querySelector('#error' + i + fag)) {

				const error = document.createElement('span')
				error.className = `errorMessage`
				error.id = `error${i + fag}`
				error.innerHTML = `
					<i class="fas fa-exclamation-triangle"></i>
					Indtast en gyldig karakter
									`

				document.querySelector('.column' + i + fag).append(error)
			}
		}

		if(ekstra = document.querySelector('#ekstra' + i + fag + 'Input')) {

			if(accepted.includes(parseInt(ekstra.value))) {

				temp.push(parseInt(ekstra.value))

				if(document.querySelector('#errorekstra' + i + fag)) {

					document.querySelector('#errorekstra' + i + fag).remove()
				}
				
			} else {

				console.error('Din indtastning er ikke en karakter på 7-tals skalaen')
				success = false

				if(!document.querySelector('#errorekstra' + i + fag)) {
					const error = document.createElement('span')
					error.className = `errorMessage`
					error.id = `error${'ekstra' + i + fag}`
					error.innerHTML = `
						<i class="fas fa-exclamation-triangle"></i>
						Indtast en gyldig karakter
										`

					document.querySelector('.column' + i + fag).append(error)
				} 
			}
			//console.log('ekstra active')
		} else {

			// console.log('ekstra not active')
		}
	}

	//console.log(fag + ': ' + temp)

	switch(fag) {
		case 'A':
			AGrades = temp
			break;

		case 'B':
			BGrades = temp
			break;

		case 'C':
			CGrades = temp
			break;
	}

	if(success) {

		dynPage1(next)

	} else {

		console.error('Der skete en fejl - prøv at opdatere siden')
	}
}


function calcSnit() {
	let total = 0
	let vægte = [2, 1.5, 1]
	let qty = 0

	for (let i = 0; i < AGrades.length; i++) {

		total += (AGrades[i] * vægte[0])
		qty += vægte[0]
	}

	for (let i = 0; i < BGrades.length; i++) {

		total += (BGrades[i] * vægte[1])
		qty += vægte[1]
	}

	for (let i = 0; i < CGrades.length; i++) {

		total += (CGrades[i] * vægte[2])
		qty += vægte[2]
	}

	let snit = total/qty

	return [snit, AGrades.length, BGrades.length, CGrades.length ]
}
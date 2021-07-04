function getGrades(fag, number, next) {
	let temp = []
	let ekstra
	let success = true

	for (var i = 1; i <= number; i++) {
		let check = document.querySelector('#samlet' + i + fag).checked
		let eksamen = document.querySelector('#eksamen' + i + fag + 'Input')
		let grade = document.querySelector('#samlet' + i + fag + 'Input').value


		if(check) {

			temp.push(9999)
		}

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
					<i class="fas fa-caret-down fa-3x" id="pointing"></i>
					<i class="fas fa-exclamation-triangle" id="errorIcon"></i>
					Indtast en gyldig karakter
									`

				document.querySelector('.column' + i + fag).append(error)
			}
		}

		if(ekstra = document.querySelector('#ekstra' + i + fag + 'Input')) {

			if(check) {

				temp.push(9999)
			}

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
						<i class="fas fa-caret-down fa-3x" id="pointing"></i>
						<i class="fas fa-exclamation-triangle" id="errorIcon"></i>
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
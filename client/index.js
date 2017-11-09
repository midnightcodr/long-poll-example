const fetch = require('node-fetch')

const doit = (id=0) => {

	fetch(`http://localhost:8080/long?id=${id}`)
		.then(res => res.text())
		.then(val => {
			console.log(`got result from remote: ${val}`)
			return doit(val)
		})
		.catch(err => {
			console.log('GOTERROR', err)
		})
}

doit()

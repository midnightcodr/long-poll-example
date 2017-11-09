const fetch = require('node-fetch');
const urlBase = 'http://localhost:8080/long?id='
const bluebird = require('bluebird')
const maxRetry = 10 
const retryDelay = 3000	// ms

// got retry idea from
// https://github.com/jonbern/fetch-retry/blob/master/index.js

const doit = (id = 0) => {
	let retries = maxRetry
	var wrappedFetch = n => {
		fetch(`${urlBase}${id}`)
			.then(res => res.text())
			.then(val => {
				console.log(`got result from remote: ${val}`);
				return doit(val);
			})
			.catch(err => {
				if(n>0) {
					console.log(`retry in ${retryDelay} ms`)
					bluebird.delay(retryDelay).then(() => {
						wrappedFetch(--n)
					})
				} else {
					console.error(err)
				}
			})
	}
	wrappedFetch(retries)
}

doit()

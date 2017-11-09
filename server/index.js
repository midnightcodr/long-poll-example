const Hapi = require('hapi')
const server = Hapi.Server({port: 8080})
const bluebird = require('bluebird')
const maxWait = 15*1000	// 1/4 minutes
let lastRun = false

function process(id) {
	console.time(`T${id}`)
	return bluebird.delay(Math.random()*maxWait).then(() => {
		console.timeEnd(`T${id}`)
		return new Date().getTime()
	})
}

server.route({
	method: 'GET',
	path: '/long',
	async handler(request) {
		const id = request.query.id || 0
		console.log(`client requesting for > ${id}`)
		const result = await process(id)
		return result
	}
})

server.start().then(() => {
	console.log(`sever started at ${server.info.uri}`)
})

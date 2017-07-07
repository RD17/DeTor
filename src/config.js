import parseArgs from 'minimist'
import url from 'url'

const defaultConfig = {
	"port": 8080,
	"bodyLimit": "10mb",
	"corsHeaders": ["Link"]
}

let config = null

const init = () => {
	const options = parseArgs(process.argv.slice(2))
	config = { ...defaultConfig, ...options }

	return config
}

export default (() => {
	return config === null
		? init()
		: config
})()



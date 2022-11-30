import env from "./env"

process.env = {
	...process.env,
	...env,
}

type ENV = typeof env
declare global {
	namespace NodeJS {
		// rome-ignore lint/suspicious/noEmptyInterface:
		interface ProcessEnv extends ENV {}
	}
}


import fastify from "fastify"
import { getSubtitles } from "youtube-captions-scraper";


const server = fastify({logger: true})

server.get('/captions', async (request, response) => {
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	response.header('Access-Control-Allow-Headers', 'Content-Type');

	const { videoId, lang } = request.query as {videoId: string, lang: string}

  console.log({ videoId, lang });
  const captions: { text: string }[] = await getSubtitles({
    videoID: videoId,
    lang: lang,
  }).catch((err: unknown) => {
    console.log("deu erro");
    console.log(err);
  });

  console.log(captions);

  const text = captions.map((caption) => caption.text).join(" ");

	return {captions: text}
})

// Run the server!
const start = async () => {
  try {
    await server.listen({ port: 3000 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()
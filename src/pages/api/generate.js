import { generateAsync } from 'stability-client'

export async function post({ request }) {

  let key = import.meta.env.STABILITY_KEY
  const body = await request.json()
  const parameters = {...body, ...{apiKey: key}}
  
  try {
    const { err, images } = await generateAsync(parameters)
    return new Response(JSON.stringify({
      samples: images, err: err
    }))
    
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({
      err: err
    }));
  }
}
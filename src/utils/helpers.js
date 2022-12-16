const placeholder = 'a woman in a white top and tan pants with a handbag and purse, a digital rendering by Enguerrand Quarton'

const samples = [
    {
        prompt: 'hyperrealistic magic mushroom, trending on artstation, sharp focus, studio photo, intricate details, highly detailed, by greg rutkowski',
        url: 'https://storage.googleapis.com/pai-images/8c516be2ebaf4e0287f0534ad5a56806.jpeg'
    },
    {
        prompt: 'portrait of a beautiful geisha, volume lighting, concept art, by greg rutkowski!!, colorful, xray melting colors!!',
        url: 'https://cdn.openart.ai/stable_diffusion/4f4879656d18bc52edc1ec9699e4b52717fd607e_2000x2000.webp'
    },
    {
        prompt: 'hyperrealistic 3D monsters sneaking up on a boy, in the style of Jean-Michel Basquiat, Trending on artstation, cinematic, hyper realism, octane render, 8k, depth of field',
        url: 'https://cdn.openart.ai/stable_diffusion/7726589499812c52be934f79ff35cf8f00465cc1_2000x2000.webp'
    },
    {
        prompt: 'human anime metal album covert, sharp focus, emitting diodes, smoke, artillery, sparks, racks, system unit, motherboard, by pascal blanche rutkowski repin artstation hyperrealism painting concept art of detailed character design matte painting, 4 k resolution blade runner',
        url: 'https://storage.googleapis.com/pai-images/d285605527894c8faa3b41dcb2cc90bd.jpeg'
    },
    {
        prompt: 'future robot color mechanik 4K realistic , cinematic, 4k, epic Steven Spielberg movie still, sharp focus, emitting diodes, smoke, artillery, sparks, racks, system unit, motherboard, by pascal blanche rutkowski repin artstation hyperrealism painting concept art of detailed character design matte painting, 4 k resolution blade runner',
        url: 'https://storage.googleapis.com/pai-images/4a07d1823e8b45048893f9332698937e.jpeg'
    },
    {
        prompt: 'biomorphic gothic cathedral morphed into mountain ridge, tom bagshaw as ruan jia as expert, detailed face, sharp expression, clear, expressive, intricate, ambigrammatic, vivid portrait with engrossing detail against a symbolic symbol-patterned background',
        url: 'https://storage.googleapis.com/pai-images/f448d3d5488a4230a0c4f8eb9dde9cdf.jpeg'
    }
]

const photography = ['#film', '1900s photograph', '4K', 
    '64 megapixels', '8K resolution', 'back lit',
    'bokeh', 'composite photograph', 'depth of field',
    'diffuse light', 'DSLR', 'dynamic lighting', 'filmic',
    'fisheye lens', 'golden hour', 'HDR', 'Kodak Ektar',
    'lens flare', 'long exposure', 'macro lens', 'macro photography',
    'medium shot', 'motion blur', 'panorama', 'polaroid', 'retouched', 
    'sepia', 'sharp focus', 'silver nitrate photo', 'soft focus', 
    'stock photo', 'subtractive lighting', 'telephoto', 'telephoto lens', 
    'tilt-shift', 'unsplash', 'vignette', 'wide-angle lens'
]

const arts = [
    'academic art', 'action painting', 'art Brut', 
    'art deco', 'art Nouveau', 'ashcan school', 'Australian tonalism',
    'baroque', 'bauhaus', 'brutalism', 'concept art', 'concrete art',
    'cubism', 'cubist', 'detailed painting', 'expressionism', 'fauvism',
    'film noir', 'filmic', 'fluxus', 'folk art', 'futurism',
    'geometric abstract art', 'gothic art', 'graffiti', 'Harlem renaissance',
    'Heidelberg school', 'hudson river school', 'hypermodernism', 
    'hyperrealism', 'impressionism', 'kinetic pointillism', 
    'lyrical abstraction', 'mannerism', 'matte painting',
    'maximalism', 'maximalist', 'minimalism', 'minimalist',
    'modern art', 'modern European ink painting', 'movie poster',
    'naïve art', 'neo-primitivism', 'photorealism', 'pointillism',
    'pop art', 'post-impressionism', 'poster art', 'pre-raphaelitism',
    'precisionism', 'primitivism', 'psychedelic art', 'qajar art',
    'renaissance painting', 'retrofuturism', 'romanesque',
    'romanticism', 'shin hanga', 'splash art', 'storybook illustration',
    'street art', 'surrealism', 'synthetism', 'Ukiyo-e', 
    'underground comix', 'vorticism'
]


const techniques = ['8bit', 'acrylic art', 'airbrush art',
    'ambient occlusion', 'brocade', 'cel-shaded', 'chalk art',
    'charcoal drawing', 'collage', 'digital art', 'digital illustration',
    'dye-transfer', 'faience', 'filigree', 'fractal', 'gouache',
    'impasto', 'ink drawing', 'kintsugi', 'majolica', 'mandelbrot',
    'mandelbulb', 'mixed media', 'mosaic', 'needlepoint',
    'oil on canvas', 'pastels', 'pencil sketch', 'photoillustration',
    'pixel art', 'quilling', 'resin cast', 'retroism', 'stipple',
    'tesselation', 'thermal imaging', 'volumetric lighting',
    'watercolor', 'wet brush', 'wet wash', 'woodcut'
]


const artists = ['Alex Hirsch', 'Alphonse Mucha', 'Amanda Sage', 
    'Ben Bocquelet', 'Bernie Wrightson', , 'Canaletto', 
    'Caspar David Friedrich', 'Claude Monet', 'Dan Mumford',
    'Dan Witz', 'Edward Hopper', 'Ferdinand Knab', 'Gerald Brom', 
    'Greg Rutkowski', 'Guido Borelli', 'Gustav Klimt', 'Gustave Doré', 
    'H.R. Giger', 'J. G. Quintel', 'James Gurney', 'Jean Tinguely',
    'Jim Burns', 'Jordan Grimmer', 'Josephine Wall', 'Julia Pott', 
'    Kandinsky', 'Kelly Freas', 'Killian Eng', 'Leonid Afremov',
    'Max Ernst', 'Moebius', 'Pablo Picasso', 'Pendleton Ward',
    'Pino Daeni', 'Rafael Santi', 'Rebecca Sugar', 'Roger Dean', 
    'Simon Stålenhag', 'Stephen Hillenburg', 'Steven Belledin', 
    'Studio Ghibli', 'Thomas Kinkade', 'Tim Burton', 'Van Gogh', 
    'Wadim Kashin', 'Wes Anderson', 'WLOP', 'Zdzisław Beksiński'
]

const colors = [
    "analogous colors", "color corrected", "color graded",
    "color gradient", "complementary colors", "contrasting colors",
    "cool colors", "deep color", "green and magenta", "monochromatic",
    "orange and teal", "split-complementary colors", "tetradic colors",
    "triadic colors",  "warm colors", "yellow and blue",  "yellow and purple"
]

const descriptives = ['18th century atlas', '1900s photograph', 'astral',
    'aurora','beautiful', 'bismuth', 'colorful','complex', 'cosmic',
    'crepuscule', 'dendritic', 'detailed', 'diffuse', 'dystopian',
    'earth art', 'elaborate', 'eldritch', 'elegant', 'elemental',
    'entangled', 'ethereal', 'expansive', 'fantastical', 'fire',
    'firey', 'flickering light', 'futuristic', 'galactic', 'geometric', 
    'glowing neon', 'golden hour', 'golden ratio', 'gossamer', 'heat wave', 
    'holographic', 'hyperdetailed', 'infinity', 'intricate', 'iridescent',
    'landscape', 'light dust', 'liminal', , 'liminal space', , 'low poly',
    'magnificent', 'matte background', 'meticulous', 'moonscape',
    'mysterious', 'noctilucent', 'ominous', 'ouroboros', 'parallax', 
    'photorealistic', 'polished', 'post-apocalyptic', 'psychedelic',
    'radiant', 'retro', 'seascape', 'serene', 'space', 'spiraling',
    'stygian', 'sunny', 'sunshine rays', 'synesthesia', 'thunderstorm',
    'tornadic', 'twilight', 'vapor'
]

const culture = ['aetherpunk', 'anime', 'auroracore', 'biopunk',
    'cassette futurism', 'clockpunk', 'comic art', 'cyberpunk',
    'dark academia', 'dieselpunk', 'dreamcore', 'dystopian',
    'fairycore', 'fantasy', 'fantasycore', 'futuristic',
    'glitchcore', 'horror', 'landscape', 'post-apocalyptic', 
    'prehistoricore', 'retro', 'retrofuturism', 'sci-fi',
    'solarpunk', 'spacecore', 'steampunk', 'synthwave',
    'vaporwave', 'zombiecore'
]

const negativePrompts = ["amateur", , "bad anatomy", "blurred",
    "blurry", "body out of frame", "border", "cut off", 
    "deformed", "disfigured", "draft", "extra limbs",
    "frame", "grainy", "out of frame", "poorly drawn face", 
    , "poorly drawn feet", "poorly drawn hands", "signature", 
    "tiling", "ugly", "watermark"
]


const popular = ['bokeh', 'Unreal Engine', 'by Greg Rutkowski']

let modifiers = [
    {name: 'Art & Styles', words: arts}, {name: 'Colors', words: colors},
    {name: 'Techniques', words: techniques}, {name: 'Photography', words: photography},
    {name: 'Descriptives', words: descriptives}, {name: 'Culture', words: culture},
    // {name: 'Negative Prompts', words: negativePrompts}
]



const makeBase64URL = (array) => {
    const base64Image = btoa(
        new Uint8Array(array).reduce(
          (data, byte) => data + String.fromCodePoint(byte),
          ""
        )
      );
      return  `data:image/png;base64,${base64Image}`
}

export {
    placeholder, samples, artists, arts, colors,
    culture, descriptives, techniques, photography,
    popular, modifiers, makeBase64URL
}
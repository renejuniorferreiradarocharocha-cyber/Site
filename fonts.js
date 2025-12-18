const fonts = [
    'Roboto',
    'Poppins',
    'Noto Sans',
    'Inter',
    'Archivo Black',
    'Bungee',
    'Cabin Sketch',
    'Concert One',
    'Lexend Deca',
    'Lilita One',
    'Montserrat Alternates',
    'Orbitron',
    'Righteous',
    'Luckiest Guy',
    'Leckerli One',
    'Gluten',
    'Monoton',
    'Fascinate',
    'Faster One',
    'Fredoka One'
];

const fontWeights = {
    'Roboto': [100, 300, 400, 500, 700, 900],
    'Poppins': [100, 200, 300, 400, 500, 600, 700, 800, 900],
    'Noto Sans': [100, 200, 300, 400, 500, 600, 700, 800, 900],
    'Inter': [100, 200, 300, 400, 500, 600, 700, 800, 900],
    'Archivo Black': [400],
    'Bungee': [400],
    'Cabin Sketch': [400, 700],
    'Concert One': [400],
    'Lexend Deca': [100, 200, 300, 400, 500, 600, 700, 800, 900],
    'Lilita One': [400],
    'Montserrat Alternates': [100, 200, 300, 400, 500, 600, 700, 800, 900],
    'Orbitron': [400, 500, 600, 700, 800, 900],
    'Righteous': [400],
    'Luckiest Guy': [400],
    'Leckerli One': [400],
    'Gluten': [100, 200, 300, 400, 500, 600, 700, 800, 900],
    'Monoton': [400],
    'Fascinate': [400],
    'Faster One': [400],
    'Fredoka One': [400]
};

function getAvailableWeights(font) {
    return fontWeights[font] || [400]; // Retorna [400] como padrão se a fonte não for encontrada
}

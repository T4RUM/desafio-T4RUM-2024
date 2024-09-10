class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: ['MACACO', 'MACACO', 'MACACO'] },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: ['GAZELA'] },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: ['LEAO'] }
        ];

        this.animais = {
            LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false },
        };
    }

    analisaRecintos(animal, quantidade) {
        
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }

        
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const { tamanho, biomas, carnivoro } = this.animais[animal];
        const recintosViaveis = [];

        
        this.recintos.forEach(recinto => {
            const { numero, bioma, tamanho: tamanhoRecinto, animais: animaisExistentes } = recinto;
            let espacoOcupado = animaisExistentes.reduce((total, animalExistente) => total + this.animais[animalExistente].tamanho, 0);
            let especieConvivencia = true;

           
            if (!biomas.includes(bioma) && !(animal === 'HIPOPOTAMO' && bioma === 'savana e rio')) {
                return; 
            }

            
            if (carnivoro) {
                if (animaisExistentes.some(animalExistente => animalExistente !== animal)) {
                    return; 
                }
            } else if (animal === 'MACACO' && animaisExistentes.length === 0) {
                return; 
            }

            if (animal === 'HIPOPOTAMO' && bioma !== 'savana e rio') {
                return; 
            }

            const espacoExtra = (animaisExistentes.length > 0 && animal !== 'MACACO') ? 1 : 0;

            const espacoNecessario = tamanho * quantidade + espacoExtra;
            const espacoRestante = tamanhoRecinto - (espacoOcupado + espacoNecessario);
            if (espacoRestante >= 0) {
                recintosViaveis.push({
                    numero: numero,
                    descricao: `Recinto ${numero} (espaço livre: ${espacoRestante} total: ${tamanhoRecinto})`
                });
            }
        });

        
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        
        recintosViaveis.sort((a, b) => a.numero - b.numero);

        
        return { recintosViaveis: recintosViaveis.map(r => r.descricao) };
    }
}

export { RecintosZoo as RecintosZoo };

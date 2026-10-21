
async function buscarPokemon(nombrePk) {
    const nombre = nombrePk.toLowerCase();

    const respuesta = await fetch(
        'https://pokeapi.co/api/v2/pokemon/' + nombre
    );

    if (!respuesta.ok) {
        console.log('No se encontro el Pokemon. Estado:', respuesta.status);
        return null;
    }

    return await respuesta.json();
}


function mostrarFicha(datosPk) {
    if (datosPk === null) {
        console.log('No hay datos para mostrar.');
        return;
    }

    console.log('\n==============================');
    console.log('POKEMON:', datosPk.name.toUpperCase());
    console.log('Numero:', datosPk.id);

    const tipos = [];

    for (const tipo of datosPk.types) {
        tipos.push(tipo.type.name);
    }

    console.log('Tipos:', tipos.join(' / '));
    console.log('Altura:', datosPk.height * 10, 'cm');
    console.log('Peso:', datosPk.weight / 10, 'kg');

    console.log('\nEstadisticas:');

    for (const stat of datosPk.stats) {
        console.log(stat.stat.name, ':', stat.base_stat);
    }

    console.log('\nHabilidades:');

    for (const habilidad of datosPk.abilities) {
        if (habilidad.is_hidden) {
            console.log(habilidad.ability.name, '(oculta)');
        } else {
            console.log(habilidad.ability.name);
        }
    }

    console.log('==============================');
}


function obtenerStat(datosPk, nombreStat) {
    for (const stat of datosPk.stats) {
        if (stat.stat.name === nombreStat) {
            return stat.base_stat;
        }
    }

    return null;
}


async function compararPokemon(nombre1, nombre2, stat) {
    const datos1 = await buscarPokemon(nombre1);
    const datos2 = await buscarPokemon(nombre2);

    if (datos1 === null || datos2 === null) {
        console.log('No se pueden comparar los Pokemon.');
        return;
    }

    const valor1 = obtenerStat(datos1, stat);
    const valor2 = obtenerStat(datos2, stat);

    if (valor1 === null || valor2 === null) {
        console.log('Estadistica no valida.');
        console.log('Usa hp, attack, defense, special-attack, special-defense o speed.');
        return;
    }

    console.log('\nComparacion de', stat);
    console.log(datos1.name, ':', valor1);
    console.log(datos2.name, ':', valor2);

    if (valor1 > valor2) {
        console.log('Gana:', datos1.name);
    } else if (valor2 > valor1) {
        console.log('Gana:', datos2.name);
    } else {
        console.log('Los dos tienen el mismo valor.');
    }
}


async function pokemonMasFuerte(listaNombres, stat) {
    let mejorNombre = null;
    let mejorValor = -1;

    for (const nombrePk of listaNombres) {
        const datosPk = await buscarPokemon(nombrePk);

        if (datosPk === null) {
            continue;
        }

        const valor = obtenerStat(datosPk, stat);

        if (valor === null) {
            continue;
        }

        if (valor > mejorValor) {
            mejorValor = valor;
            mejorNombre = datosPk.name;
        }
    }

    if (mejorNombre === null) {
        console.log('No se encontro un Pokemon valido para comparar.');
        return null;
    }

    console.log('\nEl Pokemon con mayor', stat, 'es:', mejorNombre);
    console.log('Valor:', mejorValor);

    return mejorNombre;
}


// EJERCICIO 2: BUSCAR POKEMON

async function pruebas() {
    console.log('\n===== EJERCICIO 2 =====');

    const pk1 = await buscarPokemon('rotom');
    const pk2 = await buscarPokemon('metagross');
    const pk3 = await buscarPokemon('dragonite');

    if (pk1 !== null) {
        console.log(pk1.name, pk1.id);
    }

    if (pk2 !== null) {
        console.log(pk2.name, pk2.id);
    }

    if (pk3 !== null) {
        console.log(pk3.name, pk3.id);
    }

    // Prueba ombre inexistente
    await buscarPokemon('pokemonfalso');


    // EJERCICIO 3: MOSTRAR FICHAS
  
    console.log('\n===== EJERCICIO 3 =====');

    const umbreon = await buscarPokemon('umbreon');
    mostrarFicha(umbreon);

    const glimmora = await buscarPokemon('glimmora');
    mostrarFicha(glimmora);



    // EJERCICIO 4: COMPARAR POKEMON


    console.log('\n===== EJERCICIO 4 =====');

    // Elegi ataque para comparar la capacidad ofensiva de ambos Pokemon
    await compararPokemon('snorlax', 'machamp', 'attack');

    // Compara la defensa de otros dos Pokemon
    await compararPokemon('blastoise', 'venusaur', 'defense');

    // Prueba estadística que no existe
    await compararPokemon('rotom', 'lucario', 'fuerza');


    // =============================================
    // EJERCICIO 5: POKEMON MAS FUERTE
    // =============================================

    console.log('\n===== EJERCICIO 5 =====');

    const miEquipo = [
        'metagross',
        'rotom',
        'umbreon',
        'lucario',
        'glimmora',
        'dragonite'
    ];

    const ganadorAtaque = await pokemonMasFuerte(miEquipo, 'attack');
    const ganadorDefensa = await pokemonMasFuerte(miEquipo, 'defense');

    console.log('\nGanador de ataque:', ganadorAtaque);
    console.log('Ganador de defensa:', ganadorDefensa);

    // Mostrar la ficha completa del ganador en ataque.
    if (ganadorAtaque !== null) {
        const datosGanador = await buscarPokemon(ganadorAtaque);
        mostrarFicha(datosGanador);
    }
}

pruebas();

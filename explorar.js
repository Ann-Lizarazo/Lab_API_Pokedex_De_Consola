
async function explorarPokemon() {
    const nombrePk = 'rotom';

    const respuesta = await fetch(
        'https://pokeapi.co/api/v2/pokemon/' + nombrePk
    );

    console.log('Estado:', respuesta.status);

    if (!respuesta.ok) {
        console.log('Error al consultar el Pokemon.');
        return;
    }

    const datosPk = await respuesta.json();

    console.log('Nombre:', datosPk.name);
    console.log('ID:', datosPk.id);

    console.log('\nTipos:');

    for (const tipo of datosPk.types) {
        console.log(tipo.type.name);
    }

    console.log('\nEstadisticas:');

    for (const stat of datosPk.stats) {
        console.log(stat.stat.name, ':', stat.base_stat);
    }

    console.log('\nHabilidades:');

    for (const habilidad of datosPk.abilities) {
        console.log(habilidad.ability.name);
    }
}

explorarPokemon();

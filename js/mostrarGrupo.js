const IMAGEN_POR_DEFECTO = 'img/placeholder.svg';

// Cada área del proyecto tiene su color de credencial. Se reconoce por palabras del rol.
const AREAS = [
    { clave: 'datos', nombre: 'Datos', palabras: ['json', 'fetch'] },
    { clave: 'maquetacion', nombre: 'Maquetación', palabras: ['html', 'dom'] },
    { clave: 'tema', nombre: 'Tema', palabras: ['tema', 'oscuro'] }
];

/**
 * Devuelve el área que corresponde al rol del integrante.
 * @param {string} rol
 */
function obtenerArea(rol) {
    const texto = rol.toLowerCase();
    return AREAS.find((area) => area.palabras.some((palabra) => texto.includes(palabra)));
}

/**
 * Crea una credencial por cada integrante y la agrega al contenedor #equipo.
 * @async
 */
async function mostrarGrupo() {
    const contenedor = document.getElementById('equipo');
    const miembros = await buscarGrupo();
    console.log(miembros);

    if (!miembros) {
        contenedor.innerHTML = `
            <p class="estado-error">
                No se pudieron cargar los integrantes. Revisá que exista data/grupo.json
                y abrí la página con Live Server.
            </p>
        `;
        return;
    }

    miembros.forEach((miembro, indice) => {
        const area = obtenerArea(miembro.rol);

        const columna = document.createElement('div');
        columna.className = 'col-12 col-md-6 col-lg-4';

        columna.innerHTML = `
            <article class="card h-100 credencial ${area ? `credencial--${area.clave}` : ''}">
                <img src="${miembro.imagen}" class="card-img-top" alt="Foto de ${miembro.nombre}">
                ${area ? `<div class="credencial-banda">${area.nombre}</div>` : ''}
                <div class="card-body">
                    <h2 class="card-title">${miembro.nombre}</h2>
                    <p class="card-subtitle">${miembro.rol}</p>
                    ${miembro.descripcion ? `<p class="card-text">${miembro.descripcion}</p>` : ''}
                </div>
            </article>
        `;

        // Orden de entrada para la animación
        columna.querySelector('.credencial').style.setProperty('--orden', indice);

        // Mientras no haya fotos, se muestra una imagen genérica
        const imagen = columna.querySelector('img');
        imagen.addEventListener('error', () => {
            imagen.src = IMAGEN_POR_DEFECTO;
        }, { once: true });

        contenedor.appendChild(columna);
    });
}

mostrarGrupo();

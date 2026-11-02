/**
 * Trae los miembros del grupo y crea una card por cada uno.
 * @async
 */
async function mostrarEquipo() {
    const contenedor = document.getElementById('equipo');
    const miembros = await buscarGrupo();
    console.log(miembros);

    if (!miembros) {
        contenedor.innerHTML = '<p class="text-danger">No se pudo cargar el equipo.</p>';
        return;
    }

    miembros.forEach(miembro => {
        // Columna: una card por fila en celular, dos en tablet y tres en escritorio.
        const columna = document.createElement('div');
        columna.className = 'col-12 col-md-6 col-lg-4';

        const card = document.createElement('div');
        card.className = 'card h-100';

        const imagen = document.createElement('img');
        imagen.className = 'card-img-top';
        imagen.src = miembro.imagen;
        imagen.alt = `Foto de ${miembro.nombre}`;

        const cuerpo = document.createElement('div');
        cuerpo.className = 'card-body';

        const nombre = document.createElement('h5');
        nombre.className = 'card-title';
        nombre.textContent = miembro.nombre;

        const rol = document.createElement('h6');
        rol.className = 'card-subtitle mb-2 text-body-secondary';
        rol.textContent = miembro.rol;

        const descripcion = document.createElement('p');
        descripcion.className = 'card-text';
        descripcion.textContent = miembro.descripcion;

        cuerpo.append(nombre, rol, descripcion);
        card.append(imagen, cuerpo);
        columna.append(card);
        contenedor.append(columna);
    });
}

mostrarEquipo();

/**
 * Trae los datos del grupo.
 * @async 
 */
async function buscarGrupo() {
    try {
        const response = await fetch('data/equipo.json');

        if (!response.ok) {
            throw new Error(`Error en el request: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al cargar los datos: ', error);
        return null;
    }
}

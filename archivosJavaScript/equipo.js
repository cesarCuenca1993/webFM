    fetch('../FM_LligaFemenina/jugadores.json')
        .then(function(response) {
            if (!response.ok) throw new Error('No se pudo cargar el archivo');
            return response.json();
        })
        .then(function(data) {
            const selectEquip = document.getElementById('txtPosicion');
            const contenedorPrincipal = document.getElementById('contenedor-equipos');

            for (let i = 0; i < data.length; i++) {
                const opcion = document.createElement('option');
                opcion.value = data[i].equip;
                opcion.textContent = data[i].equip;
                
                selectEquip.appendChild(opcion);
            }

            selectEquip.addEventListener('click', function() {
                contenedorPrincipal.innerHTML = '';

                const nombreEquip = selectEquip.value;
                if (nombreEquip === '') return;

                let equipo = null;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].equip === nombreEquip) {
                        equipo = data[i];
                        break;
                    }
                }

                if (!equipo) return;

              
                const card = document.createElement('div');
                card.className = 'equipo-card';

              
                const header = document.createElement('div');
                header.className = 'header-equipo';

                const escutImg = document.createElement('img');
                escutImg.src = equipo.escut;
                escutImg.className = 'escut-club';

                const titulo = document.createElement('h2');
                titulo.textContent = equipo.equip;

                header.appendChild(escutImg);
                header.appendChild(titulo);
                card.appendChild(header);

             
                const listaJugadores = document.createElement('div');
                listaJugadores.className = 'lista-jugadores';

                for (let j = 0; j < equipo.jugadors.length; j++) {
                    const jug = equipo.jugadors[j];

                    const item = document.createElement('div');
                    item.className = 'jugador-item';

                    const fotoJug = document.createElement('img');
                    fotoJug.src = jug.foto;
                    fotoJug.className = 'foto-perfil';

                    const infoJug = document.createElement('div');
                    infoJug.className = 'info-jugador';

                    const dorsal = document.createElement('span');
                    dorsal.className = 'dorsal';
                    dorsal.textContent = '#' + jug.dorsal;

                    const nombre = document.createElement('strong');
                    nombre.textContent = jug.nomPersona;

                    const posicio = document.createElement('span');
                    posicio.textContent = jug.posicio;

                    infoJug.appendChild(dorsal);
                    infoJug.appendChild(nombre);
                    infoJug.appendChild(posicio);

                    item.appendChild(fotoJug);
                    item.appendChild(infoJug);
                    listaJugadores.appendChild(item);
                }

                card.appendChild(listaJugadores);

                const divEnt = document.createElement('div');
                divEnt.className = 'entrenador-info';

                const fotoEnt = document.createElement('img');
                fotoEnt.src = equipo.entrenador.foto;
                fotoEnt.className = 'foto-perfil';

                const infoEnt = document.createElement('div');

                const tituloEnt = document.createElement('h4');
                tituloEnt.textContent = 'Entrenador';

                const nombreEnt = document.createElement('strong');
                nombreEnt.textContent = equipo.entrenador.nomPersona;

                infoEnt.appendChild(tituloEnt);
                infoEnt.appendChild(nombreEnt);

                divEnt.appendChild(fotoEnt);
                divEnt.appendChild(infoEnt);
                card.appendChild(divEnt);

                contenedorPrincipal.appendChild(card);
            });
        })
        .catch(function(error) {
            console.error('Error en la carga de datos:', error);
        });


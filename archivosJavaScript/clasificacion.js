fetch("../ficherosJson/clasificacion.json")
    .then(function (response) {
        if (!response.ok) {
            throw new Error("No se pudo cargar el JSON");
        }
        return response.json();
    })
    .then(function (datos) {
        console.log("Datos cargados:", datos);

        const contenedor = document.getElementById("tablaClasificacion");

     
        let table = document.createElement("table");
        table.className = "tabla-posiciones";

     
        let thead = document.createElement("thead");
        let trHead = document.createElement("tr");

        const titulos = ["#", "Equipo", "PJ", "PG", "PE", "PP", "PTS"];
        for (let i = 0; i < titulos.length; i++) {
            let th = document.createElement("th");
            th.textContent = titulos[i];
            trHead.appendChild(th);
        }

        thead.appendChild(trHead);
        table.appendChild(thead);


        let tbody = document.createElement("tbody");

        for (let i = 0; i < datos.length; i++) {
            let e = datos[i];
            let tr = document.createElement("tr");

            // Posición
            let tdPos = document.createElement("td");
            tdPos.textContent = e.pos;
            tr.appendChild(tdPos);

            // Equipo (escudo + nombre)
            let tdEq = document.createElement("td");
            tdEq.className = "td-equipo";

            let img = document.createElement("img");
            img.src = e.escut;
            img.className = "escudo-tabla";

            let span = document.createElement("span");
            span.textContent = e.nom;

            tdEq.appendChild(img);
            tdEq.appendChild(span);
            tr.appendChild(tdEq);

            // Estadísticas
            let stats = [e.pj, e.pg, e.pe, e.pp, e.pts];
            for (let j = 0; j < stats.length; j++) {
                let td = document.createElement("td");
                td.textContent = stats[j];
                if (j === stats.length - 1)
                    td.className = "td-pts";
                tr.appendChild(td);
            }

            tbody.appendChild(tr);
        }

        table.appendChild(tbody);
        contenedor.appendChild(table);
    })
    .catch(function (error) {
        console.error("Hubo un problema:", error);
    });


fetch("../FM_LligaFemenina/jugadores.json")
    .then(function (response) {
        if (!response.ok) {
            throw new Error("No se pudo cargar el archivo de jugadores");
        }
        return response.json();
    })
    .then(function (data) {
        let todosLosJugadores = [];

        for (let i = 0; i < data.length; i++) {
            let equipo = data[i];
            for (let j = 0; j < equipo.jugadors.length; j++) {
                let jugador = equipo.jugadors[j];
                jugador.escutEquipo = equipo.escut;
                jugador.nombreEquipo = equipo.equip;
                todosLosJugadores.push(jugador);
            }
        }

        todosLosJugadores.sort(function (a, b) {
            return b.qualitat - a.qualitat;
        });

        const contenedor = document.getElementById("listaGoleadores");
        contenedor.innerHTML = "";

        let h2 = document.createElement("h2");
        h2.textContent = "Máximas Goleadoras";
        contenedor.appendChild(h2);

        let contador = 0;
        for (let i = 0; i < todosLosJugadores.length; i++) {
            let jugadora = todosLosJugadores[i];

            if (jugadora.posicio === "Davanter" && contador < 5) {

                let fila = document.createElement("div");
                fila.className = "fila-goleador";

                let imgPerf = document.createElement("img");
                imgPerf.src = jugadora.foto;
                imgPerf.className = "img-perfil";
                imgPerf.alt = jugadora.nomPersona;

                let info = document.createElement("div");
                info.className = "info-jugadora";

                let nombre = document.createElement("div");
                nombre.className = "nombre-jugadora";
                nombre.textContent = jugadora.nomPersona;

                let detalles = document.createElement("div");
                detalles.className = "detalles-equipo";

                let escutMin = document.createElement("img");
                escutMin.src = jugadora.escutEquipo;
                escutMin.className = "escudo-miniatura";

                let txtEquipo = document.createElement("small");
                txtEquipo.textContent = jugadora.nombreEquipo + " | Dorsal: " + jugadora.dorsal;

                detalles.appendChild(escutMin);
                detalles.appendChild(txtEquipo);
                info.appendChild(nombre);
                info.appendChild(detalles);

                let golesDiv = document.createElement("div");
                golesDiv.className = "goles-count";
                golesDiv.textContent = Math.floor(jugadora.qualitat / 5) + " G";

                fila.appendChild(imgPerf);
                fila.appendChild(info);
                fila.appendChild(golesDiv);

                contenedor.appendChild(fila);
                contador++;
            }
        }
    })
    .catch(function (error) {
        console.error("Error en el script de goleadores:", error);
    });
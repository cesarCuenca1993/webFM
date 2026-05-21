
fetch("../ficherosJson/fmPartidosVs.json")
    .then(function (response) {
        if (!response.ok) {
            console.error("error al acceder a fichero")
        } return response.json();
    })

    .then(function (partidosEncuentros) {

        let vsContenedorPrincipal = document.getElementById("partidosPrincipal")
        vsContenedorPrincipal.className = "partidosContenedorPrincipal"

        for (let i = 0; i < partidosEncuentros.length; i++) {

            let divEncuentros = document.createElement("div");
            divEncuentros.className = "encuentros";


            let divInformacionFecha = document.createElement("div");
            divInformacionFecha.className = "informacionFecha";

            let pFecha = document.createElement("p");
            pFecha.className = "fechaTexto";

            let fechaObj = new Date(partidosEncuentros[i].data);
            pFecha.textContent = fechaObj.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }) + " - " + fechaObj.getHours() + ":" + fechaObj.getMinutes().toString().padStart(2, '0');

            divInformacionFecha.appendChild(pFecha);
            divEncuentros.appendChild(divInformacionFecha);

            let divDisputaVersus = document.createElement("div");
            divDisputaVersus.className = "disputaVersus";

            let divLocal = document.createElement("div");
            divLocal.className = "equipo";

            let imgLocal = document.createElement("img");
            imgLocal.src = partidosEncuentros[i].equip_local.escut;

            let h3Local = document.createElement("h3");
            h3Local.textContent = partidosEncuentros[i].equip_local.nom;

            divLocal.appendChild(imgLocal);
            divLocal.appendChild(h3Local);

            let divResultado = document.createElement("div");
            divResultado.className = "resultadoFinal";

            let spanResultado = document.createElement("span");
            spanResultado.textContent = partidosEncuentros[i].resultat;

            divResultado.appendChild(spanResultado);

            let divVisitante = document.createElement("div");
            divVisitante.className = "equipo";

            let imgVisitante = document.createElement("img");
            imgVisitante.src = partidosEncuentros[i].equip_visitant.escut;

            let h3Visitante = document.createElement("h3");
            h3Visitante.textContent = partidosEncuentros[i].equip_visitant.nom;

            divVisitante.appendChild(imgVisitante);
            divVisitante.appendChild(h3Visitante);

            divDisputaVersus.appendChild(divLocal);
            divDisputaVersus.appendChild(divResultado);
            divDisputaVersus.appendChild(divVisitante);

            divEncuentros.appendChild(divDisputaVersus);

            vsContenedorPrincipal.appendChild(divEncuentros);
        }
    }
    )
    .catch(function (error) {
        console.error("error cargando el archivo json", error)
    });




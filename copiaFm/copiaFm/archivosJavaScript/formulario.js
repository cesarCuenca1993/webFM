    const fotoInput = document.getElementById('foto-input');
    const imagePreview = document.getElementById('image-preview');
    const defaultContent = document.getElementById('default-content');

    fotoInput.addEventListener('click', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
                defaultContent.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });


    const radioJugador = document.getElementById('radioJugador');
    const radioEntrenador = document.getElementById('radioEntrenador');
    const seccionPosicion = document.getElementById('seccionPosicion');

    function toggle() {
        if (radioJugador.checked) {
            seccionPosicion.style.display = 'block';
        } else {
            seccionPosicion.style.display = 'none';
        }
    }

    radioJugador.addEventListener('click', toggle);
    radioEntrenador.addEventListener('click', toggle);

  
    fetch('../FM_LligaFemenina/jugadores.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            const selectEquip = document.getElementById('selectEquip');

            data.forEach(function(equip) {
                const option = document.createElement('option');
                option.value = equip.equip;
                option.textContent = equip.equip;
                selectEquip.appendChild(option);
            });
        })
        .catch(function(error) {
            console.error('Error al cargar los equipos:', error);
        });